import RSSParser from 'rss-parser'

export const fetchRSSFeedFromURL = async (url: string) => {
  const parser = new RSSParser({})
  let feedResult
  try {
    feedResult = await parser.parseURL(url)
  } catch (error) {
    console.error('Error while parsing RSS Feed:', error)
  }
  return feedResult
}
