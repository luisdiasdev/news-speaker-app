import { Center, HStack } from '@chakra-ui/layout'
import React from 'react'
import { FaRssSquare } from 'react-icons/fa'

import { Container } from './styles'

const RSSFeedList: React.FC = () => {
  return (
    <Container>
      <HStack>
        <Center>
          <FaRssSquare />
        </Center>
        <p>RSS Feed List</p>
      </HStack>
    </Container>
  )
}

export default RSSFeedList
