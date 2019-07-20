"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
exports.template = [
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
                role: 'selectall',
            },
        ],
    },
    {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                click: function () {
                    electron_1.shell.openExternal('https://github.com/breeze2/breader');
                },
                label: 'Learn More',
            },
            {
                accelerator: 'CmdOrCtrl+Alt+I',
                label: 'Toggle Developer Tools',
                role: 'toggledevtools',
            },
        ],
    },
];
function addUpdateMenuItems(items, position) {
    if (process.mas) {
        return;
    }
    var version = electron_1.app.getVersion();
    var updateItems = [
        {
            enabled: false,
            label: "Version " + version,
        },
    ];
    items.splice.apply(items, [position, 0].concat(updateItems));
}
function addPreferencesMenu(menus, position) {
    var settingsMenu = {
        label: 'Preferences',
        submenu: [
            {
                click: function (menuItem, browserWindow, event) {
                    if (browserWindow) {
                        browserWindow.webContents.send('PREFERENCES_MODAL', 'OPEN');
                    }
                },
                label: 'Settings',
            },
        ],
    };
    menus.splice.apply(menus, [position, 0, settingsMenu]);
}
if (process.platform === 'darwin') {
    var name_1 = electron_1.app.getName();
    exports.template.unshift({
        label: name_1,
        submenu: [
            {
                label: "About " + name_1,
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
                label: "Hide " + name_1,
                role: 'hide',
            },
            {
                accelerator: 'Command+Alt+H',
                label: 'Hide Others',
                role: 'hideothers',
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
                click: function () {
                    electron_1.app.quit();
                },
                label: 'Quit',
            },
        ],
    });
    addPreferencesMenu(exports.template[0].submenu, 1);
    addUpdateMenuItems(exports.template[0].submenu, 1);
    // addPreferencesMenu(template, template.length - 1)
}
if (process.platform === 'win32') {
    var helpMenu = exports.template[exports.template.length - 1].submenu;
    addUpdateMenuItems(helpMenu, 0);
    addPreferencesMenu(exports.template, exports.template.length - 1);
}
