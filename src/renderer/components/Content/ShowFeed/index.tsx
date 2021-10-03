import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Image } from '@chakra-ui/image'
import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Text,
  VStack
} from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import ExternalLinkConsentModal from '@components/ExternalLinkConsentModal'
import { getFeedById } from '@shared/store/reducer/feed'
import { formatRelative } from 'date-fns'
import React, { useState } from 'react'
import { BiLinkExternal, BiRss } from 'react-icons/bi'
import { useSelector } from 'react-redux'

import { ContentContainer } from '../ContentContainer'

type ShowFeedProps = Record<string, unknown>

const ShowFeed: React.FC<ShowFeedProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
            <BiRss />
          </Center>
          <Heading as='h2' size='md'>
            {feed && feed.name}
          </Heading>
          {feedLink && (
            <>
              <IconButton
                variant='ghost'
                aria-label='Open Feed Page'
                fontSize='sm'
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
