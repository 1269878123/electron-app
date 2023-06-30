import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import VueTippy from 'vue-tippy'
import '@/assets/style/index.css'
import { createPinia } from 'pinia'
export const pinia = createPinia()
const app = createApp(App)
app
	.use(router)
	.use(pinia)
	.use(VueTippy, {
		directive: 'tippy', // => v-tippy
		component: 'tippy', // => <tippy/>
		componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
		defaultProps: {
			placement: 'auto-end',
			allowHTML: true
		} // => Global default options * see all props
	})
	.mount('#app')
console.log(import.meta.env.BY__MODE, import.meta.env.BY__BASE_URL, '????')
