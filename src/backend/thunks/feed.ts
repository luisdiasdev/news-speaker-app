import { Action, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit'
import { Feed } from '@shared/domain/feed'
import { AppState } from '@shared/store'
import { getFeedList, updateFeed } from '@shared/store/reducer/feed'

import {
  fetchRSSFeedFromURL,
  generateHashFromContent,
  saveParsedRSSFeedAsFile
} from '../use-cases/feed'
import { getHeadlines } from '../use-cases/feed/headline'

export const refreshFeed = createAsyncThunk<
  unknown,
  unknown,
  {
    state: AppState
    dispatch: ThunkDispatch<unknown, unknown, Action<unknown>>
  }
>('feed/refreshFeed', async (payload: void, { dispatch, getState }) => {
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
          updateFeed({
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
        updateFeed({
          ...feed,
          lastUpdatedTime,
          latestHash,
          headlines: getHeadlines(rssFeed)
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

    await dispatch(
      updateFeed({
        ...feed,
        lastUpdatedTime,
        latestHash,
        headlines: getHeadlines(rssFeed)
      })
    )
  }
)
