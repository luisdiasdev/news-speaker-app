import constants from '@shared/constants'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { ensureDirectory } from '../../helpers/ensure-directory'
import { fileDownload } from '../../http'
import { getRSSFeedFolderName } from './folder'

const getExtensionFromURL = (url: string) => {
  const requestURL = new URL(url)
  const requestPath = path.normalize(requestURL.pathname)
  const filename = path.basename(requestPath)
  return path.extname(filename || '').toLowerCase()
}

const buildInternalImageURL = (
  id: string,
  imageUuid: string,
  fileExtension: string
) => `images/feed/${id}/${imageUuid}${fileExtension}`

export const downloadFeedImage = async (id: string, url?: string) => {
  if (!url) {
    throw new Error(`trying to download invalid feed image: ${url}`)
  }
  const feedImageFolder = path.join(
    getRSSFeedFolderName(id),
    constants.PATHS.FEED_IMAGE_FOLDER
  )
  const fileExtension = getExtensionFromURL(url)
  await ensureDirectory(feedImageFolder)
  const imageUuid = uuidv4()
  const outputFilePath = path.join(
    feedImageFolder,
    `${imageUuid}${fileExtension}`
  )
  console.log(
    'downloading feed image url from: ',
    url,
    ' into: ',
    outputFilePath
  )
  // TODO: Handle download failure
  const { contentType } = await fileDownload(url, outputFilePath)
  return {
    imageUuid,
    contentType,
    fileExtension,
    internalImageURL: buildInternalImageURL(id, imageUuid, fileExtension)
  }
}
