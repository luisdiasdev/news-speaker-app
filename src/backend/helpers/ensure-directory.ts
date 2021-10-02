import { mkdir } from 'fs/promises'
import path from 'path'

export const ensureDirectory = (filePath: string) =>
  mkdir(path.join(filePath), { recursive: true })
