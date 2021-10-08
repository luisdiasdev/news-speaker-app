import {
  Center,
  Container,
  Heading,
  HStack,
  Stack,
  Text
} from '@chakra-ui/layout'
import React from 'react'

import { ContentContainer } from '../ContentContainer'

// import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <ContentContainer>
      <Container maxW='container.lg'>
        <Center>
          <Heading as='h2' size='md'>
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
