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
  isRead: boolean
  link?: string
}

export interface FeedHeadlinesPage {
  items: FeedHeadline[]
  totalPages: number
  currentPage: number
  totalItems: number
  itemsPerPage: number
}

export interface Feed {
  id: string
  name: string
  url: string
  downloading?: boolean
  downloadError?: boolean
  updating?: boolean
  updateError?: boolean
  headlines?: FeedHeadlinesPage
  lastUpdatedTime?: number
  latestHash?: string
  metadata?: FeedMetadata
}
