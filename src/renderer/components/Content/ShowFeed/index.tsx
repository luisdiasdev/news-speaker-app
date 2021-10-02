import { Image } from '@chakra-ui/image'
import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Text
} from '@chakra-ui/layout'
import { getFeedById } from '@shared/store/reducer/feed'
import { formatRelative } from 'date-fns'
import React from 'react'
import { BiRss } from 'react-icons/bi'
import { useSelector } from 'react-redux'

import { ContentContainer } from '../ContentContainer'

type ShowFeedProps = Record<string, unknown>

const ShowFeed: React.FC<ShowFeedProps> = ({ id }) => {
  const feed = useSelector(getFeedById(id as string))

  if (!feed || !feed.metadata) {
    return (
      <ContentContainer>
        <Container>
          <HStack>
            <Center>Oops! Feed not found. Consider adding a new one.</Center>
          </HStack>
        </Container>
      </ContentContainer>
    )
  }
  const originalFeedTitle = feed && feed.metadata?.title
  const feedImageUrl = feed && feed.metadata?.internalImageUrl
  const feedImageTitle = feed && feed.metadata?.imageTitle
  const feedDescription = feed && feed.metadata.description

  return (
    <ContentContainer>
      <Container>
        <HStack>
          <Center>
            <BiRss />
          </Center>
          <Heading as='h2' size='md'>
            {feed && feed.name}
          </Heading>
          {originalFeedTitle && (
            <Heading as='h3' size='sm'>
              ({originalFeedTitle})
            </Heading>
          )}
        </HStack>
        <HStack mt='2' mb='4'>
          <Text fontSize='sm' as='sub'>
            Updated:{' '}
            <span>
              {feed.lastUpdatedTime &&
                formatRelative(
                  new Date(feed.lastUpdatedTime as number),
                  new Date()
                )}
            </span>
          </Text>
        </HStack>
        <HStack>
          {feedImageUrl && (
            <Image
              src={`appfiles://${feedImageUrl}`}
              alt={feedImageTitle}
              boxSize='150px'
            />
          )}
        </HStack>
        <HStack mt='8'>
          {feedDescription && <Text as='p'>{feedDescription}</Text>}
        </HStack>
      </Container>
    </ContentContainer>
  )
}

export default ShowFeed
