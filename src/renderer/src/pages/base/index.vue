<template>
	<div class="h-full relative flex flex-col justify-center">
		<div class="w-full">
			<div class="flex mb-8">
				<input id="upCommon1" type="file" accept="video/*" class="hidden" @change="upload" />
				<input id="upCommon2" type="file" accept="image/*" class="hidden" @change="upload" />
				<div class="flex w-full items-center">
					<div class="grow w-4/12 aspect-[16/9]">
						<button
							@click="up(1)"
							v-if="!state.videoPath"
							:content="`<div class=&quot;px-1 py-2&quot;>视频素材视频限制不大于100M，时长不超过5min，分辨率不超过720*1280。</div>`"
							v-tippy="{ placement: 'bottom' }"
							type="button"
							class="w-full h-full flex flex-col items-center justify-center bg-white relative rounded-lg border-4 border-dashed border-slate-200 p-12 text-center hover:border-slate-400 focus:outline-none"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-10 h-10"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M7 18a4.6 4.4 0 0 1 0-9 5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
								<path d="M9 15l3-3 3 3"></path>
								<path d="M12 12l0 9"></path>
							</svg>
							<span class="mt-4 block text-sm">上传需要处理的视频</span>
						</button>
						<div class="w-full h-full relative rounded-lg" v-else>
							<div class="w-full h-full flex justify-center bg-slate-50">
								<video
									id="myVideo"
									class="h-full"
									:src="state.videoPath"
									controls
									disablePictureInPicture
									controlsList="nodownload"
									preload="auto"
								></video>
							</div>
							<span
								@click="state.videoPath = false"
								class="absolute top-3 right-3 cursor-pointer hover:text-red-500 z-50"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M18 6l-12 12"></path>
									<path d="M6 6l12 12"></path>
								</svg>
							</span>
							<div
								v-if="!state.clickPlay && state.cover"
								class="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
							>
								<div
									@click="playVideo"
									class="flex h-12 w-12 border-2 border-white text-white rounded-full items-center justify-center shadow cursor-pointer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="w-6 h-6"
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
							<div
								v-if="!state.clickPlay && state.cover"
								class="h-full w-full absolute left-0 top-0 flex justify-center"
							>
								<img class="h-full" :src="state.cover" alt="" />
							</div>
						</div>
					</div>
					<div class="w-1/12 flex justify-center">
						<svg
							class="mx-2 text-slate-200"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
							/>
						</svg>
					</div>
					<div class="grow w-4/12 aspect-[16/9]">
						<button
							@click="up(2)"
							v-if="!state.imagePath"
							:content="`<div class=&quot;px-1 py-2&quot;>指定人脸图片总像素不超过1920*1080，人脸像素不小于112*112，大小不超过 5M，格式支持jpg/png，包含上述视频中出现的人物的单人照，并且正面、清晰、无遮挡。</div>`"
							v-tippy="{ placement: 'bottom' }"
							type="button"
							class="w-full h-full flex flex-col items-center justify-center bg-white relative rounded-lg border-4 border-dashed border-slate-200 p-12 text-center hover:border-slate-400 focus:outline-none"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-8 h-8"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M7 18a4.6 4.4 0 0 1 0-9 5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
								<path d="M9 15l3-3 3 3"></path>
								<path d="M12 12l0 9"></path>
							</svg>
							<span class="mt-4 block text-sm">上传需要融合的人脸</span>
						</button>
						<div v-else class="w-full h-full relative flex justify-center bg-slate-50 rounded-lg">
							<img :src="state.imagePath" class="h-full w-auto" alt="" />
							<span
								@click="state.imagePath = false"
								class="absolute top-3 right-3 cursor-pointer hover:text-red-500 z-50"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6"
									viewBox="0 0 24 24"
									stroke-width="3"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M18 6l-12 12"></path>
									<path d="M6 6l12 12"></path>
								</svg>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-center">
				<span
					:class="[
						'btn bg-primary font-medium rounded-full text-white py-3 px-5 hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 disabled:pointer-events-none disabled:select-none disabled:opacity-60',
						{ 'bg-primary': state.play }
					]"
					style="background: #ccc"
					@click="create"
				>
					开始生成
				</span>
			</div>
		</div>
	</div>
	<TransitionRoot appear :show="state.tip" as="template">
		<Dialog as="div" class="relative z-50">
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
							class="w-full max-w-[28rem] transform overflow-hidden rounded-md bg-white px-6 text-left align-middle shadow-md transition-all"
						>
							<DialogTitle as="h3" class="font-semibold py-4 border-b border-slate-100">
								温馨提示
							</DialogTitle>
							<div class="mt-6 flex justify-center space-y-6 leading-5 px-10 pb-20">
								有最新版本，请<a
									class="text-primary"
									href="https://pocket-gz-1302870652.cos.ap-guangzhou.myqcloud.com/package/xiaozhuzhichuang-setup.exe"
									target="_blank"
								>
									点击下载
								</a>
							</div>
							<!-- <div
								class="-mx-6 mt-6 px-6 py-4 flex space-x-4 justify-end bg-slate-50 border-t border-slate-100"
							>
								<button class="btn-primary" @click="state.tip = false">确定</button>
							</div> -->
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { getUserInfo } from '@/api/user'
import { getCostoken, createMerge, getVersion, getCreateList } from '@/api/base'
import { Toast, gitTp, uuid2, testImg, testVideo } from '@/utils/common'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useUserStore, useHomeStore } from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter()
const useStore = useUserStore()
const homeStore = useHomeStore()
let state = reactive<any>({
	play: true,
	videoPath: '',
	imagePath: '',
	upType: 1,
	videoName: '',
	createList: [],
	cover: '',
	clickPlay: false,
	tip: false,
	total: 0
})
onMounted(() => {
	getUserData()
	getVs()
})
const getVs = async () => {
	const res = await getVersion()
	const { code, data } = res.data
	if (code == 200 && useStore.version != data[0].version) {
		state.tip = true
	}
}
const playVideo = () => {
	;(document.querySelector('#myVideo') as HTMLVideoElement).play()
	state.clickPlay = true
}
const getUserData = async () => {
	let params = { uid: window.localStorage.getItem('id') }
	const res = await getUserInfo(params)
	const { code, data, message } = res.data
	if (code != 200) return Toast.error(message)
	useStore.cName = convert(data.channel, data.channel_type)
	useStore.money = data.amount
	if (data.amount < 1) {
		state.play = false
	}
}
const getList = async () => {
	let params = {
		type: '1',
		sync_id: window.localStorage.getItem('id')
	}
	const resp = await getCreateList(params)
	const { data } = resp.data
	state.total = data.total
	if (state.total >= 5) {
		Toast.error('最多可同时融合5个')
		return
	}
	homeStore.text = '融合中...'
	homeStore.isShow = true
	let datas = {
		sync_id: window.localStorage.getItem('id'),
		video_url: state.videoPath,
		img_url: state.imagePath,
		title: state.videoName,
		cover: state.cover
	}
	const res = await createMerge(datas)
	const { code } = res.data
	if (code == 200) {
		Toast.success('视频融合已经加入队列')
		homeStore.isShow = false
		state.videoPath = ''
		state.imagePath = ''
		state.videoName = ''
		homeStore.active = 1
		router.push('/records')
	}
	getUserData()
}
const convert = (type: number, ctype: number) => {
	let cName = ''
	switch (type) {
		case 1:
			cName = '影视综'
			break
		case 2:
			cName = '体育竞技'
			break
		case 3:
			if (ctype == 1) {
				cName = '泛娱乐'
			} else {
				cName = '泛生活'
			}
			break
		default:
			cName = 'BP'
	}
	return cName
}
const up = (type: number) => {
	state.upType = type
	if (type == 1) {
		;(document.querySelector('#upCommon1') as HTMLInputElement).click()
	} else {
		;(document.querySelector('#upCommon2') as HTMLInputElement).click()
	}
}
const upload = async (e: any) => {
	let files: any = ''
	if (e.type == 'change') {
		files = e.target.files[0]
	} else {
		files = e
		state.upType = 3
	}
	if (state.upType == 1) {
		state.videoName = files.name.split('.')[0]
		let videoTest = new testVideo(files, '', 100, { maxWidth: 720, maxHeight: 1280 }, 5 * 60 * 1000)
		let data = await videoTest.test()
		if (data != 'pass') {
			e.target.value = ''
			return
		}
	} else if (state.upType == 2) {
		let imgTest = new testImg(files, ['image/jpeg', 'image/jpg', 'image/png'], 5, {
			minWidth: 112,
			minHeight: 112,
			maxWidth: 1920,
			maxHeight: 1080
		})
		let data = await imgTest.test()
		if (data != 'pass') {
			e.target.value = ''
			return
		}
	}
	homeStore.text = '上传中'
	homeStore.isShow = true
	let fileName = new Date().getTime().toString() + uuid2(16, 16)
	const res = await getCostoken({
		module: state.upType == 1 ? 'video_file' : 'image_file',
		filename: fileName
	}) // 获取上传腾讯云信息
	const { cos } = res.data.data
	const resData: any = await gitTp(cos, files, state.upType) // 上传腾讯云
	if (state.upType == 1) {
		window.localStorage.setItem('videoPath', resData.path)
		upload(blobToFile(resData.cutPath, fileName))
		e.target.value = ''
	} else if (state.upType == 2) {
		homeStore.isShow = false
		state.imagePath = resData ? resData.path : ''
		e.target.value = ''
	} else {
		homeStore.isShow = false
		state.cover = resData ? resData.path : ''
		state.videoPath = window.localStorage.getItem('videoPath')
		state.clickPlay = false
	}
}
function blobToFile(theBlob: any, fileName: any) {
	theBlob.lastModifiedDate = new Date() //文件最后修改日期
	theBlob.name = fileName //文件名
	return new File([theBlob], fileName, { type: theBlob.type, lastModified: Date.now() })
}
const create = async () => {
	if (!state.play) return Toast.error('余额不足')
	if (!state.videoPath) return Toast.error('请上传视频')
	if (!state.imagePath) return Toast.error('请上传图片')
	getList()
}
</script>
