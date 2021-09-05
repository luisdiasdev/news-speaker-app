import { IconButton } from '@chakra-ui/button'
import { Center, Flex, HStack, List, ListItem } from '@chakra-ui/layout'
import { Feed } from '@shared/domain/feed'
import { getFeedList } from '@shared/store/reducer/feed/selectors'
import React from 'react'
import { BiPlay } from 'react-icons/bi'
import { FaRssSquare } from 'react-icons/fa'
import { useSelector } from 'react-redux'

type FeedListItemProps = {
  name: string
}

const FeedListItem: React.FC<FeedListItemProps> = ({ name }) => {
  return (
    <ListItem>
      <Flex justifyContent='space-between' alignItems='center'>
        <HStack>
          <Center>
            <FaRssSquare />
          </Center>
          <p>{name}</p>
        </HStack>
        <IconButton variant='ghost' aria-label='play' icon={<BiPlay />} />
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
        feeds.length &&
        feeds.map((feed: Feed) => (
          <FeedListItem name={feed.name} key={feed.name} />
        ))}
    </List>
  )
}
