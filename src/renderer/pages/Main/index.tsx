import React from 'react'

import AddFeed from '../../components/Content/AddFeed'
import ContentPanel from '../../components/ContentPanel'
import RSSFeedList from '../../components/RSSFeedList'

const Main: React.FC = () => {
  return <ContentPanel leftPanel={<RSSFeedList />} rightPanel={<AddFeed />} />
}

export default Main
