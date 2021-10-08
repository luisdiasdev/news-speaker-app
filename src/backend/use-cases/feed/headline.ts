import { FeedHeadline } from '@shared/domain/feed'
import { differenceInDays } from 'date-fns'
import Parser from 'rss-parser'

type ContentType = {
  [key: string]: any
} & Parser.Output<{
  [key: string]: any
}>

const HEADLINE_FETCH_PERIOD_IN_DAYS = 7

export const getHeadlines = (
  content: ContentType,
  fetchPeriod: number = HEADLINE_FETCH_PERIOD_IN_DAYS
): FeedHeadline[] => {
  const now = new Date()
  return content.items
    .map(item => ({
      title: item.title,
      date: item.isoDate,
      author: item.creator,
      contentSnippet: item.contentSnippet,
      isRead: false,
      link: item.link
    }))
    .filter(
      headline => differenceInDays(now, new Date(headline.date)) <= fetchPeriod
    )
}
