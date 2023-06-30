import { defineStore } from 'pinia'
export const useHomeStore = defineStore('home', {
	state: () => ({
		isShow: false,
		text: '上传中',
		active: 0
	})
})
