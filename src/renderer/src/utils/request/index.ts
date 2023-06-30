import { Toast } from '@/utils/common'
import isString from 'lodash/isString'
import merge from 'lodash/merge'
import { AxiosTransform, CreateAxiosOptions } from './AxiosTransform'
import { VAxios } from './Axios'
import { joinTimestamp, formatRequestDate, setObjToUrlParams } from './utils'
import { AxiosRequestConfigRetry } from '@/types/axios'

const transform: AxiosTransform = {
	// 处理请求数据。如果数据不是预期格式，可直接抛出错误
	transformRequestHook: (res, options) => {
		const { isTransformResponse, isReturnNativeResponse } = options
		const method = res.config.method?.toLowerCase()
		if (res.status === 204 || method === 'put' || method === 'patch') {
			return res
		}
		// 是否返回原生响应头 比如：需要获取响应头时使用该属性
		if (isReturnNativeResponse) {
			return res
		}
		// 用于页面代码可能需要直接获取code，data，message这些信息时开启
		if (!isTransformResponse) {
			return res.data
		}
		const { data } = res
		if (!data) {
			throw new Error('请求接口错误')
		}
		//  这里 code为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
		const { code } = data
		// 这里逻辑可以根据项目进行修改
		const hasSuccess = data && code === 200
		if (hasSuccess) {
			return data.data
		}
		const err = new Error(`请求接口错误, 错误码: ${code},错误信息:${data.message}`)
		throw err
	},
	// 请求前处理配置
	beforeRequestHook: (config, options) => {
		const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options
		// 此处获取到的时候.env中的baseUrl,以前获取的是用户传过来的地址，还需要自己去拼接
		if (config.baseURL) {
			config.url = config.baseURL + config.url
		} else {
			apiUrl ? (config.url = apiUrl + config.url) : config.url
		}
		const params = config.params || {}
		const data = config.data || false
		if (formatDate && data && !isString(data)) {
			formatRequestDate(data)
		}
		if (config.method?.toUpperCase() === 'GET') {
			if (!isString(params)) {
				// 给 get 请求加上时间戳参数，避免从缓存中拿数据。
				config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
			} else {
				// 兼容restful风格
				config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
				config.params = undefined
			}
		} else if (!isString(params)) {
			if (formatDate) {
				formatRequestDate(params)
			}
			if (
				Reflect.has(config, 'data') &&
				config.data &&
				(Object.keys(config.data).length > 0 || data instanceof FormData)
			) {
				config.data = data
				config.params = params
			} else {
				// 非GET请求如果没有提供data，则将params视为data
				config.data = params
				config.params = undefined
			}
			if (joinParamsToUrl) {
				config.url = setObjToUrlParams(config.url as string, {
					...config.params,
					...config.data
				})
			}
		} else {
			config.url += params
			config.params = undefined
		}
		return config
	},
	// 请求拦截器处理
	requestInterceptors: (config) => {
		const token = window.localStorage.getItem('token')
		if (token && (config as Recordable)?.useToken !== false) {
			;(config as Recordable).headers.Authorization = token
		}
		if (import.meta.env.BY__MODE != 'dev') {
			let arr: any = config.url?.split('/api')
			config.url = arr[0] + arr[1]
		}
		return config
	},
	// 响应拦截器处理
	responseInterceptors: (res) => {
		if (res.data.code == 502) {
			Toast.error(res.data.message)
			location.href = '/login'
		}
		if (
			res.data.code != 200 &&
			res.data.code != 0 &&
			res.data.code != 12000 &&
			res.data.code != 502
		) {
			Toast.error(res.data.message)
		}
		return res
	},
	// 响应错误处理
	responseInterceptorsCatch: (error: any) => {
		const { config } = error
		if (!config || !config.requestOptions.retry) return Promise.reject(error)
		config.retryCount = config.retryCount || 0
		if (config.retryCount >= config.requestOptions.retry.count) return Promise.reject(error)
		config.retryCount += 1
		const backoff = new Promise((resolve) => {
			setTimeout(() => {
				resolve(config)
			}, config.requestOptions.retry.delay || 1)
		})
		config.headers = {
			...config.headers,
			'Content-Type': 'application/json;charset=UTF-8'
		}
		return backoff.then((config) => request.request(config as AxiosRequestConfigRetry))
	}
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
	return new VAxios(
		merge(
			<CreateAxiosOptions>(<unknown>{
				// 超时
				timeout: 60 * 1000,
				// 携带Cookie
				withCredentials: true,
				// 头信息
				headers: { 'Content-Type': 'application/json;charset=UTF-8' },
				// 数据处理方式
				transform,
				// 配置项，下面的选项都可以在独立的接口请求中覆盖
				requestOptions: {
					// 接口地址
					apiUrl: import.meta.env.BY__BASE_URL,
					// 是否返回原生响应头 比如：需要获取响应头时使用该属性
					isReturnNativeResponse: false,
					// 需要对返回数据进行处理
					isTransformResponse: true,
					// post请求的时候添加参数到url
					joinParamsToUrl: false,
					// 格式化提交参数时间
					formatDate: true,
					// 是否加入时间戳
					joinTime: true,
					// 忽略重复请求
					ignoreRepeatRequest: true,
					// 是否携带token
					withToken: true,
					// 重试
					retry: {
						count: 0,
						delay: 1000
					}
				}
			}),
			opt || {}
		)
	)
}
export const request = createAxios()
