import { combineReducers } from '@reduxjs/toolkit'

import { mainReducer } from './main'
import { configure as configureStore } from './store'

export const rootReducer = combineReducers({
  main: mainReducer
})

export type State = ReturnType<typeof rootReducer>

export const makeStore = () => configureStore(rootReducer)
