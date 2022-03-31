import { ErrorObject } from 'serialize-error'

export enum FeedFileType {
  RSS,
  OPML
}
type FeedFileTypeStrings = keyof typeof FeedFileType

export enum FeedFileState {
  CREATED,
  PARSE_PENDING,
  PARSE_FINISHED,
  PARSE_FAILED,
  IMPORTED
}

export type FeedFileStateStrings = keyof typeof FeedFileState

export interface FeedFileSummary {
  title: string
  description: string
  language: string
  link?: string
  localImageUrl?: string
}

export interface FeedFile {
  localId: string
  type: FeedFileTypeStrings
  url: string
  state: FeedFileStateStrings
  stateTimestamp: number // timestamp of last state change
  localFeedId?: string // relationship to the parsed feed
  contentHash?: string
  summary?: FeedFileSummary
  error?: ErrorObject
}
