import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'node:path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
let win
async function createWindow() {
	win = new BrowserWindow({
		minWidth: 800,
		minHeight: 600,
		maxWidth: 800,
		maxHeight: 600,
		useContentSize: true,
		frame: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			nodeIntegration: true,
			contextIsolation: false
		}
	})
	win.on('ready-to-show', () => {
		win.show()
	})
	win.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		win.webContents.openDevTools()
		win.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		win.loadFile(join(__dirname, '../renderer/index.html'))
	}
}
if (!app.requestSingleInstanceLock()) {
	app.quit()
	process.exit(0)
}
const Store = require('electron-store')
// 初始化
Store.initRenderer()
app.whenReady().then(() => {
	electronApp.setAppUserModelId('com.electron')
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})
	createWindow()
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
ipcMain.on('max', () => {
	if (win.isMaximized()) {
		win.unmaximize()
	} else {
		win.maximize()
	}
})
ipcMain.on('min', () => {
	win.minimize()
})
ipcMain.on('close', () => {
	win.close()
})
