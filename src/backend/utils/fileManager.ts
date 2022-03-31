import constants from '@shared/constants'
import { app } from 'electron'
import { mkdir } from 'fs/promises'
import path from 'path'

type NestedFolderTypes = 'images'

class FileManager {
  getBaseFolderName() {
    return app.getPath('userData')
  }

  tmpDownloadFolder(id: string, ...paths: string[]) {
    return path.join(
      this.getBaseFolderName(),
      constants.PATHS.TEMPORARY_DOWNLOAD_FOLDER,
      id,
      ...paths
    )
  }

  nestedTmpDownloadFolder(id: string, nestedFolderType: NestedFolderTypes) {
    return path.join(this.tmpDownloadFolder(id), nestedFolderType)
  }

  absoluteFilePath(...relativePaths: string[]) {
    return path.resolve(...relativePaths)
  }

  async ensureDirectory(directory: string) {
    return mkdir(path.join(directory), { recursive: true })
  }
}

export const fileManager = new FileManager()
