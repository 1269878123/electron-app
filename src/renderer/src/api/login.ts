import { request } from '@/utils/request'
import { Result } from '@/types/axios'
import { AxiosRequestConfig } from 'axios'
// 登录
export const ligonIn = (params: object) => {
	return request.post<Result>(
		{
			useToken: false,
			url: '/api/login',
			params
		} as AxiosRequestConfig,
		{ isReturnNativeResponse: true }
	)
}
// 退出
export const signOut = (params: object) => {
	return request.post<Result>(
		{
			useToken: true,
			url: '/api/logout',
			params
		} as AxiosRequestConfig,
		{ isReturnNativeResponse: true }
	)
}
