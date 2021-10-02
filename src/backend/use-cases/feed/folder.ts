import constants from '@shared/constants'
import { app } from 'electron'
import path from 'path'

export const getRSSFeedFolderName = (id: string) =>
  path.join(
    app.getPath('userData'),
    constants.PATHS.FEED_DOWNLOAD_FOLDER_PREFIX,
    id
  )

export const getFeedImageAbsoluteFilePath = (
  id: string,
  imageFileName: string
) =>
  path.resolve(
    path.join(
      getRSSFeedFolderName(id),
      constants.PATHS.FEED_IMAGE_FOLDER,
      imageFileName
    )
  )
