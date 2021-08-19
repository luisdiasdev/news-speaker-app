import { combineReducers } from '@reduxjs/toolkit'

import { mainReducer } from './main'
import { persistRootReducer } from './persistence'
import { Scope } from './types'

const rootReducer = combineReducers({
  main: mainReducer
})

export function configureRootReducer(appName: string, scope: Scope) {
  if (scope === Scope.MAIN) {
    return persistRootReducer(appName, rootReducer)
  } else {
    return rootReducer
  }
}

export type RootState = ReturnType<typeof rootReducer>
