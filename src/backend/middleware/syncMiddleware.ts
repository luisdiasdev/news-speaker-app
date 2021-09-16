import { Middleware } from '@reduxjs/toolkit'
import { AppDispatchMain } from '@shared/store/configureStore/main'
import { addFeed } from '@shared/store/reducer/feed'

import { fetchFeed } from '../thunks/feed'

export function syncMiddleware(): Middleware<never, never, AppDispatchMain> {
  return ({ dispatch }) => {
    return next => action => {
      switch (action.type) {
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
