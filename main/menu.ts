import {
  app,
  BrowserWindow,
  Event,
  MenuItem,
  MenuItemConstructorOptions,
  shell,
} from 'electron'

export const template: MenuItemConstructorOptions[] = [
  {
    label: 'Edit',
    submenu: [
      {
        accelerator: 'CmdOrCtrl+Z',
        label: 'Undo',
        role: 'undo',
      },
      {
        accelerator: 'Shift+CmdOrCtrl+Z',
        label: 'Redo',
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        accelerator: 'CmdOrCtrl+X',
        label: 'Cut',
        role: 'cut',
      },
      {
        accelerator: 'CmdOrCtrl+C',
        label: 'Copy',
        role: 'copy',
      },
      {
        accelerator: 'CmdOrCtrl+V',
        label: 'Paste',
        role: 'paste',
      },
      {
        accelerator: 'CmdOrCtrl+A',
        label: 'Select All',
        role: 'selectAll',
      },
    ],
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        click: () => {
          shell.openExternal('https://github.com/breeze2/breader')
        },
        label: 'Learn More',
      },
      {
        accelerator: 'CmdOrCtrl+Alt+I',
        label: 'Toggle Developer Tools',
        role: 'toggleDevTools',
      },
    ],
  },
]

function addUpdateMenuItems(
  items: MenuItemConstructorOptions[],
  position: number
) {
  if (process.mas) {
    return
  }

  const version = app.getVersion()
  const updateItems: MenuItemConstructorOptions[] = [
    {
      enabled: false,
      label: `Version ${version}`,
    },
  ]

  items.splice.apply(items, [position, 0, ...updateItems])
}

function addPreferencesMenu(
  menus: MenuItemConstructorOptions[],
  position: number
) {
  const settingsMenu = {
    label: 'Preferences',
    submenu: [
      {
        click: (
          menuItem: MenuItem,
          browserWindow: BrowserWindow,
          event: Event
        ) => {
          if (browserWindow) {
            browserWindow.webContents.send('PREFERENCES_MODAL', 'OPEN')
          }
        },
        label: 'Settings',
      },
    ],
  }
  menus.splice.apply(menus, [position, 0, settingsMenu])
}

if (process.platform === 'darwin') {
  const name = app.getName()
  template.unshift({
    label: name,
    submenu: [
      {
        label: `About ${name}`,
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: 'Services',
        role: 'services',
        submenu: [],
      },
      {
        type: 'separator',
      },
      {
        accelerator: 'Command+H',
        label: `Hide ${name}`,
        role: 'hide',
      },
      {
        accelerator: 'Command+Alt+H',
        label: 'Hide Others',
        role: 'hideOthers',
      },
      {
        label: 'Show All',
        role: 'unhide',
      },
      {
        type: 'separator',
      },
      {
        accelerator: 'Command+Q',
        click: () => {
          app.quit()
        },
        label: 'Quit',
      },
    ],
  })

  addPreferencesMenu(template[0].submenu as MenuItemConstructorOptions[], 1)
  addUpdateMenuItems(template[0].submenu as MenuItemConstructorOptions[], 1)
  // addPreferencesMenu(template, template.length - 1)
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu

  addUpdateMenuItems(helpMenu as MenuItemConstructorOptions[], 0)
  addPreferencesMenu(template, template.length - 1)
}
