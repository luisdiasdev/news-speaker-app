import { Center, Container, Heading, Text } from '@chakra-ui/layout'
import React from 'react'

import { ContentContainer } from '../ContentContainer'

const Home: React.FC = () => {
  return (
    <ContentContainer>
      <Container maxW='container.lg'>
        <Center mt='8'>
          <Heading as='h2' size='xl'>
            The News Speaker
          </Heading>
        </Center>
        <Text mt='4'>Welcome!</Text>
        <Text>
          To get started try adding a new RSS feed and start listening to the
          latest trends!
        </Text>
      </Container>
    </ContentContainer>
  )
}

export default Home
