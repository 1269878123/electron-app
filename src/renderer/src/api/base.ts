import { request } from '@/utils/request'
import { Result } from '@/types/axios'
import { AxiosRequestConfig } from 'axios'
// 上传腾讯云token
export const getCostoken = (params: object) => {
	return request.get<Result>(
		{
			useToken: true,
			url: '/api/cos/token',
			params
		} as AxiosRequestConfig,
		{ isReturnNativeResponse: true }
	)
}
// 融合
export const createMerge = (data: object) => {
	return request.post<Result>(
		{
			useToken: true,
			url: '/api/push',
			params: data
		} as AxiosRequestConfig,
		{ isReturnNativeResponse: true }
	)
}
// 获取生成记录
export const getCreateList = (params: object) => {
	return request.get<Result>(
		{
			useToken: true,
			url: '/api/pushList',
			params
		} as AxiosRequestConfig,
		{ isReturnNativeResponse: true }
	)
}
// 获取版本
export const getVersion = () => {
	return request.get<Result>(
		{
			useToken: true,
			url: '/api/version'
		} as AxiosRequestConfig,
		{ isReturnNativeResponse: true }
	)
}
