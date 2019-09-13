// Modules to control application life and create native browser window
import * as Sentry from '@sentry/electron'
import { app, BrowserWindow, Menu } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'
import { template as menuTemplate } from './menu'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null
const isWindows = process.platform === 'win32'

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      // preload: path.join(__dirname, './preload.js'),
    },

    frame: !isWindows,
    height: 600,
    minHeight: 600,
    minWidth: 960,
    width: 960,

    icon: path.join(__dirname, './icons/png/256x256.png'),
    show: false,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'dark',
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer')
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name: string) => console.info(`Added Extension:  ${name}`))
      .catch((err: any) => console.error('An error occurred: ', err))
    installExtension(REDUX_DEVTOOLS)
      .then((name: string) => console.info(`Added Extension:  ${name}`))
      .catch((err: any) => console.error('An error occurred: ', err))
    // require('devtron').install()

    mainWindow.loadURL('http://localhost:3000/?react_perf')
  } else {
    mainWindow.loadFile(path.join(__dirname, '/../build/index.html'))
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('ready', () => {
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_RELEASE,
  })
}
