import { IconButton } from '@chakra-ui/button'
import React from 'react'
import { BiX } from 'react-icons/bi'

import { Container, TitleContainer } from './styles'

const TitleBar: React.FC = ({ children }) => {
  return (
    <Container>
      <TitleContainer>{children}</TitleContainer>
      <IconButton
        css={`
          -webkit-app-region: no-drag;
        `}
        variant='ghost'
        fontSize='20px'
        aria-label='close application'
        icon={<BiX />}
      />
    </Container>
  )
}

export default TitleBar
