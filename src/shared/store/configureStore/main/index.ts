import {
  configureStore as configureReduxToolkitStore,
  StoreEnhancer
} from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'

import { rootReducer } from '../../rootReducer'
import { persistRootReducer } from './persistence'

export function configureStoreMain(
  appName: string,
  enhancers?: StoreEnhancer[]
) {
  const store = configureReduxToolkitStore({
    reducer: persistRootReducer(appName, rootReducer),
    devTools: {
      name: appName
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }),
    enhancers: enhancers ? enhancers : []
  })

  const persistor = persistStore(store)

  persistor.persist()

  return store
}

type StoreType = ReturnType<typeof configureStoreMain>

export type AppDispatchMain = StoreType['dispatch']
