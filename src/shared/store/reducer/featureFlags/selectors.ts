import { FeatureFlagKeys } from '@shared/constants/featureFlags'
import { AppState } from '@shared/store'

export const isFeatureFlagEnabled =
  (key: FeatureFlagKeys) => (state: AppState) =>
    state.featureFlags[key]
