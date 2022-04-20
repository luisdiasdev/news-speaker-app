import { AppState } from '../../types'

export const getFeedFileByLocalId = (localId: string) => (state: AppState) =>
  state.feedFile.entities[localId]
