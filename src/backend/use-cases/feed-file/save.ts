import { writeFile } from 'fs/promises'

import { fileManager } from '../../utils/fileManager'

export const saveFeedFile = async (
  id: string,
  content: string,
  lastUpdatedTime: number
) => {
  if (!content) {
    throw new Error('"content" must be valid')
  }

  try {
    await fileManager.ensureDirectory(fileManager.tmpDownloadFolder(id))
    await writeFile(
      fileManager.tmpDownloadFolder(id, `${lastUpdatedTime}.json`),
      content
    )
  } catch (error) {
    console.error('failed to save file: ', error)
  }
}
