import { combineReducers } from '@reduxjs/toolkit'

import { mainReducer } from './main'
import { persistRootReducer } from './persistence'
import { Scope } from './types'

const rootReducer = combineReducers({
  main: mainReducer
})

type RootReducerType = typeof rootReducer

export function configureRootReducer(
  appName: string,
  scope: Scope
): RootReducerType {
  if (scope === Scope.MAIN) {
    return persistRootReducer(appName, rootReducer)
  } else {
    return rootReducer
  }
}

export type AppState = ReturnType<RootReducerType>
