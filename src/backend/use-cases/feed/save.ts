import { Feed } from '@shared/domain/feed'
import { writeFile } from 'fs/promises'
import path from 'path'

import { ensureDirectory } from '../../helpers/ensure-directory'
import { getRSSFeedFolderName } from './folder'

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
