import React from 'react'

import AddFeed from '../../components/Content/AddFeed'
import ContentPanel from '../../components/ContentPanel'
import RSSFeedList from '../../components/RSSFeedList'
import ContentContextProvider from '../../contexts/ContentContext'

const Main: React.FC = () => {
  return (
    <ContentContextProvider>
      <ContentPanel leftPanel={<RSSFeedList />} />
    </ContentContextProvider>
  )
}

export default Main
