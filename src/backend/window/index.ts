import constants from '@shared/constants'
import { BrowserWindow } from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer'
import path from 'path'

import { isDevelopment } from '../helpers/is-dev'
import { configureSessionCSP, configureSessionPermissions } from './session'

let mainWindow: BrowserWindow

export function createWindow(): BrowserWindow {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
    mainWindow.webContents.once('dom-ready', async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then(name => console.log(`Added Extension: ${name}`))
        .catch(err => console.log('An error occurred: ', err))
        .finally(() => {
          // Open the DevTools.
          mainWindow.webContents.openDevTools()
        })
    })
  }

  configureSessionPermissions()
  configureSessionCSP()

  return mainWindow
}
