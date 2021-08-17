import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('_api', {
  env: process.env.NODE_ENV
})
