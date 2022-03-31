import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { FeedFile } from '@shared/domain/feedFile'

const feedFileAdapter = createEntityAdapter<FeedFile>({
  selectId: feedFile => feedFile.localId
})

const feedFileSlice = createSlice({
  name: 'feedFile',
  initialState: feedFileAdapter.getInitialState(),
  reducers: {
    addFeedFile: feedFileAdapter.addOne,
    updateFeedFile: feedFileAdapter.updateOne,
    removeFeedFile: feedFileAdapter.removeOne
  }
})

export const { addFeedFile, updateFeedFile, removeFeedFile } =
  feedFileSlice.actions
export const { reducer: feedFileReducer } = feedFileSlice
