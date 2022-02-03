import { IconButton } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Center, Flex, HStack, List, ListItem } from '@chakra-ui/layout'
import { useView } from '@context/ViewContext'
import { getFeedList } from '@shared/store/reducer/feed/selectors'
import React from 'react'
import { BiCheck, BiPlay, BiRss } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import UseAnimations from 'react-useanimations'
import LoadingAnimation from 'react-useanimations/lib/loading'

type FeedListItemProps = {
  id: string
  name: string
  downloading?: boolean
  updating?: boolean
}

const FeedListItem: React.FC<FeedListItemProps> = ({
  id,
  name,
  updating,
  downloading
}) => {
  const { setPlayer, setShowFeed } = useView()

  const handlePlayButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setPlayer({ id })
  }
  const handleLineClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setShowFeed({ id })
  }

  return (
    <ListItem m='1' cursor='pointer' onClick={handleLineClick}>
      <Flex justifyContent='space-between' alignItems='center'>
        <HStack>
          <Center>
            <BiRss />
          </Center>
          <p>{name}</p>
          {(updating || downloading) && (
            <Center>
              <UseAnimations animation={LoadingAnimation} />
            </Center>
          )}
          {!downloading && !updating && (
            <Center>
              <Icon as={BiCheck} color='green.500' w={5} h={5} />
            </Center>
          )}
        </HStack>
        <HStack>
          <IconButton
            variant='ghost'
            aria-label='play'
            icon={<BiPlay />}
            onClick={handlePlayButtonClick}
          />
        </HStack>
      </Flex>
    </ListItem>
  )
}

export const FeedList: React.FC = () => {
  const feeds = useSelector(getFeedList)
  console.log('feeds =>>', feeds)
  return (
    <List>
      {feeds &&
        Object.values(feeds).map(feed => (
          <FeedListItem
            name={feed.name}
            key={feed.id}
            id={feed.id}
            downloading={feed.downloading}
            updating={feed.updating}
          />
        ))}
    </List>
  )
}
