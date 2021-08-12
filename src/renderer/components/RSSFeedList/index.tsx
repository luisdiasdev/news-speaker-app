import { IconButton } from '@chakra-ui/button'
import { Center, Flex, HStack, List, ListItem } from '@chakra-ui/layout'
import React from 'react'
import { BiPlay, BiPlus } from 'react-icons/bi'
import { FaRssSquare } from 'react-icons/fa'

import { Container } from './styles'

const RSSFeedList: React.FC = () => {
  return (
    <Container>
      <Flex justifyContent='flex-end' alignItems='center'>
        <IconButton
          variant='ghost'
          icon={<BiPlus />}
          aria-label='add rss feed'
        />
      </Flex>
      <HStack justify='space-between'></HStack>
      <List>
        <ListItem>
          <Flex justifyContent='space-between' alignItems='center'>
            <HStack>
              <Center>
                <FaRssSquare />
              </Center>
              <p>Lorem Ipsum</p>
            </HStack>
            <IconButton variant='ghost' aria-label='play' icon={<BiPlay />} />
          </Flex>
        </ListItem>
        <ListItem>
          <Flex justifyContent='space-between' alignItems='center'>
            <HStack>
              <Center>
                <FaRssSquare />
              </Center>
              <p>Lorem Ipsum</p>
            </HStack>
            <IconButton variant='ghost' aria-label='play' icon={<BiPlay />} />
          </Flex>
        </ListItem>
      </List>
    </Container>
  )
}

export default RSSFeedList
