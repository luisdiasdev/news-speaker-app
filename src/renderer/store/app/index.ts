import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  value: string
}

const initialState = { value: 'main' } as AppState

const appSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload
    }
  }
})

export const { setValue } = appSlice.actions
export const { reducer: appReducer } = appSlice
