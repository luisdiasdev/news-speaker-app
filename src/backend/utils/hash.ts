import { createHash } from 'crypto'

export const generateHashFromContent = (content: string): string => {
  const hash = createHash('sha256')
  hash.update(content)
  return hash.digest('hex')
}
