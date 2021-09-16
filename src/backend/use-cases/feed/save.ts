import constants from '@shared/constants'
import { Feed } from '@shared/domain/feed'
import { app } from 'electron'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import Parser from 'rss-parser'

const ensureDirectory = () =>
  mkdir(
    path.join(
      app.getPath('userData'),
      constants.PATHS.FEED_DOWNLOAD_FOLDER_PREFIX
    ),
    { recursive: true }
  )

const getRSSFeedFileName = (id: string) =>
  path.join(
    app.getPath('userData'),
    constants.PATHS.FEED_DOWNLOAD_FOLDER_PREFIX,
    `${id}.json`
  )

export const saveParsedRSSFeedAsFile = async (
  feed: Feed,
  content: Parser.Output<any>,
  lastUpdatedTime: number /** TODO: Use the timestamp in the file path */
) => {
  if (!content) {
    throw new Error('"content" must be valid')
  }
  const outputFilePath = getRSSFeedFileName(feed.id)
  try {
    console.error('path:', app.getPath('userData'))
    await ensureDirectory()
    await writeFile(outputFilePath, JSON.stringify(content), {
      mode: ''
    })
  } catch (error) {
    console.error('failed to save file: ', error)
  }
}
