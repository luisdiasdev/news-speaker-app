import React from 'react'
import { Container, CloseButton, TitleContainer } from './styles'

const TitleBar: React.FC = ({ children }) => {
  return (
    <Container>
      <TitleContainer>{children}</TitleContainer>
      <CloseButton>X</CloseButton>
    </Container>
  )
}

export default TitleBar
