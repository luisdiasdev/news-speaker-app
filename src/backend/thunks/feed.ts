import { Action, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit'
import { Feed } from '@shared/domain/feed'
import { AppState } from '@shared/store'
import {
  getFeedById,
  getFeedList,
  updateFeed
} from '@shared/store/reducer/feed'
import { differenceInDays } from 'date-fns'

import {
  deleteFeedByLastUpdatedTime,
  deleteFeedFolder,
  downloadFeedImage,
  fetchRSSFeedFromURL,
  getFeedMetadata,
  getHeadlines,
  saveParsedRSSFeedAsFile
} from '../use-cases/feed'
import { generateHashFromContent } from '../utils/hash'

export const refreshFeed = createAsyncThunk<
  unknown,
  unknown,
  {
    state: AppState
    dispatch: ThunkDispatch<unknown, unknown, Action<unknown>>
  }
>('feed/refreshFeed', async (payload: void, { dispatch, getState }) => {
  const feedList = getFeedList(getState())

  const now = new Date()
  const shouldUpdate = (feed: Feed) =>
    // TODO: Make the interval configurable
    differenceInDays(now, new Date(feed.lastUpdatedTime)) >= 1 || feed.updating

  await Promise.all(
    Object.values(feedList)
      .filter(shouldUpdate)
      .map(async feed => {
        console.log('\nupdating feed...', feed.id)
        await dispatch(
          updateFeed({
            ...feed,
            updating: true
          })
        )
        const {
          url,
          latestHash: oldHash,
          lastUpdatedTime: oldUpdatedTime,
          metadata: oldMetadata,
          name
        } = feed
        const rssFeed = await fetchRSSFeedFromURL(url)
        const jsonContent = JSON.stringify(rssFeed)
        const latestHash = generateHashFromContent(jsonContent)
        const lastUpdatedTime = +new Date()

        if (latestHash === oldHash) {
          console.log('\nnothing to do for feed...', name)
          await dispatch(
            updateFeed({
              ...feed,
              lastUpdatedTime,
              updating: false
            })
          )
          return
        }
        console.log('\ntrying to update feed...', feed.id)

        const metadata = getFeedMetadata(rssFeed)
        if (metadata.imageUrl && oldMetadata.imageUrl !== metadata.imageUrl) {
          try {
            const { internalImageURL } = await downloadFeedImage(
              feed.id,
              metadata.imageUrl
            )
            metadata.internalImageUrl = internalImageURL
          } catch (err) {
            console.log('\nerror downloading feed image: ', feed.id, err)
          }
        }
        try {
          await deleteFeedByLastUpdatedTime(feed.id, oldUpdatedTime)
          await saveParsedRSSFeedAsFile(feed, jsonContent, lastUpdatedTime)
          console.log('\nupdated feed...', feed.id, name, latestHash, oldHash)
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
        } catch (err) {
          console.log('\nerror while trying to update feed: ', feed.id, err)
        }
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

export const deleteFeedFiles = createAsyncThunk(
  'feed/deleteFeedFiles',
  async (id: string) => {
    await deleteFeedFolder(id)
  }
)

export const nextHeadlinePage = createAsyncThunk<
  unknown,
  unknown,
  {
    state: AppState
    dispatch: ThunkDispatch<unknown, unknown, Action<unknown>>
  }
>('feed/nextHeadlinePage', async (id: string, { dispatch, getState }) => {
  console.log('next headline...', id)
  const feed = getFeedById(id)(getState())
  // Read parsed rss file from disk
  // Parse JSON
  // Fetch next page, if available
  // Update feed
  await dispatch(
    updateFeed({
      ...feed,
      headlines: {
        ...feed.headlines,
        currentPage: feed.headlines.currentPage + 1
      }
    })
  )
})
