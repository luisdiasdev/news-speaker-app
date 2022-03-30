import { configureStore as configureReduxToolkitStore } from '@reduxjs/toolkit'
import { rootReducer } from '@shared/store/rootReducer'
import { useDispatch } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from '../sagas'

export function configureStore(appName: string) {
  const sagaMiddleware = createSagaMiddleware()
  const enhancers = [
    __store
      ? __store.rendererStoreEnhancer()
      : window.__store
      ? window.__store.rendererStoreEnhancer()
      : null
  ]
  const store = configureReduxToolkitStore({
    reducer: rootReducer,
    devTools: {
      name: appName
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(sagaMiddleware),
    enhancers: enhancers
  })

  sagaMiddleware.run(rootSaga)

  return store
}

export type StoreType = ReturnType<typeof configureStore>

export type AppDispatchRenderer = StoreType['dispatch']
export const useAppDispatchRenderer = () => useDispatch<AppDispatchRenderer>()
