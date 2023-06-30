import { useRoute, createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/pages/login/index.vue'
import Home from '@/pages/home/index.vue'
import Base from '@/pages/base/index.vue'
import Records from '@/pages/records/index.vue'
import uniq from 'lodash/uniq'

/**
 * 备注：当前页面调用的方法
 * routers：路由配置
 * routeModuleList：路由暂存
 * asyncRouterList：存放动态路由
 * defaultRouterList：默认路由->存放固定的路由
 * allRoutes：所有路由
 * getRoutesExpanded：获取扩展路由
 * getActive：获取活动路由
 * createRouter：创建路由
 */

/**
 * @description: 路由配置
 */
const routers = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'Login',
		meta: { title: '登录' },
		component: Login
	},
	{
		path: '/home',
		name: 'Home',
		meta: { title: '首页' },
		component: Home,
		redirect: '/base',
		children: [
			{
				path: '/base',
				name: 'Base',
				meta: { title: '融合' },
				component: Base
			},
			{
				path: '/records',
				name: 'Records',
				meta: { title: '我的记录' },
				component: Records
			}
		]
	}
]

/**
 * @description: 路由暂存
 */
const routeModuleList: Array<RouteRecordRaw> = []
routeModuleList.push(...routers)

/**
 * 存放动态路由
 */
export const asyncRouterList: Array<RouteRecordRaw> = [...routeModuleList]

/**
 * @description: 默认路由->存放固定的路由
 */
const defaultRouterList: Array<RouteRecordRaw> = []

/**
 * @description: 所有路由
 */
export const allRoutes = [...defaultRouterList, ...asyncRouterList]

/**
 * 获取扩展路由
 */
export const getRoutesExpanded = () => {
	const expandedRoutes: Array<String> = []

	allRoutes.forEach((item) => {
		if (item.meta && item.meta.expanded) {
			expandedRoutes.push(item.path)
		}
		if (item.children && item.children.length > 0) {
			item.children
				.filter((child) => child.meta && child.meta.expanded)
				.forEach((child: RouteRecordRaw) => {
					expandedRoutes.push(item.path)
					expandedRoutes.push(`${item.path}/${child.path}`)
				})
		}
	})
	return uniq(expandedRoutes)
}

/**
 * 获取活动路由
 * @param maxLevel
 */
export const getActive = (maxLevel = 3): string => {
	const route = useRoute()
	if (!route.path) {
		return ''
	}
	return route.path
		.split('/')
		.filter((_item: string, index: number) => index <= maxLevel && index > 0)
		.map((item: string) => `/${item}`)
		.join('')
}

/**
 * @description: 创建路由
 */
const router = createRouter({
	history: createWebHashHistory(),
	routes: allRoutes,
	scrollBehavior() {
		return {
			el: '#app',
			top: 0,
			behavior: 'smooth'
		}
	}
})

export default router
