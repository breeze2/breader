import { BrowserWindow, dialog, KeyboardEvent, MenuItem } from 'electron'
import { autoUpdater } from 'electron-updater'
enum EUpdaterStatus {
  CHECKING,
  DOWNLOADING,
  ERROR,
  NORMAL,
  READY,
}
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

let updateMenuItem: MenuItem
let updaterStatus: EUpdaterStatus = EUpdaterStatus.NORMAL

function setUpdaterStatus(status: EUpdaterStatus) {
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

autoUpdater.on('update-available', () => {
  dialog
    .showMessageBox({
      buttons: ['Sure', 'No'],
      message: 'Found updates, do you want update now?',
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

autoUpdater.on('download-progress', response => {
  console.info('Updating ', response.progress)
})

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      message: 'Updates downloaded, application will be quit for update...',
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
