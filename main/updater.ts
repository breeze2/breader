import { BrowserWindow, dialog, KeyboardEvent, MenuItem } from 'electron'
import { autoUpdater } from 'electron-updater'

let updaterMenuItem: MenuItem

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

autoUpdater.on('error', error => {
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
        autoUpdater.downloadUpdate()
      } else {
        updaterMenuItem.enabled = true
      }
    })
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    message: 'Current version is up-to-date.',
    title: 'No Updates',
  })
  updaterMenuItem.enabled = true
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
  updaterMenuItem = menuItem
  updaterMenuItem.enabled = false
  autoUpdater.checkForUpdates()
}
