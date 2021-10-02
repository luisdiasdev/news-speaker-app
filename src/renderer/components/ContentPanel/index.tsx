import AddFeed from '@components/Content/AddFeed'
import EditFeed from '@components/Content/EditFeed'
import Player from '@components/Content/Player'
import ShowFeed from '@components/Content/ShowFeed'
import { useContent } from '@contexts/ContentContext'
import React from 'react'

import { Container, LeftPanel, RightPanel } from './styles'

type ContentPanelProps = {
  leftPanel: React.ReactNode
}

const ContentPanel: React.FC<ContentPanelProps> = ({ leftPanel }) => {
  const { rightSideContent, args } = useContent()

  const RightPanelContent = () => {
    switch (rightSideContent) {
      case 'AddFeed':
        return <AddFeed />
      case 'EditFeed':
        return <EditFeed {...args} />
      case 'ShowFeed':
        return <ShowFeed {...args} />
      case 'Player':
      default:
        // Player
        return <Player />
    }
  }

  return (
    <Container>
      <LeftPanel isOpen={true} panelWidth='300px'>
        {leftPanel}
      </LeftPanel>
      <RightPanel isOpen={true} panelWidth='300px'>
        <RightPanelContent />
      </RightPanel>
    </Container>
  )
}

export default ContentPanel
