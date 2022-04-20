/*
 * @Author: whf
 * @Date: 2021-01-06 10:01:40
 * @LastEditTime: 2022-04-20 16:44:05
 * @FilePath: \AneuFiler\main.js
 */

const {app, BrowserWindow,globalShortcut} = require('electron')

const fs = require('fs')
const log = require('electron-log')
const path = require('path')
const ipc =require('electron').ipcMain
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
ipc.on('tab3',()=>{
  mainWindow.on("focus",()=>{
    globalShortcut.register("CommandOrControl+F",function(){
      if(mainWindow && mainWindow.webContents){
        mainWindow.webContents.send('on-find','')
      }
    })
  })
  mainWindow.on('blur',()=>{
    globalShortcut.unregister('CommandOrControl+F')
  })
})
app.on('ready', function() { createWindow() })

// Quit when all windows are closed.
app.on('window-all-closed', function () { 
  const { app } = require('electron');
      var filepath = path.join(app.getPath("temp"))
      var filename = "AneuFiler.log"
      fs.unlink(path.join(filepath, filename),function (err) {
        if (err) {
            console.log("An error ocurred updating the file" + err.message)
            return
        }
        console.log("File succesfully deleted")
      })
  app.quit()
  globalShortcut.unregister('CommandOrControl+F')
 })

app.on('activate', function () { if (mainWindow === null) createWindow() })