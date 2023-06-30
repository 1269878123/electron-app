/**
 * 吐司弹窗
 * */
import Toastify from 'toastify-js'
import { useToastStore } from '@/store'
import { isEmpty } from 'lodash'
const COS = require('cos-js-sdk-v5')
export class Toast {
	private options: Toastify.Options = {}

	constructor() {
		this.options.position = 'center'
		this.options.newWindow = true
		this.options.stopOnFocus = true
		if (!isEmpty(useToastStore().defalutToast)) {
			const t = useToastStore().defalutToast as any
			t?.hideToast()
			useToastStore().defalutToast = {}
		}
	}

	/**
	 *
	 * @param text 打印信息
	 */
	public static success(text: string) {
		const t = new Toast()
		t.options.text = text
		t.options.className = 'success'
		const toastify = Toastify(t.options)
		toastify.showToast()
		useToastStore().defalutToast = toastify
	}
	/**
	 *
	 * @param text 打印信息
	 */
	public static error(text: string) {
		const t = new Toast()
		t.options.text = text
		t.options.className = 'error'
		const toastify = Toastify(t.options)
		toastify.showToast()
		useToastStore().defalutToast = toastify
	}
	public static logoutToast(id: string, ok: Function, close: Function) {
		if (!useToastStore().isShow) {
			useToastStore().isShow = true
			this.toastHtml(id, ok, close)
		}
	}
	// 带确定提示框
	private static toastHtml(id: string, ok: Function, close: Function) {
		const toastE = document.querySelector(id) as HTMLDivElement
		const t = new Toast()
		t.options.node = toastE.cloneNode(true)
		t.options.duration = -1
		t.options.position = 'center'
		t.options.gravity = 'top'
		t.options.className = 'html'
		let toastify = Toastify(t.options)
		toastify.showToast()
		document.getElementById('data-notification-remove')?.addEventListener('click', (): void => {
			toastify.hideToast()
			useToastStore().isShow = false
			if (close) close()
		})
		document.getElementById('bindButton')?.addEventListener('click', (): void => {
			toastify.hideToast()
			useToastStore().isShow = false
			if (ok) ok()
		})
	}
	/**
	 * 带标题、内容的简单弹出框
	 */
	public static dialog(title: string, content: string, handler: Function) {
		;(document.getElementById('point_out_dialog') as HTMLImageElement).classList.remove('hidden')
		;(document.getElementById('dialog_title') as HTMLImageElement).textContent = title
		;(document.getElementById('dialog_content') as HTMLElement).textContent = content
		handler()
	}

