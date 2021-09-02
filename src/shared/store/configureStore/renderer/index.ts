import {
  configureStore as configureReduxToolkitStore,
  StoreEnhancer
} from '@reduxjs/toolkit'

import { rootReducer } from '../../rootReducer'

export function configureStoreRenderer(
  appName: string,
  enhancers?: StoreEnhancer[]
) {
  const store = configureReduxToolkitStore({
    reducer: rootReducer,
    devTools: {
      name: appName
    },
    enhancers: enhancers ? enhancers : []
  })
  return store
}

export type StoreType = ReturnType<typeof configureStoreRenderer>

export type AppDispatchRenderer = StoreType['dispatch']
