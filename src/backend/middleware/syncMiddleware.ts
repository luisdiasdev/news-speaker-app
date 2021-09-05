import { Middleware } from '@reduxjs/toolkit'

import { addFeed } from '../../shared/store/reducer/feed'

export function syncMiddleware(): Middleware {
  return store => {
    return next => action => {
      switch (action.type) {
        case addFeed.type:
          console.log('add feed action!')
          return next(action)
        default:
          return next(action)
      }
    }
  }
}
