import path from 'path'

export const getExtensionFromURL = (url: string) => {
  const requestURL = new URL(url)
  const requestPath = path.normalize(requestURL.pathname)
  const filename = path.basename(requestPath)
  return path.extname(filename || '').toLowerCase()
}
