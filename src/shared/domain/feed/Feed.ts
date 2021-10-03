export interface FeedMetadata {
  title?: string
  description?: string
  imageUrl?: string
  imageTitle?: string
  internalImageUrl?: string
  link?: string
}

export interface FeedHeadline {
  title: string
  author: string
  date: string
  contentSnippet: string
}

export interface Feed {
  id: string
  name: string
  url: string
  downloading?: boolean
  downloadError?: boolean
  updating?: boolean
  updateError?: boolean
  headlines?: FeedHeadline[]
  lastUpdatedTime?: number
  latestHash?: string
  metadata?: FeedMetadata
}
