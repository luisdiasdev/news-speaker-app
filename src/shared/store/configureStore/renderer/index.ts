import { configureStore as configureReduxToolkitStore } from '@reduxjs/toolkit'

import { rootReducer } from '../../rootReducer'

export function configureStoreRenderer(appName: string) {
  const store = configureReduxToolkitStore({
    reducer: rootReducer,
    devTools: {
      name: appName
    }
  })
  return store
}

type StoreType = ReturnType<typeof configureStoreRenderer>

export type AppDispatchRenderer = StoreType['dispatch']
