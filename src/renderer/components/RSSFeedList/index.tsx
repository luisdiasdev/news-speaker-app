import { IconButton } from '@chakra-ui/button'
import { Flex, HStack } from '@chakra-ui/layout'
import React from 'react'
import { BiPlus } from 'react-icons/bi'

import { FeedList } from './FeedList'
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
      <FeedList />
    </Container>
  )
}

export default RSSFeedList
