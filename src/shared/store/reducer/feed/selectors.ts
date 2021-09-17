import { AppState } from '../../types'

export const getFeedList = (state: AppState) => state.feed.entities

export const getFeedById = (id: string) => (state: AppState) =>
  state.feed.entities[id]
