import { preloadContextBindings } from '@shared/store/ipc/renderer/preloadBindings'
import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('_api', {
  env: process.env.NODE_ENV
})

preloadContextBindings()
