import { constants as fsConstants } from 'fs'
import { access, rm, rmdir, stat } from 'fs/promises'
import path from 'path'

import { getRSSFeedFolderName } from './folder'

const verifyAccess = async (folder: string) => {
  try {
    await access(folder, fsConstants.R_OK | fsConstants.W_OK)
  } catch (err) {
    console.error(err)
    throw new Error(
      'Could not access feed folder due to access permissions. ' + folder
    )
  }
}

const verifyDirectoryExists = async (folder: string) => {
  const stats = await stat(folder)
  if (!stats.isDirectory()) {
    throw new Error(`Could not delete feed cause it is not a folder: ${folder}`)
  }
}

const verifyFileAccess = async (file: string) => {
  const stats = await stat(file)
  if (!stats.isFile()) {
    throw new Error(`Could not check access to file: ${file}`)
  }
  try {
    await access(file, fsConstants.R_OK | fsConstants.W_OK)
  } catch (err) {
    console.error(err)
    throw new Error(`Could not verify write access to file: ${file}`)
  }
}

export const deleteFeedByLastUpdatedTime = async (
  id: string,
  lastUpdatedTime: number
) => {
  const feedFolder = getRSSFeedFolderName(id)
  await verifyAccess(feedFolder)
  await verifyDirectoryExists(feedFolder)
  const filePath = path.join(feedFolder, `${lastUpdatedTime}.json`)
  await verifyFileAccess(filePath)
  return rm(filePath, { force: true })
}

export const deleteFeedFolder = async (id: string) => {
  const feedFolder = getRSSFeedFolderName(id)
  await verifyAccess(feedFolder)
  await verifyDirectoryExists(feedFolder)
  return rmdir(feedFolder, {
    recursive: true
  })
}
