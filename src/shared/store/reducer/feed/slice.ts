import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { Feed } from '../../../domain/feed'

const feedAdapter = createEntityAdapter<Feed>({
  selectId: feed => feed.id
})

const feedSlice = createSlice({
  name: 'feed',
  initialState: feedAdapter.getInitialState(),
  reducers: {
    addFeed: feedAdapter.addOne,
    updateFeed(state, action: PayloadAction<Feed>) {
      feedAdapter.upsertOne(state, action)
    },
    deleteFeed: feedAdapter.removeOne
  }
})

export const { addFeed, updateFeed, deleteFeed } = feedSlice.actions
export const { reducer: feedReducer } = feedSlice
