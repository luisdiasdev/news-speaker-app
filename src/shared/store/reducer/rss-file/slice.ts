import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RSSFile } from '@shared/domain/rss-file'

const rssFileAdapter = createEntityAdapter<RSSFile>({
  selectId: rssFile => rssFile.localId
})

const rssFileSlice = createSlice({
  name: 'rssFile',
  initialState: rssFileAdapter.getInitialState(),
  reducers: {
    add: rssFileAdapter.addOne,
    remove: rssFileAdapter.removeOne
  }
})

export const { add, remove } = rssFileSlice.actions
export const { reducer: rssFileReducer } = rssFileSlice
