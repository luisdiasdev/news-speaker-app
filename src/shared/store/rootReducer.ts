import { combineReducers } from '@reduxjs/toolkit'

import { featureFlagReducer } from './reducer/featureFlags'
import { feedReducer } from './reducer/feed'
import { mainReducer } from './reducer/main'

export const rootReducer = combineReducers({
  main: mainReducer,
  feed: feedReducer,
  featureFlags: featureFlagReducer
})
