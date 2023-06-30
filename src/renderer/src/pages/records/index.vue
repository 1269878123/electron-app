<template>
	<div class="relative">
		<div>
			<div class="-mt-4 border-b border-slate-200">
				<nav class="-mb-px flex space-x-8" aria-label="Tabs">
					<span
						@click="changeType"
						:class="
							state.isActive
								? 'border-primary text-primary'
								: 'border-transparent text-slate-500 hover:border-slate-200 hover:text-slate-700'
						"
						class="flex whitespace-nowrap border-b-2 py-4 text-sm font-medium cursor-pointer"
					>
						生成中
						<span
							v-if="state.isActive"
							:class="state.isActive ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-900'"
							class="ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
							>{{ state.createList.length }}</span
						>
					</span>
					<span
						@click="changeType"
						:class="
							!state.isActive
								? 'border-primary text-primary'
								: 'border-transparent text-slate-500 hover:border-slate-200 hover:text-slate-700'
						"
						class="flex whitespace-nowrap border-b-2 py-4 text-sm font-medium cursor-pointer"
					>
						已完成
						<span
							v-if="!state.isActive"
							:class="
								!state.isActive ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-900'
							"
							class="ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
							>{{ state.total }}</span
						>
					</span>
				</nav>
			</div>
			<div class="mt-8">
				<div v-if="state.createList.length > 0" class="grid grid-cols-2 gap-8 h-full">
					<div v-for="item in state.createList" :key="item.id" class="flex overflow-hidden">
						<div class="w-32 h-20 aspect-[16/9] relative">
							<video
								id="myVideo"
								class="h-full w-full"
								:src="item.video_url"
								controls
								disablePictureInPicture
								preload="auto"
								controlsList="nodownload"
							></video>
							<img class="w-full h-full absolute top-0 left-0" :src="item.cover" alt="" />
							<div
								class="absolute inset-0 flex items-center justify-center z-10 text-white bg-black/20"
							>
								<div
									@click="openWatch(item.link)"
									class="flex h-8 w-8 border-2 border-white rounded-full items-center justify-center shadow cursor-pointer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="w-4 h-4"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
										<path
											d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
											stroke-width="0"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div>
						</div>
						<div class="flex-1 flex flex-col justify-between text-base ml-4">
							<h3 class="text-sm font-semibold line-clamp-1">{{ item.title }}</h3>
							<p class="text-xs text-slate-400">{{ item.create_time }}</p>
							<div class="flex">
								<p v-if="!state.isActive" class="text-xs space-x-2">
									<span v-if="item.status == 3" class="text-green-600">已完成</span>
									<span
										v-if="item.status == 3"
										@click="downLoad(item.link, item.title)"
										class="text-primary cursor-pointer"
										>下载</span
									>
									<span v-if="item.status == 2" class="text-red-600">
										合成失败 <span v-if="item.msg">({{ item.msg }})</span>
									</span>
								</p>
								<p v-if="state.isActive" class="text-xs text-green-600">融合中，请稍后</p>
							</div>
						</div>
					</div>
				</div>
				<div v-else class="h-48 no-data"></div>
				<Pagination
					class="mt-8"
					v-if="state.total > state.pageSize"
					:current="state.currentPage"
					:pageSize="state.pageSize"
					:total="state.total"
					@changePage="getCurrentPage"
				/>
			</div>
		</div>
		<TransitionRoot appear :show="state.watch" as="template">
			<Dialog as="div" @close="state.watch = false" class="relative z-50">
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black opacity-40"></div>
				</TransitionChild>
				<div class="fixed inset-0 overflow-y-auto">
					<div class="flex min-h-full items-center justify-center p-4 text-center">
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							enter-to="opacity-100 scale-100"
							leave="duration-200 ease-in"
							leave-from="opacity-100 scale-100"
							leave-to="opacity-0 scale-95"
						>
							<DialogPanel
								class="w-full max-w-[34rem] transform overflow-hidden rounded-md bg-white px-6 text-left align-middle shadow-md transition-all"
							>
								<DialogTitle as="h3" class="font-semibold py-4 border-b border-slate-100">
									查看
								</DialogTitle>
								<div class="mt-6 flex justify-center space-y-6 leading-5 px-10">
									<video
										id="myVideo"
										class="w-full h-64"
										:src="state.selectVideo"
										controls
										autoplay
										disablePictureInPicture
										controlsList="nodownload"
										preload="auto"
									></video>
								</div>
								<div
									class="-mx-6 mt-6 px-6 py-4 flex space-x-4 justify-end bg-slate-50 border-t border-slate-100"
								>
									<button class="btn-primary" @click="state.watch = false">确定</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import Pagination from '@components/pagination.vue'
import { getCreateList } from '@/api/base'
import { Toast } from '@/utils/common'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useHomeStore } from '@/store'
const useStore = useHomeStore()
let state = reactive<any>({
	isActive: true,
	total: 0,
	pageSize: 10,
	currentPage: 1,
	createList: [],
	watch: false,
	selectVideo: ''
})
onMounted(() => {
	getList()
})
const changeType = () => {
	state.isActive = !state.isActive
	state.createList = []
	state.currentPage = 1
	getList()
}
const getCurrentPage = (page: number) => {
	state.currentPage = page
	getList()
}
const getList = async () => {
	interface params {
		type: any
		sync_id: any
		page?: number
		size?: number
	}
	let params: params = {
		type: '1',
		sync_id: window.localStorage.getItem('id')
	}
	if (!state.isActive) {
		params['type'] = '2'
		params['page'] = state.currentPage
		params['size'] = state.pageSize
	}
	const res = await getCreateList(params)
	const { code, message, data } = res.data
	if (code != 200) return Toast.error(message)
	state.createList = data.data
	state.total = data.total
}
const openWatch = (link: string) => {
	if (state.isActive) return Toast.error('融合中不可查看')
	watchVideo(link)
}
const downLoad = (url: string, title: string) => {
	// let a = document.createElement('a')
	// a.download = title
	// a.href = url
	// a.style.display = 'none'
	// document.body.appendChild(a)
	// a.click()
	useStore.text = '下载中...'
	useStore.isShow = true
	fetch(url)
		.then((res) => res.blob())
		.then((blob) => {
			useStore.isShow = false
			let u = window.URL.createObjectURL(new Blob([blob], { type: 'video/mp4' }))
			let a = document.createElement('a')
			a.download = title
			a.href = u
			a.style.display = 'none'
			document.body.appendChild(a)
			a.click()
			a.remove()
			window.URL.revokeObjectURL(u)
		})
}
const watchVideo = (url: string) => {
	state.watch = true
	state.selectVideo = url
}
</script>
