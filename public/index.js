"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules to control application life and create native browser window
var electron_1 = require("electron");
var path = __importStar(require("path"));
var menu_1 = require("./menu");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        },
        height: 600,
        width: 960,
        titleBarStyle: 'hiddenInset',
        vibrancy: 'dark',
    });
    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')
    var isDev = require('electron-is-dev');
    if (isDev) {
        var _a = require('electron-devtools-installer'), installExtension = _a.default, REACT_DEVELOPER_TOOLS = _a.REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS = _a.REDUX_DEVTOOLS;
        installExtension(REACT_DEVELOPER_TOOLS)
            .then(function (name) {
            return console.info("Added Extension:  " + name);
        })
            .catch(function (err) {
            return console.error('An error occurred: ', err);
        });
        installExtension(REDUX_DEVTOOLS)
            .then(function (name) {
            return console.info("Added Extension:  " + name);
        })
            .catch(function (err) {
            return console.error('An error occurred: ', err);
        });
        // require('devtron').install()
        mainWindow.loadURL('http://localhost:3000/?react_perf');
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '/../build/index.html'));
    }
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
electron_1.app.on('ready', function () {
    var menu = electron_1.Menu.buildFromTemplate(menu_1.template);
    electron_1.Menu.setApplicationMenu(menu);
});
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
