import React from 'react'
import {
  Container,
  CloseButton,
  ContentSection,
  TitleContainer
} from './styles'

const TitleBar: React.FC = ({ children }) => {
  return (
    <Container>
      <ContentSection>
        <TitleContainer>{children}</TitleContainer>
        <CloseButton>X</CloseButton>
      </ContentSection>
    </Container>
  )
}

export default TitleBar
