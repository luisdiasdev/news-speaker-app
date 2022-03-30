import { AnyAction } from '@reduxjs/toolkit'
import {
  closeWindowAction,
  openExternalLinkAction
} from '@shared/store/reducer/main'
import { BrowserWindow } from 'electron'
import { REHYDRATE } from 'redux-persist'
import { call, takeLeading } from 'redux-saga/effects'

import { closeWindow } from '../../helpers/close-window'
import { openInBrowser } from '../../helpers/open'
import { refreshFeed } from '../../thunks/feed'

function* handleRehydrate(action: AnyAction) {
  console.log('rehydrate...', action)
  const { payload } = action
  if (payload && !payload.err) {
    // TODO: Refactor this function NOT to be a thunk
    // And to be called correctly: call(refreshFeed)
    yield refreshFeed(null)
  }
}

function* handleCloseWindow(window: BrowserWindow) {
  yield call(closeWindow, window)
}

type OpenExternalLinkActionType = ReturnType<typeof openExternalLinkAction>
function* handleOpenExternalLink(action: OpenExternalLinkActionType) {
  yield call(openInBrowser, action.payload)
}

export const appSagas = (window: BrowserWindow) => [
  takeLeading(REHYDRATE, handleRehydrate),
  takeLeading(closeWindowAction.type, handleCloseWindow, window),
  takeLeading(openExternalLinkAction.type, handleOpenExternalLink)
]
