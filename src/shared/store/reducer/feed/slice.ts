import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Feed } from '../../../domain/feed'

interface FeedState {
  items: Feed[]
}

const initialState: FeedState = { items: [] }

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addFeed(state, action: PayloadAction<Feed>) {
      state.items.push(action.payload)
    }
  }
})

export const { addFeed } = feedSlice.actions
export const { reducer: feedReducer } = feedSlice
