import { IconButton } from '@chakra-ui/button'
import { Center, Flex, HStack, List, ListItem } from '@chakra-ui/layout'
import { useContent } from '@contexts/ContentContext'
import { getFeedList } from '@shared/store/reducer/feed/selectors'
import React from 'react'
import { BiEditAlt, BiPlay } from 'react-icons/bi'
import { FaRssSquare } from 'react-icons/fa'
import { useSelector } from 'react-redux'

type FeedListItemProps = {
  id: string
  name: string
}

const FeedListItem: React.FC<FeedListItemProps> = ({ id, name }) => {
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
  // const feeds: Feed[] = [
  //   {
  //     name: 'Test 1',
  //     url: 'someurl'
  //   },
  //   {
  //     name: 'Test 2',
  //     url: 'someurl2'
  //   }
  // ]

  const feeds = useSelector(getFeedList)
  console.log('feeds =>>', feeds)
  return (
    <List>
      {feeds &&
        Object.values(feeds).map(feed => (
          <FeedListItem name={feed.name} key={feed.id} id={feed.id} />
        ))}
    </List>
  )
}
