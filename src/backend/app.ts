import { configureStoreMain } from '@shared/store/configureStore/main'
import {
  mainStateEnhancer,
  mainStateSyncMiddleware
} from '@shared/store/ipc/main/stateEnhancer'
import { app, BrowserWindow, protocol } from 'electron'
import { URL } from 'url'

import FileProtocol from './fileProtocol'
import { syncMiddleware } from './middleware/syncMiddleware'
import { createWindow } from './window'

// On Linux based OSes you need to have `speech-dispatcher` and `espeak` installed
// Need to verify on Windows & MacOS what is the behaviour
// https://github.com/electron/electron/issues/22844#issuecomment-635997898
// https://github.com/electron/electron/issues/586
app.commandLine.appendSwitch('enable-speech-dispatcher')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
}

async function onAppReady() {
  protocol.registerFileProtocol(
    FileProtocol.scheme,
    FileProtocol.fileProtocolHandler
  )

  createWindow()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const store = configureStoreMain(
    'news-speaker-app',
    [mainStateSyncMiddleware, syncMiddleware()],
    [mainStateEnhancer()]
  )
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onAppReady)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    // delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith(MAIN_WINDOW_WEBPACK_ENTRY)) {
      event.preventDefault()
    }
  })

  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== MAIN_WINDOW_WEBPACK_ENTRY) {
      event.preventDefault()
    }
  })

  contents.setWindowOpenHandler(({ url }) => {
    const parsedUrl = new URL(url)
    const validOrigins = [MAIN_WINDOW_WEBPACK_ENTRY]

    // Log and prevent opening up a new window
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to open a new window at the following address: '${url}'. This attempt was blocked.`
      )

      return {
        action: 'deny'
      }
    }

    return {
      action: 'allow'
    }
  })
})

process.on('uncaughtException', error => {
  console.error('Unexpected Exception Occured in main process: ', error)
})
