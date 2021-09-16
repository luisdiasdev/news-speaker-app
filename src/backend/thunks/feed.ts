import { createAsyncThunk } from '@reduxjs/toolkit'
import { Feed } from '@shared/domain/feed'
import { updateFeedContent } from '@shared/store/reducer/feed'

import { fetchRSSFeedFromURL, saveParsedRSSFeedAsFile } from '../use-cases/feed'

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (feed: Feed, { dispatch }) => {
    const rssFeed = await fetchRSSFeedFromURL(feed.url)
    const lastUpdatedTime = +new Date()
    const latestHash = await saveParsedRSSFeedAsFile(
      feed,
      rssFeed,
      lastUpdatedTime
    )

    dispatch(
      updateFeedContent({
        ...feed,
        lastUpdatedTime,
        latestHash
      })
    )
  }
)
