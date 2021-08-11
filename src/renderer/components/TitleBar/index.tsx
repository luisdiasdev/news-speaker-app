import React from 'react'

import { CloseButton, Container, TitleContainer } from './styles'

const TitleBar: React.FC = ({ children }) => {
  return (
    <Container>
      <TitleContainer>{children}</TitleContainer>
      <CloseButton>X</CloseButton>
    </Container>
  )
}

export default TitleBar
