import React from 'react'

import { Container, LeftPanel, RightPanel } from './styles'

type ContentPanelProps = {
  leftPanel: React.ReactNode
  rightPanel: React.ReactNode
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  leftPanel,
  rightPanel
}) => {
  return (
    <Container>
      <LeftPanel isOpen={true} panelWidth='300px'>
        {leftPanel}
      </LeftPanel>
      <RightPanel isOpen={true} panelWidth='300px'>
        {rightPanel}
      </RightPanel>
    </Container>
  )
}

export default ContentPanel
