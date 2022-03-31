import { combineReducers } from '@reduxjs/toolkit'

import { featureFlagReducer } from './reducer/featureFlags'
import { feedReducer } from './reducer/feed'
import { feedFileReducer } from './reducer/feedFile'
import { mainReducer } from './reducer/main'

export const rootReducer = combineReducers({
  main: mainReducer,
  feed: feedReducer,
  feedFile: feedFileReducer,
  featureFlags: featureFlagReducer
})
