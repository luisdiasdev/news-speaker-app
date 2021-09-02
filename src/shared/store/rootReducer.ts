import { combineReducers } from '@reduxjs/toolkit'

import { mainReducer } from './reducer/main'

export const rootReducer = combineReducers({
  main: mainReducer
})

export type RootReducerType = typeof rootReducer

export type AppState = ReturnType<RootReducerType>
