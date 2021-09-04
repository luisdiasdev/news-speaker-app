import { combineReducers } from '@reduxjs/toolkit'

import { feedReducer } from './reducer/feed'
import { mainReducer } from './reducer/main'

export const rootReducer = combineReducers({
  main: mainReducer,
  feed: feedReducer
})
