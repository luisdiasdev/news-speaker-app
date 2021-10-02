import { getFeedImageAbsoluteFilePath } from './use-cases/feed'

const scheme = 'appfiles'

const fileProtocolHandler = (
  request: Electron.ProtocolRequest,
  callback: (response: string | Electron.ProtocolResponse) => void
) => {
  const schemePrefix = `${scheme}://`
  const url = request.url.substr(schemePrefix.length)
  // appfiles://images/feed/${feedId}/${imageId}
  console.log('fileProtocolHandler ...', url)
  if (url.startsWith('images/')) {
    console.log('[2] fileProtocolHandler ...')
    //
    const urlParts = url.split('/')
    // const content = urlParts[1] -> Maybe use if have more types of files
    const contentId = urlParts[2]
    const imageFileName = urlParts[3]
    console.log(
      'resolved file: ',
      imageFileName,
      getFeedImageAbsoluteFilePath(contentId, imageFileName)
    )
    callback({ path: getFeedImageAbsoluteFilePath(contentId, imageFileName) })
  } else {
    console.error('unsupported file type: ', url)
  }
}

export default { fileProtocolHandler, scheme }
