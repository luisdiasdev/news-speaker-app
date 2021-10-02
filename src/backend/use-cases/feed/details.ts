import { FeedMetadata } from '@shared/domain/feed'
import RSSParser from 'rss-parser'

export const getFeedMetadata = (
  rssContent: RSSParser.Output<{ [key: string]: unknown }>
): FeedMetadata => ({
  title: rssContent.title,
  description: rssContent.description,
  imageUrl: rssContent.image?.url,
  imageTitle: rssContent.image?.title
})
