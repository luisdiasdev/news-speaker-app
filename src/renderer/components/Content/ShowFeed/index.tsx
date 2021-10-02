import { Center, Container, Heading, HStack, Text } from '@chakra-ui/layout'
import { getFeedById } from '@shared/store/reducer/feed'
import { formatRelative } from 'date-fns'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { useSelector } from 'react-redux'

import { ContentContainer } from '../ContentContainer'

type ShowFeedProps = Record<string, unknown>

const ShowFeed: React.FC<ShowFeedProps> = ({ id }) => {
  const feed = useSelector(getFeedById(id as string))

  return (
    <ContentContainer>
      <Container>
        <HStack>
          <Center>
            <BiEdit />
          </Center>
          <Heading as='h2' size='md'>
            {feed && feed.name}
          </Heading>
          <Text fontSize='sm'>
            Updated:
            <span>
              {feed.lastUpdatedTime &&
                formatRelative(
                  new Date(feed.lastUpdatedTime as number),
                  new Date()
                )}
            </span>
          </Text>
        </HStack>
      </Container>
    </ContentContainer>
  )
}

export default ShowFeed
