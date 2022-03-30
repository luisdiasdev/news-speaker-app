export enum RSSFileState {
  CREATED,
  DOWNLOAD_PENDING,
  DOWNLOAD_IN_PROGRESS,
  DOWNLOAD_FINISHED,
  PARSE_PENDING,
  PARSE_IN_PROGRESS,
  PARSE_FINISHED
}

export type RSSFileStateStrings = keyof typeof RSSFileState

export interface RSSFile {
  localId: string
  url: string
  state: RSSFileStateStrings
  stateTimestamp: number // timestamp of last state change
  localFeedId?: string // relationship to the parsed feed
}
