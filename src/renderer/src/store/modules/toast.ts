import { defineStore } from 'pinia'
const isShow = false
export const useToastStore = defineStore('toast', {
	state: () => ({
		isShow: isShow,
		defalutToast: {},
	}),
})
