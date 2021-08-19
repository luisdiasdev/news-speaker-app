import { app, BrowserWindow } from 'electron'
import { URL } from 'url'

import { makeStore } from './store'
import { setValue } from './store/main'
import { createWindow } from './window'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
}

async function onAppReady() {
  createWindow()

  const { store } = makeStore()

  console.log('redux store created -> ', store.getState())

  store.subscribe(() => {
    const state = store.getState()
    console.log('new state => ', state)
  })
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
