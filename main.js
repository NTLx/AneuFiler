/*
 * @Author: whf
 * @Date: 2021-01-06 10:01:40
 * @LastEditTime: 2021-01-06 14:38:11
 * @FilePath: \AneuFiler\main.js
 */

const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 680,
    height: 410,
    autoHideMenuBar: true,
    frame: true,
    transparent: false,
    resizable: true,
    alwaysOnTop: false, // [true] had bad experience on windows
    webPreferences: {
      nodeIntegration: true,
      contextIsolation:false,//slove the alarm problem
      enableRemoteModule:true //ensure renderer.js can be used normally require('electron').remote
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () { mainWindow = null })
}

app.on('ready', function() { createWindow() })

// Quit when all windows are closed.
app.on('window-all-closed', function () { app.quit() })

app.on('activate', function () { if (mainWindow === null) createWindow() })
