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
    version: 1
  }
  return persistReducer(persistConfig, rootReducer)
}
