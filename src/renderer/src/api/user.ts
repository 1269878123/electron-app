import { request } from '@/utils/request'
import { Result } from '@/types/axios'
import { AxiosRequestConfig } from 'axios'
export const getUserInfo = (params: object) => {
	return request.get<Result>(
		{
			useToken: true,
			url: '/api/userInfo',
			params
		} as AxiosRequestConfig,
		{ isReturnNativeResponse: true }
	)
}
