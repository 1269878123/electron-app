import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import target from 'vite-plugin-target'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()]
	},
	preload: {
		plugins: [externalizeDepsPlugin()]
	},
	renderer: {
		envDir: resolve(__dirname, './env'),
		envPrefix: 'BY__',
		resolve: {
			alias: {
				'@': resolve('src/renderer/src'),
				'@assets': resolve('src/renderer/src/assets'),
				'@components': resolve('src/renderer/src/components')
			}
		},
		plugins: [target({ 'electron-renderer': { nodeIntegration: true } }), vue()],
		server: {
			host: '0.0.0.0',
			proxy: {
				'/api': {
					target: 'http://124.222.67.109:8088',
					changeOrigin: true,
					secure: false,
					rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		}
	}
})
