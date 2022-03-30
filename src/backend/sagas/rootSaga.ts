import { BrowserWindow } from 'electron'
import { all } from 'redux-saga/effects'

import { appSagas } from './app'

export function* rootSaga(mainWindow: BrowserWindow) {
  yield all([...appSagas(mainWindow)])
}
