import React from 'react'

import AddFeed from '../../components/Content/AddFeed'
import ContentPanel from '../../components/ContentPanel'
import { RootContainer } from '../../components/RootContainer'
import RSSFeedList from '../../components/RSSFeedList'
import TitleBar from '../../components/TitleBar'

const Main: React.FC = () => {
  return (
    <RootContainer>
      <TitleBar>
        <a href='#/'>News Speaker</a>
      </TitleBar>
      <ContentPanel leftPanel={<RSSFeedList />} rightPanel={<AddFeed />} />
    </RootContainer>
  )
}

export default Main
