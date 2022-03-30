import { Reducer } from '@reduxjs/toolkit'
import ElectronStore from 'electron-store'
import { persistReducer } from 'redux-persist'
import createElectronStorage from 'redux-persist-electron-storage'

const createStorage = (name: string) => {
  const electronStore = new ElectronStore({
    name
  })

  return createElectronStorage({ electronStore })
}

export const persistRootReducer = (appName: string, rootReducer: Reducer) => {
  const persistConfig = {
    key: appName,
    storage: createStorage(appName),
    version: 1,
    // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeout: null
  }
  return persistReducer(persistConfig, rootReducer)
}
