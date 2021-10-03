import { BrowserWindow } from 'electron'

export const closeWindow = (window: BrowserWindow) =>
  window && window.isClosable && window.close()
