import { combineReducers } from '@reduxjs/toolkit'

import { mainReducer } from './main'

export const rootReducer = combineReducers({
  main: mainReducer
})

export type State = ReturnType<typeof rootReducer>
