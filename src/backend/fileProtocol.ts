import { getAbsoluteImageFilePath } from './utils/internalFileProtocol'

const scheme = 'appfiles'

const fileProtocolHandler = (
  request: Electron.ProtocolRequest,
  callback: (response: string | Electron.ProtocolResponse) => void
) => {
  const schemePrefix = `${scheme}://`
  const url = request.url.substring(schemePrefix.length)
  // appfiles://images/feed/${feedId}/${imageId}
  console.log('fileProtocolHandler ...', url)
  if (url.startsWith('images/')) {
    callback({ path: getAbsoluteImageFilePath(url) })
  } else {
    console.error('unsupported file type: ', url)
  }
}

export default { fileProtocolHandler, scheme }
