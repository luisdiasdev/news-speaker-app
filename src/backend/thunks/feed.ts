import { Action, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit'
import { Feed } from '@shared/domain/feed'
import { AppState } from '@shared/store'
import { updateFeedContent } from '@shared/store/reducer/feed'
import { getFeedList } from '@shared/store/reducer/feed/selectors'

import {
  fetchRSSFeedFromURL,
  generateHashFromContent,
  saveParsedRSSFeedAsFile
} from '../use-cases/feed'

export const updateFeed = createAsyncThunk<
  unknown,
  unknown,
  {
    state: AppState
    dispatch: ThunkDispatch<unknown, unknown, Action<unknown>>
  }
>('feed/updateFeed', async (_, { dispatch, getState }) => {
  const feedList = getFeedList(getState())

  await Promise.all(
    Object.values(feedList).map(async feed => {
      console.log('updating feed...')
      const { url, latestHash: oldHash, name } = feed
      const rssFeed = await fetchRSSFeedFromURL(url)
      const jsonContent = JSON.stringify(rssFeed)
      const latestHash = generateHashFromContent(jsonContent)
      const lastUpdatedTime = +new Date()

      if (latestHash === oldHash) {
        console.log('nothing to do for feed...', name)
        await dispatch(
          updateFeedContent({
            ...feed,
            lastUpdatedTime
          })
        )
        return
      }

      await saveParsedRSSFeedAsFile(feed, jsonContent, lastUpdatedTime)
      // todo: remove older feeds
      console.log('updated feed...', name, latestHash, oldHash)
      await dispatch(
        updateFeedContent({
          ...feed,
          lastUpdatedTime,
          latestHash
        })
      )
    })
  )
})

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (feed: Feed, { dispatch }) => {
    const rssFeed = await fetchRSSFeedFromURL(feed.url)
    const lastUpdatedTime = +new Date()
    const jsonContent = JSON.stringify(rssFeed)
    const latestHash = generateHashFromContent(jsonContent)
    await saveParsedRSSFeedAsFile(feed, jsonContent, lastUpdatedTime)

    dispatch(
      updateFeedContent({
        ...feed,
        lastUpdatedTime,
        latestHash
      })
    )
  }
)
