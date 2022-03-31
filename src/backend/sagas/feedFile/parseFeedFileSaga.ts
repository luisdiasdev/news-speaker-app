import { PayloadAction } from '@reduxjs/toolkit'
import { FeedFile } from '@shared/domain/feedFile'
import { updateFeedFile } from '@shared/store/reducer/feedFile'
import { call, put } from 'redux-saga/effects'
import { serializeError } from 'serialize-error'

import { parse, ParsedFeedFile } from '../../use-cases/feed-file/parse'

export function* parseFeedFile(action: PayloadAction<FeedFile>) {
  const feedFile = action.payload
  yield put(
    updateFeedFile({
      id: feedFile.localId,
      changes: {
        state: 'PARSE_PENDING'
      }
    })
  )
  try {
    const result: ParsedFeedFile = yield call(() =>
      parse(feedFile.localId, feedFile.url)
    )
    yield put(
      updateFeedFile({
        id: feedFile.localId,
        changes: {
          contentHash: result.latestHash,
          stateTimestamp: result.lastUpdatedTime,
          summary: result.feedSummary,
          state: 'PARSE_FINISHED'
        }
      })
    )
  } catch (error) {
    yield put(
      updateFeedFile({
        id: feedFile.localId,
        changes: {
          state: 'PARSE_FAILED',
          stateTimestamp: +new Date(),
          error: serializeError(error)
        }
      })
    )
  }
}
