import { Middleware } from '@reduxjs/toolkit'
import {
  addFeed,
  deleteFeed,
  fetchNextHeadlinePage
} from '@shared/store/reducer/feed'
import {
  closeWindowAction,
  openExternalLinkAction
} from '@shared/store/reducer/main'
import { BrowserWindow } from 'electron'
import { REHYDRATE } from 'redux-persist'

import { closeWindow } from '../helpers/close-window'
import { openInBrowser } from '../helpers/open'
import { AppDispatchMain } from '../store/configureStore'
import {
  deleteFeedFiles,
  fetchFeed,
  nextHeadlinePage,
  refreshFeed
} from '../thunks/feed'

export function syncMiddleware(
  mainWindow: BrowserWindow
): Middleware<never, never, AppDispatchMain> {
  return ({ dispatch }) => {
    return next => action => {
      switch (action.type) {
        case REHYDRATE: {
          console.log('rehydrate...', action)
          const actionResult = next(action)
          const { payload } = action
          if (payload && !payload.err) {
            dispatch(refreshFeed(null))
          }
          return actionResult
        }

        case addFeed.type: {
          const actionResult = next(action)
          dispatch(fetchFeed(action.payload))
          return actionResult
        }

        case deleteFeed.type: {
          dispatch(deleteFeedFiles(action.payload))
          return next(action)
        }

        case fetchNextHeadlinePage.type: {
          dispatch(nextHeadlinePage(action.payload))
          return next(action)
        }

        case openExternalLinkAction.type: {
          openInBrowser(action.payload)
          return next(action)
        }

        case closeWindowAction.type: {
          closeWindow(mainWindow)
          return next(action)
        }

        default:
          return next(action)
      }
    }
  }
}
