import { createAction } from '@reduxjs/toolkit'

export const fetchNextHeadlinePage = createAction<string>(
  'feed/fetchNextHeadlinePage'
)
