import { configureStore, Reducer } from '@reduxjs/toolkit'

export const configure = (rootReducer: Reducer) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: {
      name: 'app'
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat()
  })
  return store
}
