<template>
  <div class="px-4 pb-4 bg-slate-100 h-screen w-screen overflow-hidden">
    <sideBar />
    <div class="relative p-8 bg-white h-[calc(100vh-5rem)] shadow-sm overflow-y-auto rounded-lg z-10">
      <router-view />
    </div>
    <Loading :loading="load" :text="textVal" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import sideBar from '@components/sideBar.vue'
import Loading from '@components/loading.vue'
import { useHomeStore } from '@/store'
const useStore = useHomeStore()
const load = computed(() => {
	return useStore.isShow
})
const textVal = computed(() => {
	return useStore.text
})
</script>
