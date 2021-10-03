import { shell } from 'electron'

/**
 * This approach aims to reduce the dangers of openExternal RCE
 * Reference: https://benjamin-altpeter.de/shell-openexternal-dangers/
 */
const allowedProtocols = ['https', 'http']

const isProtocolAllowed = (url: string) => {
  const { protocol } = new URL(url)

  return allowedProtocols.includes(protocol)
}
export const openInBrowser = (url: string) => {
  if (!isProtocolAllowed) {
    console.warn('Trying to open URL with unsupported protocol: ', url)
    return
  }
  shell.openExternal(url)
}
