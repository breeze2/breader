import { ProgressInfo, UpdateInfo } from 'builder-util-runtime'
import { dialog, Menu } from 'electron'
import { autoUpdater } from 'electron-updater'
export type IUpdaterStatus =
  | 'UPDATER_CHECKING'
  | 'UPDATER_DOWNLOADING'
  | 'UPDATER_ERROR'
  | 'UPDATER_NORMAL'
  | 'UPDATER_READY'
export const UPDATER_STATUS_MAP: { [key: string]: IUpdaterStatus } = {
  CHECKING: 'UPDATER_CHECKING',
  DOWNLOADING: 'UPDATER_DOWNLOADING',
  ERROR: 'UPDATER_ERROR',
  NORMAL: 'UPDATER_NORMAL',
  READY: 'UPDATER_READY',
}

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

let updaterStatus: IUpdaterStatus = UPDATER_STATUS_MAP.NORMAL

function setUpdaterStatus(status: IUpdaterStatus, meta?: any) {
  updaterStatus = status
  const menu = Menu.getApplicationMenu()
  if (!menu) {
    return
  }
  for (const i in UPDATER_STATUS_MAP) {
    if (UPDATER_STATUS_MAP[i]) {
      const item = menu.getMenuItemById(UPDATER_STATUS_MAP[i])
      item.visible = item.id === updaterStatus
    }
  }
  Menu.setApplicationMenu(menu)
}

function quitAndInstall() {
  setImmediate(() => autoUpdater.quitAndInstall())
}

function initAutoUpdater() {
  autoUpdater.on('error', error => {
    setUpdaterStatus(UPDATER_STATUS_MAP.ERROR)
    dialog.showErrorBox(
      'Error: ',
      error == null ? 'unknown' : (error.stack || error).toString()
    )
  })

  autoUpdater.on('checking-for-update', () => {
    setUpdaterStatus(UPDATER_STATUS_MAP.CHECKING)
  })

  autoUpdater.on('update-available', (info: UpdateInfo) => {
    dialog
      .showMessageBox({
        buttons: ['Yes', 'No'],
        message: `Found updates v${info.version}, do you want update now?`,
        title: 'Found Updates',
        type: 'info',
      })
      .then(data => {
        const buttonIndex = data.response
        if (buttonIndex === 0) {
          setUpdaterStatus(UPDATER_STATUS_MAP.DOWNLOADING)
          autoUpdater.downloadUpdate()
        } else {
          setUpdaterStatus(UPDATER_STATUS_MAP.NORMAL)
        }
      })
  })

  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      message: 'Current version is up-to-date.',
      title: 'No Updates',
    })
    setUpdaterStatus(UPDATER_STATUS_MAP.NORMAL)
  })

  autoUpdater.on('download-progress', (info: ProgressInfo) => {
    // Do Nothing
    // setUpdaterStatus(UPDATER_STATUS_MAP.PROGRESS, { progress: ~~info.percent })
  })

  autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
    dialog
      .showMessageBox({
        buttons: ['Yes', 'No'],
        message: `Updates v${info.version} downloaded, application will be quit for update...`,
        title: 'Install Updates',
      })
      .then(data => {
        const buttonIndex = data.response
        if (buttonIndex === 0) {
          quitAndInstall()
        }
      })
    setUpdaterStatus(UPDATER_STATUS_MAP.READY)
  })
}

export function initUpdaterMenuItems() {
  initAutoUpdater()
}

export function checkForUpdates() {
  autoUpdater.checkForUpdates()
}

export function restartToUpdate() {
  if (updaterStatus === UPDATER_STATUS_MAP.READY) {
    return quitAndInstall()
  }
}
