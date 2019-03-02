const { BrowserView, ipcMain } = require('electron')

let browserView
let browserViewAction
function openBrowserView (win, url, rect) {
    closeBrowserView()
    browserView = new BrowserView({
        webPreferences: {
            nodeIntegration: false
        }
    })
    win.setBrowserView(browserView)
    browserView.setBounds(rect)
    browserView.webContents.loadURL(url)
}

function closeBrowserView () {
    if (browserView && !browserView.isDestroyed()) {
        browserView.destroy()
        console.log(browserView.isDestroyed())
        // browserView = null
    }
}

function makeBrowserViewAction(window) {
    return function (event, args) {
        const action = args.action
        const payload = args.payload
        // console.log(111, args, browserView)
        try {
            switch (action) {
                case 'OPEN_BROWSER_VIEW':
                    openBrowserView(window, payload.url, payload.rect)
                    break
                case 'CLOSE_BROWSER_VIEW':
                    closeBrowserView()
                    break
                default:
                    break
            }
        } catch (err) {
            console.log(err)
            return event.returnValue = 'ERR'
        }
        return event.returnValue = 'OK'
    }
} 

function unsetIpcMain() {
    if (browserViewAction) {
        ipcMain.removeListener('SYNC_MESSAGE', browserViewAction)
    }
}

function initIpcMain(window) {
    unsetIpcMain()
    browserViewAction = makeBrowserViewAction(window)
    ipcMain.on('SYNC_MESSAGE', browserViewAction)
    // ipcMain.on('ASYNC_MESSAGE', (event, args) => {
    // })
}

exports.initIpcMain = initIpcMain
exports.unsetIpcMain = unsetIpcMain
