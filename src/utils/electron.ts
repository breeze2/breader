import electron from 'electron'
export const remote = electron.remote
export const ipcRenderer = electron.ipcRenderer
export const shell = electron.shell

export function openExternalUrl(url: string) {
    return shell.openExternal(url)
}

export default electron
