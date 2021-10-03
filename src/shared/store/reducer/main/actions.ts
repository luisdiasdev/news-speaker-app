import { createAction } from '@reduxjs/toolkit'

export const openExternalLinkAction = createAction<string>(
  'main/openExternalLink'
)

export const closeWindowAction = createAction('main/closeWindow')
