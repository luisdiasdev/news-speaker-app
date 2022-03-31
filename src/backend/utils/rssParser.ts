import RSSParser from 'rss-parser'

import { Awaited } from './awaited'

export const parseFeedFromURL = async (url: string) => {
  const parser = new RSSParser({})
  let feedResult
  try {
    feedResult = await parser.parseURL(url)
  } catch (error) {
    console.error('Error while parsing RSS Feed:', error)
  }
  return feedResult
}

export type ParsedRSSFeed = Awaited<ReturnType<typeof parseFeedFromURL>>
