<template>
	<div class="w-full h-[calc(100vh-2px)] flex">
		<div class="flex-none flex flex-col h-full bg-white px-8 shadow">
			<div class="flex mt-14" style="-webkit-app-region: drag">
				<img
					class="h-10"
					src="https://baimingjituan.com/static/img/xiaozhuzhichuang/logo.svg"
					alt=""
				/>
			</div>
			<main class="flex-auto flex w-full flex-col justify-end pb-10 space-y-16">
				<div>
					<h2 class="text-2xl font-semibold text-slate-600">欢迎回来</h2>
					<div class="text-slate-400">请登录后继续操作</div>
				</div>
				<div class="flex flex-col space-y-4">
					<div>
						<div class="flex items-center text-xs space-x-1">
							<label class="flex cursor-pointer">
								<input
									v-model="state.channel"
									class="form-radio is-basic h-4 w-4 rounded-full border-slate-150 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary"
									name="project"
									type="radio"
									value="1"
								/>
								<span class="ml-1 mr-2">MP</span>
							</label>
							<label class="flex cursor-pointer">
								<input
									v-model="state.channel"
									class="form-radio is-basic h-4 w-4 rounded-full border-slate-150 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary"
									name="project"
									type="radio"
									value="2"
								/>
								<span class="ml-1 mr-2">TP</span>
							</label>
							<label class="flex cursor-pointer">
								<input
									v-model="state.channel"
									class="form-radio is-basic h-4 w-4 rounded-full border-slate-150 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary"
									name="project"
									type="radio"
									value="4"
								/>
								<span class="ml-1 mr-2">BP</span>
							</label>
							<label class="flex cursor-pointer">
								<input
									v-model="state.channel"
									class="form-radio is-basic h-4 w-4 rounded-full border-slate-150 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary"
									name="project"
									type="radio"
									value="3"
								/>
								<span class="ml-1 mr-2">P</span>
							</label>
						</div>
					</div>
					<div>
						<label class="relative flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="absolute z-10 top-2.5 left-2.5 w-5 h-5 text-slate-300"
								viewBox="0 0 24 24"
								stroke-width="1"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path
									d="M6 3m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
								></path>
								<path d="M11 4l2 0"></path>
								<path d="M12 17l0 .01"></path>
							</svg>
							<input
								class="form-input w-full px-3 py-2 pl-9 ring-primary/50"
								v-model="state.phone"
								placeholder="账号"
								type="text"
							/>
						</label>
					</div>
					<div>
						<label class="relative flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="absolute z-10 top-2.5 left-2.5 w-5 h-5 text-slate-300"
								viewBox="0 0 24 24"
								stroke-width="1"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path
									d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z"
								></path>
								<path d="M15 9h.01"></path>
							</svg>
							<input
								type="password"
								class="form-input w-full px-3 py-2 pl-9"
								v-model="state.password"
								placeholder="密码"
							/>
						</label>
					</div>
					<div class="text-xs inline-flex items-center space-x-2">
						<input
							v-model="state.xy"
							class="form-checkbox is-basic h-4 w-4 rounded-full border-slate-400/70 checked:bg-info checked:!border-info hover:!border-info focus:!border-info dark:border-navy-400"
							type="checkbox"
						/>
						<p class="ml-1 mr-2">
							我同意并遵守<a
								class="text-primary"
								href="https://pocket-face.xiaozhuquan.cn/package/xzzc/yonghuxieyi.pdf"
								target="_blank"
							>
								服务协议 </a
							>与<a
								class="text-primary"
								href="https://pocket-face.xiaozhuquan.cn/package/xzzc/yinsizhengce.pdf"
								target="_blank"
							>
								隐私政策
							</a>
						</p>
					</div>
					<label class="text-xs inline-flex items-center space-x-2 cursor-pointer">
						<input
							v-model="state.rememberState"
							class="form-checkbox is-basic h-4 w-4 rounded-full border-slate-400/70 checked:bg-info checked:!border-info hover:!border-info focus:!border-info dark:border-navy-400"
							type="checkbox"
						/>
						<p class="ml-1 mr-2">记住密码</p>
					</label>

					<button
						@click="loginIn"
						class="btn h-10 flex justify-center w-full bg-primary font-medium text-white space-x-1 hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 disabled:pointer-events-none disabled:select-none disabled:opacity-60"
					>
						<span>登录</span>
					</button>
				</div>
			</main>
		</div>
		<div class="flex-auto flex flex-col bg-slate-50">
			<div class="flex h-[3.6rem] items-center pr-3">
				<div class="flex-auto h-full" style="-webkit-app-region: drag"></div>
				<div class="flex justify-between">
					<div class="flex-1 app-drag"></div>
					<div class="w-32 text-end pt-2 pr-2">
						<a
							@click="ipcRenderer.send('min')"
							class="btn rounded-md p-2 text-slate-400 hover:bg-slate-200/90 hover:text-slate-700 focus:bg-slate-200 active:bg-slate-200"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M5 12l14 0"></path>
							</svg>
						</a>
						<button
							@click="ipcRenderer.send('close')"
							class="btn rounded-md p-2 text-slate-400 hover:bg-slate-200/90 hover:text-slate-700 focus:bg-slate-200 active:bg-slate-200"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
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
						</button>
					</div>
				</div>
			</div>
			<div class="flex flex-auto items-center justify-center" style="-webkit-app-region: drag">
				<img class="w-1/2" :src="dashboard" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import dashboard from '@assets/images/dashboard.svg'
import { ipcRenderer } from 'electron'
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Store from 'electron-store'
import { Toast } from '@/utils/common'
import { ligonIn } from '@/api/login'
const router = useRouter()
let state = reactive<any>({
	phone: '',
	password: '',
	channel: '2',
	rememberState: false,
	xy: true
})
//配置文件
const option = {
	name: 'config', //文件名称,默认 config
	fileExtension: 'json', //文件后缀,默认json
	encryptionKey: 'aes-256-cbc', //对配置文件进行加密
	clearInvalidConfig: true // 发生 SyntaxError  则清空配置,
}
onMounted(() => {
	getUserAccount()
})
const store = new Store(option)
const loginIn = async () => {
	if (!state.phone) return Toast.error('请填写手机号码')
	if (!state.password) return Toast.error('请填写密码')
	if (!state.xy) return Toast.error('请阅读服务协议与隐私政策')
	let datas = {
		mobile: state.phone,
		password: state.password,
		channel: state.channel // MP:影视综 TP:体育竞技 P: 根据channel_type（1.泛娱乐， 2.泛生活） BP: BP
	}
	const res = await ligonIn(datas)
	const { code, data, message } = res.data
	if (code != 200) return Toast.error(message)
	if (state.rememberState) {
		setUserAccount(state.phone, state.password, state.channel)
	} else {
		setUserAccount('', '', '2')
	}
	window.localStorage.setItem('id', data.id)
	window.localStorage.setItem('token', data.token)
	window.localStorage.setItem('head', data.head)
	window.localStorage.setItem('name', data.name)
	router.push('/home')
}
/**
 * 设置用户的账号密码
 */
function setUserAccount(username: any, password: any, type: any) {
	store.set('username', username)
	store.set('password', password)
	store.set('type', type)
}

/**
 *从新登录的时候，账号密码自动填充
 */
function getUserAccount() {
	state.phone = store.get('username')
	state.password = store.get('password')
	state.channel = store.get('type')
	state.rememberState = true
}
</script>
