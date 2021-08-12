import { Container } from '@chakra-ui/layout'
import React from 'react'

import { ContentContainer } from '../ContentContainer'
import Controls from './Controls'

const Player: React.FC = () => {
  return (
    <ContentContainer>
      <Container>
        Player
        <Controls />
      </Container>
    </ContentContainer>
  )
}

export default Player
