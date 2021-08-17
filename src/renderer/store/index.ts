import { combineReducers } from '@reduxjs/toolkit'

import { appReducer } from './app'
import { configure as configureStore } from './store'

export const rootReducer = combineReducers({
  main: appReducer
})

export type State = ReturnType<typeof rootReducer>

export const makeStore = () => configureStore(rootReducer)
