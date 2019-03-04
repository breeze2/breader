const { Menu, app, shell } = require('electron')

let template = [
    {
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        }, {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }]
    },
    {
        label: 'Help',
        role: 'help',
        submenu: [{
            label: 'Learn More',
            click: () => {
                shell.openExternal('https://github.com/breeze2/breader')
            }
        }]
    }
]

function addUpdateMenuItems(items, position) {
    if (process.mas) return

    const version = app.getVersion()
    let updateItems = [{
        label: `Version ${version}`,
        enabled: false
    }]

    items.splice.apply(items, [position, 0].concat(updateItems))
}

function addPreferencesMenu(menus, position) {
    const settingsMenu = {
        label: 'Preferences',
        submenu: [{
            label: 'Settings',
            click: (menuItem, browserWindow, event) => {
                if (browserWindow) {
                    browserWindow.webContents.send('PREFERENCES_MODAL', 'OPEN')
                }
            }
        }]
    }
    menus.splice.apply(menus, [position, 0, settingsMenu])
}

if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
        label: name,
        submenu: [{
            label: `About ${name}`,
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: 'Services',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: `Hide ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: 'Hide Others',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
        }, {
            label: 'Show All',
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: () => {
                app.quit()
            }
        }]
    })

    addPreferencesMenu(template[0].submenu, 1)
    addUpdateMenuItems(template[0].submenu, 1)
    // addPreferencesMenu(template, template.length - 1)
}

if (process.platform === 'win32') {
    const helpMenu = template[template.length - 1].submenu
    
    addUpdateMenuItems(helpMenu, 0)
    addPreferencesMenu(template, template.length - 1)
}

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})
