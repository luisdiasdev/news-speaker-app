import { configureStore as configureReduxToolkitStore } from '@reduxjs/toolkit'
import {
  mainStateEnhancer,
  mainStateSyncMiddleware
} from '@shared/ipc/main/stateEnhancer'
import { rootReducer } from '@shared/store/rootReducer'
import { BrowserWindow } from 'electron'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from '../sagas'
import { persistRootReducer } from './persistence'

export function configureStore(appName: string) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [mainStateSyncMiddleware, sagaMiddleware]
  const enhancers = [mainStateEnhancer()]
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
      }).prepend(middlewares),
    enhancers: enhancers
  })

  const persistor = persistStore(store)

  persistor.persist()

  return {
    store,
    runSaga: (mainWindow: BrowserWindow) =>
      sagaMiddleware.run(rootSaga, mainWindow)
  }
}

type StoreType = ReturnType<typeof configureStore>

export type AppDispatchMain = StoreType['store']['dispatch']
