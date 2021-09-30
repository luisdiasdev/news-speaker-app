import { FeedHeadline } from '@shared/domain/feed'
import Parser from 'rss-parser'

type ContentType = {
  [key: string]: any
} & Parser.Output<{
  [key: string]: any
}>

export const getHeadlines = (content: ContentType): FeedHeadline[] => {
  return content.items.map(item => ({
    title: item.title,
    date: new Date(item.isoDate),
    author: item.creator,
    contentSnippet: item.contentSnippet
  }))
}
