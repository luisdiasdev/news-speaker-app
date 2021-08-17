import { configureStore, Reducer } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'

import { createStorage } from './persistence'

export const configure = (rootReducer: Reducer) => {
  const appName = 'news-speaker'
  const persistConfig = {
    key: appName,
    storage: createStorage(appName),
    version: 1
  }

  const reducer = persistReducer(persistConfig, rootReducer)
  const store = configureStore({
    reducer,
    devTools: {
      name: appName
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  })

  return store
}
