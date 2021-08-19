import { configureStore, Reducer } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'

import { persistRootReducer } from './persistence'

export const configure = (rootReducer: Reducer) => {
  const appName = 'news-speaker'

  const store = configureStore({
    reducer: persistRootReducer(appName, rootReducer),
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

  const persistor = persistStore(store)

  persistor.persist()

  return { store }
}
