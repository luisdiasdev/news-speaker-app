import { AppState } from '../../types'

export const getFeedList = (state: AppState) => state.feed.entities
