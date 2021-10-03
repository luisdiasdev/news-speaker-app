import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MainState {
  value: string
}

const initialState = { value: 'main' } as MainState

export const openExternalLinkAction = createAction<string>(
  'main/openExternalLink'
)

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload
    }
  }
})

export const { setValue } = mainSlice.actions
export const { reducer: mainReducer } = mainSlice
