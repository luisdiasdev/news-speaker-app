import { BrowserWindow } from 'electron'
import path from 'path'

import constants from '../../shared/constants'
import { isDevelopment } from '../helpers/is-dev'
import { configureSessionPermissions } from './session'

export function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: constants.WindowBounds.height,
    width: constants.WindowBounds.width,
    minHeight: constants.WindowMinBounds.height,
    minWidth: constants.WindowMinBounds.width,
    frame: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.removeMenu()

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  if (isDevelopment()) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  }

  configureSessionPermissions()

  return mainWindow
}
