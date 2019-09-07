import { ProgressInfo, UpdateInfo } from 'builder-util-runtime'
import { BrowserWindow, dialog, KeyboardEvent, MenuItem } from 'electron'
import { autoUpdater } from 'electron-updater'
enum EUpdaterStatus {
  CHECKING,
  DOWNLOADING,
  PROGRESS,
  ERROR,
  NORMAL,
  READY,
}
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

let updateMenuItem: MenuItem
let updaterStatus: EUpdaterStatus = EUpdaterStatus.NORMAL

function setUpdaterStatus(status: EUpdaterStatus, meta?: any) {
  updaterStatus = status
  switch (status) {
    case EUpdaterStatus.NORMAL:
      updateMenuItem.label = 'Check For Updates'
      updateMenuItem.enabled = true
      break
    case EUpdaterStatus.ERROR:
      updateMenuItem.label = 'Checking Failed'
      updateMenuItem.enabled = false
      break
    case EUpdaterStatus.CHECKING:
      updateMenuItem.label = 'Checking updates...'
      updateMenuItem.enabled = false
      break
    case EUpdaterStatus.DOWNLOADING:
      updateMenuItem.label = 'Downloading updates...'
      updateMenuItem.enabled = false
      break
    case EUpdaterStatus.PROGRESS:
      updateMenuItem.label = `Downloading ${meta.progress}`
      updateMenuItem.enabled = false
    case EUpdaterStatus.READY:
      updateMenuItem.label = 'Restart to update'
      updateMenuItem.enabled = true
      break

    default:
      break
  }
}

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

autoUpdater.on('error', error => {
  setUpdaterStatus(EUpdaterStatus.ERROR)

  dialog.showErrorBox(
    'Error: ',
    error == null ? 'unknown' : (error.stack || error).toString()
  )
})

autoUpdater.on('update-available', (info: UpdateInfo) => {
  dialog
    .showMessageBox({
      buttons: ['Sure', 'No'],
      message: `Found updates v${info.version}, do you want update now?`,
      title: 'Found Updates',
      type: 'info',
    })
    .then(data => {
      const buttonIndex = data.response
      if (buttonIndex === 0) {
        setUpdaterStatus(EUpdaterStatus.DOWNLOADING)
        autoUpdater.downloadUpdate()
      } else {
        setUpdaterStatus(EUpdaterStatus.NORMAL)
      }
    })
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    message: 'Current version is up-to-date.',
    title: 'No Updates',
  })
  setUpdaterStatus(EUpdaterStatus.NORMAL)
})

autoUpdater.on('download-progress', (info: ProgressInfo) => {
  setUpdaterStatus(EUpdaterStatus.PROGRESS, { progress: ~~info.percent })
})

autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
  dialog
    .showMessageBox({
      message: `Updates v${info.version} downloaded, application will be quit for update...`,
      title: 'Install Updates',
    })
    .then(data => {
      setImmediate(() => autoUpdater.quitAndInstall())
    })
})

// export this to MenuItem click callback
export function checkForUpdates(
  menuItem: MenuItem,
  focusedWindow: BrowserWindow,
  event: KeyboardEvent
) {
  if (updaterStatus === EUpdaterStatus.READY) {
    return setImmediate(() => autoUpdater.quitAndInstall())
  }
  updateMenuItem = menuItem
  setUpdaterStatus(EUpdaterStatus.CHECKING)
  autoUpdater.checkForUpdates()
}
