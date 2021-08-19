import { configureStore } from '@reduxjs/toolkit'
import { is } from 'electron-util'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'

import { configureRootReducer } from './rootReducer'
import { Scope } from './types'

export function configure(
  appName: string,
  scope: Scope = is.main ? Scope.MAIN : Scope.RENDERER
) {
  const store = configureStore({
    reducer: configureRootReducer(appName, scope),
    devTools: {
      name: appName
    },
    middleware: getDefaultMiddleware => {
      if (scope === Scope.MAIN) {
        return getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        })
      }
      return getDefaultMiddleware()
    }
  })

  if (scope === Scope.MAIN) {
    const persistor = persistStore(store)

    persistor.persist()
  }

  return store
}

// TODO: Typings of store/dispatch/etc
