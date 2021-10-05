import { constants as fsConstants } from 'fs'
import { access, rmdir, stat } from 'fs/promises'

import { getRSSFeedFolderName } from './folder'

export const deleteFeedFolder = async (id: string) => {
  const feedFolder = getRSSFeedFolderName(id)
  try {
    await access(feedFolder, fsConstants.R_OK | fsConstants.W_OK)
  } catch (err) {
    console.error(err)
    throw new Error('Could not delete feed folder due to access permissions.')
  }
  const stats = await stat(feedFolder)
  if (!stats.isDirectory()) {
    throw new Error(
      `Could not delete feed cause it is not a folder: ${feedFolder}`
    )
  }
  return rmdir(feedFolder, {
    recursive: true
  })
}
