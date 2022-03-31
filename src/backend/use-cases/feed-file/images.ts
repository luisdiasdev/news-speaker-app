import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { fileDownload } from '../../http'
import { getExtensionFromURL } from '../../utils/fileExtension'
import { fileManager } from '../../utils/fileManager'
import { buildInternalImageURL } from '../../utils/internalFileProtocol'

export const downloadFeedImage = async (id: string, url?: string) => {
  if (!url) {
    console.warn('feed does not have valid image url: ', { id, url })
    return
  }
  const imageFolder = fileManager.nestedTmpDownloadFolder(id, 'images')
  await fileManager.ensureDirectory(imageFolder)
  const fileExtension = getExtensionFromURL(url)
  const imageUuid = uuidv4()
  const outputFilePath = path.join(imageFolder, `${imageUuid}${fileExtension}`)

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
    internalImageURL: buildInternalImageURL(
      id,
      'temp',
      imageUuid,
      fileExtension
    )
  }
}
