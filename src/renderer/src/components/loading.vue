<template>
  <div v-if="props.loading" class="h-full w-full absolute top-0 left-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
    <div class="spinner is-elastic h-7 w-7 animate-spin rounded-full border-[3px] border-primary/30 border-r-primary"></div>
    <span class="mt-2">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
/**
 * loading组件
 */
const props = defineProps({
	loading: {
		type: Boolean,
		default: false
	},
	text: {
		type: String,
		default: '上传中'
	}
})
</script>
