import { contextBridge } from 'electron'

import { preloadContextBindings } from '../shared/store/ipc/renderer/preloadBindings'

contextBridge.exposeInMainWorld('_api', {
  env: process.env.NODE_ENV
})

preloadContextBindings()
