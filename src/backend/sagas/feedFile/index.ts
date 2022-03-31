import { addFeedFile } from '@shared/store/reducer/feedFile'
import { takeEvery } from 'redux-saga/effects'

import { parseFeedFile } from './parseFeedFileSaga'

export const feedFileSagas = [takeEvery(addFeedFile.type, parseFeedFile)]
