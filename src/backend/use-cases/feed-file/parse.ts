import { FeedFileSummary } from '@shared/domain/feedFile'

import { generateHashFromContent } from '../../utils/hash'
import { ParsedRSSFeed, parseFeedFromURL } from '../../utils/rssParser'
import { downloadFeedImage } from './images'
import { saveFeedFile } from './save'
import { getFeedFileSummary } from './summary'

export type ParsedFeedFile = {
  latestHash: string
  lastUpdatedTime: number
  feedSummary: FeedFileSummary
}

export const parse = async (id: string, url: string) => {
  const feedContent: ParsedRSSFeed = await parseFeedFromURL(url)
  const feedSummary = getFeedFileSummary(feedContent)
  const jsonContent = JSON.stringify(feedContent)
  const lastUpdatedTime = +new Date()
  const latestHash = generateHashFromContent(jsonContent)
  await saveFeedFile(id, jsonContent, lastUpdatedTime)
  const imageUrl = feedContent.image?.url
  if (imageUrl) {
    const { internalImageURL } = await downloadFeedImage(id, imageUrl)
    feedSummary.localImageUrl = internalImageURL
  }

  return {
    latestHash,
    lastUpdatedTime,
    feedSummary
  }
}
