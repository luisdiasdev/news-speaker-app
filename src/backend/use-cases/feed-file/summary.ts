import { FeedFileSummary } from '@shared/domain/feedFile'

import { ParsedRSSFeed } from '../../utils/rssParser'

export const getFeedFileSummary = (
  feedContent: ParsedRSSFeed
): FeedFileSummary => ({
  title: feedContent.title,
  description: feedContent.description,
  link: feedContent.link,
  language: feedContent['language'] || 'unknown'
})
