import { fileManager } from './fileManager'

type InternalImageTypes = 'temp'
export const buildInternalImageURL = (
  id: string,
  type: InternalImageTypes,
  imageUuid: string,
  fileExtension: string
) => `images/${type}/${id}/${imageUuid}${fileExtension}`

export const getAbsoluteImageFilePath = (internalUrl: string) => {
  const parts = internalUrl.split('/')
  const type = parts[1]
  const resouceId = parts[2]
  const imageFileName = parts[3]
  if (type === 'temp') {
    return fileManager.absoluteFilePath(
      fileManager.nestedTmpDownloadFolder(resouceId, 'images'),
      imageFileName
    )
  }
  throw new Error('File type not supported')
}
