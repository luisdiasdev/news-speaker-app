import React from 'react'
import RSSFeedList from '../../components/RSSFeedList'
import { RootContainer } from '../../components/RootContainer'
import TitleBar from '../../components/TitleBar'
import ContentPanel from '../../components/ContentPanel'

const Main: React.FC = () => {
  return (
    <RootContainer>
      <TitleBar>
        <a href='#'>News Speaker</a>
      </TitleBar>
      <ContentPanel leftPanel={<RSSFeedList />} rightPanel={<RSSFeedList />} />
    </RootContainer>
  )
}

export default Main
