import RSSFeedList from '@components/RSSFeedList'
import { ViewContextProvider } from '@context/ViewContext'
import React from 'react'

import { Container, LeftView, RightView } from './styles'
import { CurrentView } from './views'

export const MainView: React.FC = () => {
  return (
    <ViewContextProvider>
      <Container>
        <LeftView isOpen={true} panelWidth='300px'>
          <RSSFeedList />
        </LeftView>
        <RightView isOpen={true} panelWidth='300px'>
          <CurrentView />
        </RightView>
      </Container>
    </ViewContextProvider>
  )
}
