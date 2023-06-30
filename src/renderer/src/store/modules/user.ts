import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
	state: () => ({
		cName: '',
		money: 0,
		version: '0.1.2'
	})
})
