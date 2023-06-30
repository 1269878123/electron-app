<template>
	<div class="flex items-center justify-center mt-8">
		<div class="hidden">
			<span v-if="!showTotal"
				>共{{ totalPage }}页<span class="text-slate-200 mx-2">/</span>{{ total }}条</span
			>
		</div>
		<div>
			<nav class="isolate inline-flex -space-x-px rounded-md bg-white" aria-label="Pagination">
				<span
					@click="changePage(state.currentPage - 1)"
					class="cursor-pointer relative flex justify-center items-center rounded-l-md px-3 py-2 text-slate-400 ring-1 ring-inset ring-slate-100 hover:bg-slate-50 focus:z-20 focus:outline-offset-0"
				>
					<span class="sr-only">Previous</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-3.5 h-3.5"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M15 6l-6 6l6 6"></path>
					</svg>
				</span>
				<span
					@click="changePage(1)"
					aria-current="page"
					:class="[
						{ 'bg-navy-150 text-navy-650 hover:bg-navy-150': state.currentPage === 1 },
						'cursor-pointer relative items-center px-3.5 py-2 text-sm  ring-1 ring-inset ring-slate-100 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
					]"
					>1</span
				>
				<span
					v-show="state.forwardMore && pageList[0] - 1 > 1"
					class="cursor-pointer relative items-center px-3 py-2 text-sm ring-1 ring-inset ring-slate-100 hover:bg-slate-50 focus:z-20 focus:outline-offset-0"
				>
					<span class="u-ellipsis">...</span>
				</span>
				<span
					v-for="(page, index) in pageList"
					:key="index"
					@click="changePage(page)"
					:class="[
						{ 'bg-navy-150 text-navy-650 hover:bg-navy-150': state.currentPage === page },
						'cursor-pointer relative items-center px-3.5 py-2 text-sm  ring-1 ring-inset ring-slate-100 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
					]"
				>
					{{ page }}
				</span>
				<span
					v-show="state.backwardMore && pageList[pageList.length - 1] + 1 < totalPage"
					class="cursor-pointer relative items-center px-3.5 py-2 text-sm ring-1 ring-inset ring-slate-100 hover:bg-slate-50 focus:z-20 focus:outline-offset-0"
				>
					<span class="u-ellipsis">...</span>
				</span>
				<span
					v-show="totalPage !== 1"
					@click="changePage(totalPage)"
					:class="[
						{
							'bg-navy-150 text-navy-650 hover:bg-navy-150': state.currentPage === totalPage
						},
						'cursor-pointer relative inline-flex items-center px-3.5 py-2 text-sm  ring-1 ring-inset ring-slate-100 hover:bg-slate-50 focus:z-20 focus:outline-offset-0'
					]"
				>
					{{ totalPage }}
				</span>
				<span
					@click="changePage(state.currentPage + 1)"
					:class="[
						{ disabled: state.currentPage === totalPage },
						'cursor-pointer relative flex justify-center items-center rounded-r-md text-center px-3 py-2 text-slate-400 ring-1 ring-inset ring-slate-100 hover:bg-slate-50 focus:z-20 focus:outline-offset-0'
					]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-3.5 h-3.5"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M9 6l6 6l-6 6"></path>
					</svg>
				</span>
			</nav>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
const props = defineProps({
	current: {
		// 当前页数
		type: Number,
		default: 1
	},
	pageSize: {
		// 每页条数
		type: Number,
		default: 5
	},
	total: {
		// 数据总数
		type: Number,
		default: 0
	},
	pageListNum: {
		// 显示的页码数组长度
		type: Number,
		default: 5
	},
	hideOnSinglePage: {
		// 只有一页时是否隐藏分页器
		type: Boolean,
		default: false
	},
	showQuickJumper: {
		// 是否可以快速跳转至某页
		type: Boolean,
		default: false
	},
	showTotal: {
		// 是否显示当前页数和数据总量
		type: Boolean,
		default: false
	},
	placement: {
		// 分页器展示位置，靠左left，居中center，靠右right
		type: String,
		default: 'right'
	}
})
const emit = defineEmits(['changePage'])
const state = reactive<any>({
	currentPage: props.current, // 当前页数
	jumpNumber: '', // 跳转的页码
	forwardMore: false, // 左省略号展示
	backwardMore: false, // 右省略号展示
	forwardArrow: false, // 左箭头展示
	backwardArrow: false // 右箭头展示
})
const totalPage = computed(() => {
	return Math.ceil(props.total / props.pageSize) // 向上取整
})
const pageList = computed(() => {
	return dealPageList(state.currentPage).filter((n) => n !== 1 && n !== totalPage.value)
})
watch(
	() => props.current,
	(n) => {
		state.currentPage = n
	}
)
watch(
	() => state.currentPage,
	(n) => {
		emit('changePage', n)
	}
)
const dealPageList = (curPage: number) => {
	let resList: any = []
	let offset = Math.floor(props.pageListNum / 2) // 向下取整
	let pager = {
		start: curPage - offset,
		end: curPage + offset
	}
	if (pager.start < 1) {
		pager.end = pager.end + (1 - pager.start)
		pager.start = 1
	}
	if (pager.end > totalPage.value) {
		pager.start = pager.start - (pager.end - totalPage.value)
		pager.end = totalPage.value
	}
	if (pager.start < 1) {
		pager.start = 1
	}
	if (pager.start > 1) {
		state.forwardMore = true
	} else {
		state.forwardMore = false
	}
	if (pager.end < totalPage.value) {
		state.backwardMore = true
	} else {
		state.backwardMore = false
	}
	// 生成要显示的页码数组
	for (let i = pager.start; i <= pager.end; i++) {
		resList.push(i)
	}
	return resList
}
// const jumpPage = (jumpNum) => {
//     if (Number(jumpNum)) {
//         if (Number(jumpNum) < 1) {
//             jumpNum = 1
//         }
//         if (Number(jumpNum) > totalPage.value) {
//             jumpNum = totalPage.value
//         }
//         changePage(Number(jumpNum))
//     }
//     state.jumpNumber = '' // 清空跳转输入框
// }
const changePage = (pageNum: any) => {
	if (pageNum === 0 || pageNum === totalPage.value + 1) {
		return
	}
	if (state.currentPage !== pageNum) {
		// 点击的页码不是当前页码
		state.currentPage = pageNum
	}
}
</script>
