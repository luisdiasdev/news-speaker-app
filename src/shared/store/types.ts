import { rootReducer } from './rootReducer'

export type RootReducerType = typeof rootReducer

export type AppState = ReturnType<RootReducerType>
