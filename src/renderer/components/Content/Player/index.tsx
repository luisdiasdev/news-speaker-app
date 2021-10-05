import { Box, Center, Container, Heading, HStack } from '@chakra-ui/layout'
import React from 'react'

import { ContentContainer } from '../ContentContainer'
import Controls from './Controls'

const Player: React.FC = () => {
  return (
    <ContentContainer>
      <Container>
        <Center>
          <HStack boxSize='10'>
            <Heading as='h2' size='md'>
              Player
            </Heading>
          </HStack>
        </Center>
        <Box mt='4'>
          <Center>
            <Controls />
          </Center>
        </Box>
      </Container>
    </ContentContainer>
  )
}

export default Player
