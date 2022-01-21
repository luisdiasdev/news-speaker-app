import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  DEFAULT_FEATURE_FLAG_VALUES,
  FeatureFlagKeys
} from '@shared/constants/featureFlags'

type FeatureFlagState = {
  [T in FeatureFlagKeys]: boolean
}

const initialState = {
  ...DEFAULT_FEATURE_FLAG_VALUES
} as FeatureFlagState

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    enableFeatureFlag(state, action: PayloadAction<FeatureFlagKeys>) {
      state[action.payload] = true
    },
    disableFeatureFlag(state, action: PayloadAction<FeatureFlagKeys>) {
      state[action.payload] = false
    }
  }
})

export const { enableFeatureFlag, disableFeatureFlag } =
  featureFlagsSlice.actions
export const { reducer: featureFlagReducer } = featureFlagsSlice
