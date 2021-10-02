import { Action, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit'
import { Feed } from '@shared/domain/feed'
import { AppState } from '@shared/store'
import { getFeedList, updateFeed } from '@shared/store/reducer/feed'

import {
  downloadFeedImage,
  fetchRSSFeedFromURL,
  generateHashFromContent,
  getFeedMetadata,
  getHeadlines,
  saveParsedRSSFeedAsFile
} from '../use-cases/feed'

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
      await dispatch(
        updateFeed({
          ...feed,
          updating: true
        })
      )
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
            lastUpdatedTime,
            updating: false
          })
        )
        return
      }

      const metadata = getFeedMetadata(rssFeed)
      if (metadata.imageUrl) {
        const { internalImageURL } = await downloadFeedImage(
          feed.id,
          metadata.imageUrl
        )
        metadata.internalImageUrl = internalImageURL
      }
      await saveParsedRSSFeedAsFile(feed, jsonContent, lastUpdatedTime)
      // todo: remove older feeds
      console.log('updated feed...', name, latestHash, oldHash)
      await dispatch(
        updateFeed({
          ...feed,
          lastUpdatedTime,
          latestHash,
          headlines: getHeadlines(rssFeed),
          metadata,
          updating: false
        })
      )
    })
  )
})

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (feed: Feed, { dispatch }) => {
    await dispatch(
      updateFeed({
        ...feed,
        downloading: true
      })
    )
    const rssFeed = await fetchRSSFeedFromURL(feed.url)
    const metadata = getFeedMetadata(rssFeed)
    if (metadata.imageUrl) {
      const { internalImageURL } = await downloadFeedImage(
        feed.id,
        metadata.imageUrl
      )
      metadata.internalImageUrl = internalImageURL
    }
    const lastUpdatedTime = +new Date()
    const jsonContent = JSON.stringify(rssFeed)
    const latestHash = generateHashFromContent(jsonContent)
    await saveParsedRSSFeedAsFile(feed, jsonContent, lastUpdatedTime)

    await dispatch(
      updateFeed({
        ...feed,
        lastUpdatedTime,
        latestHash,
        headlines: getHeadlines(rssFeed),
        metadata,
        downloading: false
      })
    )
  }
)
