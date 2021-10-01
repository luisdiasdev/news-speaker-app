import { IconButton } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Center, Flex, HStack, List, ListItem } from '@chakra-ui/layout'
import { useContent } from '@contexts/ContentContext'
import { getFeedList } from '@shared/store/reducer/feed/selectors'
import React from 'react'
import { BiEditAlt, BiPlay, BiRefresh } from 'react-icons/bi'
import { FaRssSquare } from 'react-icons/fa'
import { useSelector } from 'react-redux'

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
  const { setEditFeed, setPlayer } = useContent()

  const handleEditButtonClick = () => setEditFeed({ id })
  const handlePlayButtonClick = () => setPlayer()

  return (
    <ListItem m='1'>
      <Flex justifyContent='space-between' alignItems='center'>
        <HStack>
          <Center>
            <FaRssSquare />
          </Center>
          <p>{name}</p>
          {(updating || downloading) && (
            <Center>
              <Icon as={BiRefresh} color='green.500' w={6} h={6} />
            </Center>
          )}
        </HStack>
        <HStack>
          <IconButton
            variant='ghost'
            aria-label='play'
            icon={<BiEditAlt />}
            onClick={handleEditButtonClick}
          />
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
