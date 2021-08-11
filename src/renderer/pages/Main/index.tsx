import React from 'react'

import ContentPanel from '../../components/ContentPanel'
import Player from '../../components/Player'
import { RootContainer } from '../../components/RootContainer'
import RSSFeedList from '../../components/RSSFeedList'
import TitleBar from '../../components/TitleBar'

const Main: React.FC = () => {
  return (
    <RootContainer>
      <TitleBar>
        <a href='#'>News Speaker</a>
      </TitleBar>
      <ContentPanel leftPanel={<RSSFeedList />} rightPanel={<Player />} />
    </RootContainer>
  )
}

export default Main
