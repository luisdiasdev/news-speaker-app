import Parser from 'rss-parser'

export interface FeedHeadline {
  title: string
  author: string
  date: Date
  contentSnippet: string
}
export interface Feed {
  id: string
  name: string
  url: string
  headlines?: FeedHeadline[]
  lastUpdatedTime?: number
  latestHash?: string
}
