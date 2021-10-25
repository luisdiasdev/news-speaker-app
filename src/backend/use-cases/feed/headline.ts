import { FeedHeadlinesPage } from '@shared/domain/feed'
import Parser from 'rss-parser'

type ContentType = {
  [key: string]: any
} & Parser.Output<{
  [key: string]: any
}>

type ContentItem = {
  [key: string]: any
} & Parser.Item

const HEADLINE_PAGE_SIZE = 10

const headlineItemMapper = (item: ContentItem) => ({
  title: item.title,
  date: item.isoDate,
  author: item.creator,
  contentSnippet: item.contentSnippet,
  isRead: false,
  link: item.link
})

// Skip sorting for now, assume will be in correct order
// const headlineItemSorter = (a: ContentItem, b: ContentItem) => {
//   const dateA = new Date(a.isoDate).getTime()
//   const dateB = new Date(b.isoDate).getTime()
//   return dateA - dateB
// }

// export const sortHealineItems = (items: ContentItem[]) =>
//   items.concat().sort(headlineItemSorter)

const pageHeadlines = (
  items: ContentItem[],
  page: number,
  itemsPerPage: number = HEADLINE_PAGE_SIZE
) => {
  return items
    .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
    .map(headlineItemMapper)
}

export const getHeadlines = (
  content: ContentType,
  currentPage = 0,
  itemsPerPage: number = HEADLINE_PAGE_SIZE
): FeedHeadlinesPage => {
  const totalItems = content.items.length
  const remaining = totalItems % itemsPerPage
  const totalPages = Math.trunc(totalItems / itemsPerPage) + (remaining ? 1 : 0)

  return {
    items: pageHeadlines(content.items, currentPage, itemsPerPage),
    totalItems,
    itemsPerPage,
    totalPages,
    currentPage
  }
}
