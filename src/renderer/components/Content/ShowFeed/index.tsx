import { IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Image } from '@chakra-ui/image'
import { Center, Container, Heading, HStack, Text } from '@chakra-ui/layout'
import ExternalLinkConsentModal from '@components/ExternalLinkConsentModal'
import { useContent } from '@contexts/ContentContext'
import { useAppDispatchRenderer } from '@shared/store/configureStore/renderer'
import { deleteFeed, getFeedById } from '@shared/store/reducer/feed'
import { formatRelative } from 'date-fns'
import React, { useCallback } from 'react'
import { BiLinkExternal, BiRss, BiTrash } from 'react-icons/bi'
import { useSelector } from 'react-redux'

import { ContentContainer } from '../ContentContainer'

type ShowFeedProps = Record<string, unknown>

const ShowFeed: React.FC<ShowFeedProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setAddFeed } = useContent()
  const dispatch = useAppDispatchRenderer()
  const onDeleteFeed = useCallback(() => {
    dispatch(deleteFeed(id as string))
    setAddFeed()
  }, [id, dispatch, setAddFeed])

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
  const feedLink = feed && feed.metadata?.link

  return (
    <ContentContainer>
      <Container>
        <HStack justify='space-between'>
          <Center>
            <BiRss fontSize='1.25rem' />
          </Center>
          <Heading as='h2' size='md'>
            {feed && feed.name}
          </Heading>
          <HStack>
            <IconButton
              variant='ghost'
              aria-label='Remove Feed'
              fontSize='md'
              icon={<BiTrash />}
              onClick={onDeleteFeed}
            />
            {feedLink && (
              <>
                <IconButton
                  variant='ghost'
                  aria-label='Open Feed Page'
                  fontSize='md'
                  icon={<BiLinkExternal />}
                  onClick={onOpen}
                />

                <ExternalLinkConsentModal
                  isOpen={isOpen}
                  onClose={onClose}
                  link={feedLink}
                />
              </>
            )}
          </HStack>
        </HStack>
        <HStack>
          {originalFeedTitle && (
            <Heading as='h3' size='sm'>
              {originalFeedTitle}
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
        {feedImageUrl && (
          <HStack>
            <Image
              src={`appfiles://${feedImageUrl}`}
              alt={feedImageTitle}
              boxSize='150px'
            />
          </HStack>
        )}
        <HStack mt='8'>
          {feedDescription && <Text as='p'>{feedDescription}</Text>}
        </HStack>
      </Container>
    </ContentContainer>
  )
}

export default ShowFeed
