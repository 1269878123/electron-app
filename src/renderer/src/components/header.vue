<template>
  <div class="mt-1 w-full">
    <div class="flex justify-between">
      <div class="flex-1 app-drag"></div>
      <div class="-mr-3 text-end">
        <a @click="ipcRenderer.send('min')" class="btn rounded-md p-1 text-slate-400 hover:bg-slate-200/90 hover:text-slate-700 focus:bg-slate-200 active:bg-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l14 0"></path>
          </svg>
        </a>
        <button @click="ipcRenderer.send('close')" class="btn rounded-md p-1 text-slate-400 hover:bg-slate-200/90 hover:text-slate-700 focus:bg-slate-200 active:bg-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron'
// import { Toast } from '@/utils/common'
</script>
