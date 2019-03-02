interface InterfaceElectron {
    remote: any
    ipcRenderer: any
    shell: any
}
const electron: InterfaceElectron = (window as any).require('electron')
export const remote = electron.remote
export const ipcRenderer = electron.ipcRenderer
export const shell = electron.shell

export function openExternalUrl(url: string) {
    return shell.openExternal(url)
}

export default electron
