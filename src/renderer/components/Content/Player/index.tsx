import { Box, Center, Container, Heading, HStack } from '@chakra-ui/layout'
import { PlayerContextProvider } from '@contexts/PlayerContext'
import React from 'react'

import { ContentContainer } from '../ContentContainer'
import Controls from './Controls'
import Headlines from './Headlines'

type PlayerProps = Record<string, unknown>

const Player: React.FC<PlayerProps> = ({ id }) => {
  const selecteId = id as string
  return (
    <ContentContainer>
      <Container maxW='container.lg'>
        <Center>
          <HStack boxSize='10'>
            <Heading as='h2' size='md'>
              Player
            </Heading>
          </HStack>
        </Center>
        <Box mt='4'>
          <Center>
            <PlayerContextProvider id={selecteId}>
              <Controls />
            </PlayerContextProvider>
          </Center>
          <Headlines id={selecteId} />
        </Box>
      </Container>
    </ContentContainer>
  )
}

export default Player
