import { Middleware } from '@reduxjs/toolkit'
import { AppDispatchMain } from '@shared/store/configureStore/main'
import { addFeed } from '@shared/store/reducer/feed'
import { REHYDRATE } from 'redux-persist'

import { fetchFeed, refreshFeed } from '../thunks/feed'

export function syncMiddleware(): Middleware<never, never, AppDispatchMain> {
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
        default:
          return next(action)
      }
    }
  }
}
