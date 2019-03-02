interface InterfaceElectron {
    remote: any
    ipcRenderer: any
}
const electron: InterfaceElectron = (window as any).require('electron')
export const remote = electron.remote
export const ipcRenderer = electron.ipcRenderer

export function openWebView(url: string, rect: any) {
    const rst = ipcRenderer.sendSync('SYNC_MESSAGE', {
        action: 'OPEN_BROWSER_VIEW',
        payload: {
            rect: {
                height: Math.round(rect.height),
                width: Math.round(rect.width),
                x: Math.round(rect.x),
                y: Math.round(rect.y),
            },
            url,
        },
    })
    return rst === 'OK' ? true : false
}

export function closeWebView() {
    const rst = ipcRenderer.sendSync('SYNC_MESSAGE', { action: 'CLOSE_BROWSER_VIEW' })
    return rst === 'OK' ? true : false
}

export default electron
