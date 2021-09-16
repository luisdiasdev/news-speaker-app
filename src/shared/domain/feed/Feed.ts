import Parser from 'rss-parser'

export interface Feed {
  id: string
  name: string
  url: string
  content?: Partial<Parser.Output<any>>
  lastUpdatedTime?: number
}
