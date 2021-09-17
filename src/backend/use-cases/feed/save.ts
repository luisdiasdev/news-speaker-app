import constants from '@shared/constants'
import { Feed } from '@shared/domain/feed'
import { app } from 'electron'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

const ensureDirectory = (filePath: string) =>
  mkdir(path.join(filePath), { recursive: true })

const getRSSFeedFolderName = (id: string) =>
  path.join(
    app.getPath('userData'),
    constants.PATHS.FEED_DOWNLOAD_FOLDER_PREFIX,
    id
  )

export const saveParsedRSSFeedAsFile = async (
  feed: Feed,
  content: string,
  lastUpdatedTime: number
) => {
  if (!content) {
    throw new Error('"content" must be valid')
  }
  const outputFileFolder = getRSSFeedFolderName(feed.id)
  const outputFilePath = path.join(outputFileFolder, `${lastUpdatedTime}.json`)
  try {
    await ensureDirectory(outputFileFolder)
    await writeFile(outputFilePath, content)
  } catch (error) {
    console.error('failed to save file: ', error)
  }
}
