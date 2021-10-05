import { IconButton } from '@chakra-ui/button'
import { Flex, HStack } from '@chakra-ui/layout'
import { useContent } from '@contexts/ContentContext'
import React from 'react'
import { BiHome, BiPlus } from 'react-icons/bi'

import { FeedList } from './FeedList'
import { Container } from './styles'

const RSSFeedList: React.FC = () => {
  const { setAddFeed, home, isHome } = useContent()
  return (
    <Container>
      <Flex justifyContent='flex-end' alignItems='center'>
        {!isHome && (
          <IconButton
            variant='ghost'
            aria-label='go home'
            icon={<BiHome />}
            onClick={home}
          />
        )}
        <IconButton
          variant='ghost'
          icon={<BiPlus />}
          aria-label='add rss feed'
          onClick={setAddFeed}
        />
      </Flex>
      <HStack justify='space-between' mb='4'></HStack>
      <FeedList />
    </Container>
  )
}

export default RSSFeedList
