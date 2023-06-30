<template>
	<Header />
	<div class="-mt-4 flex items-center justify-between">
		<img
			class="-mt-2 mr-4 w-6 h-6"
			src="https://baimingjituan.com/static/img/xiaozhuzhichuang/logo-m.svg"
			alt=""
		/>
		<ul class="flex">
			<li
				v-for="(item, index) in sideBar"
				:key="index"
				:class="[
					'px-4 h-12 py-2 flex items-center rounded-t-lg cursor-pointer',
					{ 'bg-white text-primary shadow-sm': active == index }
				]"
				@click="selectTab(index, item.path)"
			>
				<span class="mr-2" v-html="item.svg"></span>
				<span class="text-base font-semibold">{{ item.name }}</span>
			</li>
		</ul>
		<div class="-mt-9 flex-auto h-10 app-drag"></div>
		<div class="mt-2 flex items-center">
			<Menu as="div" class="relative">
				<MenuButton class="flex w-full items-center text-sm text-slate-900 hover:bg-opacity-30">
					<img class="mr-1 h-4 w-4 rounded-full" :src="state.head" />
					<span class="text-xs">{{ state.name }}</span>
					<svg
						class="h-4 w-4 text-slate-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</MenuButton>
				<transition>
					<MenuItems
						class="mt-2 absolute right-0 w-20 origin-top-right divide-y divide-slate-100 border-b border-slate-100 rounded-md bg-white shadow-sm ring-opacity-5 focus:outline-none z-50"
					>
						<div class="p-2">
							<MenuItem v-slot="{ active }">
								<button
									:class="[
										active ? 'bg-slate-50 text-primary-600' : 'text-slate-900',
										'group flex w-full items-center rounded-md p-2 text-sm'
									]"
									@click="out"
								>
									退出
								</button>
							</MenuItem>
						</div>
					</MenuItems>
				</transition>
			</Menu>
			<span class="ml-2 text-xs text-orange-600">可用次数：{{ money }}</span>
			<!-- <span class="ml-2 cursor-pointer hover:text-sky-500" @click="out">退出</span> -->
		</div>
	</div>
	<div class="hidden">
		<div
			class="flex relative overflow-hidden rounded-md bg-error items-center space-x-3 p-3 shadow"
			id="logoutToast"
		>
			<div class="flex flex-col space-y-1">
				<h5 class="font-medium text-white leading-none">退出提示</h5>
				<p class="text-white/80 text-xs leading-none">您确定要退出吗？</p>
			</div>
			<span
				class="py-1 px-2 text-xs rounded-sm btn bg-error-focus/40 font-medium text-white hover:bg-error-focus focus:bg-error-focus active:bg-error-focus/90"
				id="bindButton"
				>确定</span
			>
			<span
				class="py-1 px-2 text-xs rounded-sm bg-slate-150 cursor-pointer hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80"
				id="data-notification-remove"
				>取消</span
			>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from '@/utils/common'
import { useUserStore, useHomeStore } from '@/store'
import { signOut } from '@/api/login'
import Header from '@components/header.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
const useStore = useUserStore()
const homeStore = useHomeStore()
const router = useRouter()
const sideBar = ref<any[]>([
	{
		path: '/base',
		svg: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6.357 9c-2.637 .68 -4.357 1.845 -4.357 3.175c0 2.107 4.405 3.825 9.85 3.825c.74 0 1.26 -.039 1.95 -.097"></path><path d="M9.837 15.9c-.413 -.596 -.806 -1.133 -1.18 -1.8c-2.751 -4.9 -3.488 -9.77 -1.63 -10.873c1.15 -.697 3.047 .253 4.974 2.254"></path><path d="M6.429 15.387c-.702 2.688 -.56 4.716 .56 5.395c1.783 1.08 5.387 -1.958 8.043 -6.804c.36 -.67 .683 -1.329 .968 -1.978"></path><path d="M12 18.52c1.928 2 3.817 2.95 4.978 2.253c1.85 -1.102 1.121 -5.972 -1.633 -10.873c-.384 -.677 -.777 -1.204 -1.18 -1.8"></path><path d="M17.66 15c2.612 -.687 4.34 -1.85 4.34 -3.176c0 -2.11 -4.408 -3.824 -9.845 -3.824c-.747 0 -1.266 .029 -1.955 .087"></path><path d="M8 12c.285 -.66 .607 -1.308 .968 -1.978c2.647 -4.844 6.253 -7.89 8.046 -6.801c1.11 .679 1.262 2.706 .56 5.393"></path><path d="M12.26 12.015h-.01c-.01 .13 -.12 .24 -.26 .24a.263 .263 0 0 1 -.25 -.26c0 -.14 .11 -.25 .24 -.25h-.01c.13 -.01 .25 .11 .25 .24"></path></svg>',
		name: '智能换脸'
	},
	{
		path: '/records',
		svg: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path><path d="M3 6l0 13"></path><path d="M12 6l0 13"></path><path d="M21 6l0 13"></path></svg>',
		name: '我的记录'
	}
])
let state = reactive<any>({
	head: window.localStorage.getItem('head'),
	name: window.localStorage.getItem('name')
	// cName: useStore.cName,
	// money: useStore.money
})
// const cName = computed(() => {
// 	return useStore.cName
// })
const money = computed(() => {
	return useStore.money
})
const active = computed(() => {
	return homeStore.active
})
const selectTab = (index: number, path: string) => {
	homeStore.active = index
	router.push(path)
}
const out = () => {
	Toast.logoutToast(
		'#logoutToast',
		async () => {
			const res = await signOut({ sync_id: window.localStorage.getItem('id') })
			window.localStorage.setItem('token', '')
			const { code, message } = res.data
			if (code == 200) {
				homeStore.active = 0
				router.push('/login')
			} else {
				Toast.error(message)
			}
		},
		async () => {
			console.log('取消')
		}
	)
}
</script>