	/**
	 * 视频浏览弹出框
	 */
	public static videoDialog(title: string, src: string, videoMessage: any, handler: Function) {
		;(document.getElementById('video_dialog_title') as HTMLImageElement).textContent = title
		;(document.getElementById('video_dialog_src') as any).src = src
		if (videoMessage.video_height < videoMessage.video_width) {
			//横屏
			;(document.getElementById('videoClassID') as HTMLImageElement).classList.add(
				'w-[48vw]',
				'h-[27vw]'
			) //添加 class
		} else {
			//竖屏
			;(document.getElementById('videoClassID') as HTMLImageElement).classList.add(
				'w-[45vh]',
				'h-[80vh]'
			) //添加 class
		}
		handler()
	}
}
// 上传图片验证(验证了图片类型以及图片大小、图片宽高;如无需验证这么多，参数填写'')
export class testImg {
	private readonly astrictType: any
	private readonly astrictSize: any
	private readonly file: any
	private readonly radius: any
	constructor(file: any, astrictType: any, astrictSize: any, radius: any) {
		this.file = file
		this.astrictType = astrictType
		this.astrictSize = astrictSize
		this.radius = radius
		// this.test()
	}
	async test() {
		let reader = new FileReader()
		reader.readAsDataURL(this.file)
		return await new Promise((resolve) => {
			reader.onload = async (event: any) => {
				let result = event.target.result
				let img = new Image()
				img.src = result
				return await new Promise(() => {
					img.onload = () => {
						if (
							this.radius &&
							(img.width < this.radius.minWidth ||
								img.height < this.radius.minHeight ||
								img.width > this.radius.maxWidth ||
								img.height > this.radius.maxHeight)
						) {
							Toast.error('图片尺寸不符合')
							resolve(false)
							return
						}
						if (this.astrictSize && this.file.size / 1024 / 1024 > this.astrictSize) {
							Toast.error(`上传的图片大小不可超过${this.astrictSize}M`)
							resolve(false)
							return
						}
						if (this.astrictType) {
							let typeStr = ''
							this.astrictType.forEach((item, index) => {
								if (index == this.astrictType.length - 1) {
									typeStr += item
								} else {
									typeStr += item + '、'
								}
							})
							if (!this.astrictType.includes(this.file.type)) {
								Toast.error(`上传的图片限制类型为${typeStr}等格式`)
								resolve(false)
								return
							}
						}
						resolve('pass')
					}
				})
			}
		})
	}
}
// 上传视频验证(验证了视频时长，大小,分辨率)
export class testVideo {
	private readonly astrictType: any
	private readonly astrictSize: any
	private readonly duration: any
	private readonly file: any
	private readonly radius: any
	constructor(file: any, astrictType: any, astrictSize: any, radius: any, duration: any) {
		this.file = file
		this.astrictType = astrictType
		this.astrictSize = astrictSize
		this.duration = duration
		this.radius = radius
		// this.test()
	}
	async test() {
		let video = document.createElement('video')
		video.src = URL.createObjectURL(this.file)
		return await new Promise((resolve) => {
			video.oncanplay = () => {
				let duration = video.duration
				if (this.duration && duration * 1000 > this.duration) {
					Toast.error('视频时长过大')
					resolve(false)
					return
				}
				if (this.astrictType) {
					let typeStr = ''
					this.astrictType.forEach((item, index) => {
						if (index == this.astrictType.length - 1) {
							typeStr += item
						} else {
							typeStr += item + '、'
						}
					})
					if (!this.astrictType.includes(this.file.type)) {
						Toast.error(`上传的视频限制类型为${typeStr}等格式`)
						resolve(false)
						return
					}
				}
				if (this.astrictSize && this.file.size / 1024 / 1024 > this.astrictSize) {
					Toast.error(`上传的视频大小不可超过${this.astrictSize}M`)
					resolve(false)
					return
				}

				if (
					this.radius &&
					(video.width > this.radius.maxWidth || video.height > this.radius.maxHeight)
				) {
					Toast.error('视频分辨率不符合')
					resolve(false)
					return
				}

				resolve('pass')
			}
		})
	}
}
// 上传腾讯云
export const gitTp = async (cos, files, type) => {
	const cosf = new COS({
		// getAuthorization 必选参数
		getAuthorization: function (options, callback) {
			console.log(options)
			callback({
				TmpSecretId: cos.credentials.tmpSecretId,
				TmpSecretKey: cos.credentials.tmpSecretKey,
				SecurityToken: cos.credentials.sessionToken,
				// 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
				StartTime: cos.startTime, // 时间戳，单位秒，如：1580000000
				ExpiredTime: cos.expiredTime // 时间戳，单位秒，如：1580000000
			})
		},
		Domain: 'pocket-face.xiaozhuquan.cn',
		Protocol: 'https:'
	})
	return await new Promise((resolve) => {
		cosf.uploadFile(
			{
				Bucket: cos.bucket /* 填写自己的 bucket，必须字段 grab-1302870652*/,
				Region: cos.region /* 存储桶所在地域，必须字段 ap-shanghai*/,
				Key: cos.filekey /*'img/' + new Date().getTime()*/,
				Body: files, // 上传文件对象
				SliceSize:
					1024 *
					1024 *
					5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
				onProgress: function () {
					// console.log('progressData:', JSON.stringify(progressData));
				}
			},
			function (err: any, data: any) {
				if (err) {
					console.log('上传失败', err)
					resolve(false)
				} else {
					if (type != 1) {
						resolve({ path: `https://${data.Location}`, cutPath: '' })
						Toast.success('上传成功')
						return
					}
					cosf.request(
						{
							Bucket: cos.bucket,
							Region: cos.region,
							Key: cos.filekey,
							Method: 'GET',
							RawBody: true,
							Query: {
								'time': 1,
								'ci-process': 'snapshot' /** 固定值，必须 */
							},
							DataType: 'blob'
						},
						function (err1: any, datadesc: any) {
							console.log(err1)
							resolve({ path: `https://${data.Location}`, cutPath: datadesc.Body })
						}
					)
				}
			}
		)
	})
}
// 指定长度和基数
export const uuid2 = (len, radix) => {
	let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
	let uuid: any = [],
		i
	radix = radix || chars.length
	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
	} else {
		let r
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
		uuid[14] = '4'
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | (Math.random() * 16)
				uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
			}
		}
	}
	return uuid.join('')
}
