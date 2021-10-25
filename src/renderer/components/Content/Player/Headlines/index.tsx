import {
  Box,
  Flex,
  HStack,
  List,
  ListItem,
  Spacer,
  Text
} from '@chakra-ui/layout'
import { useAppDispatchRenderer } from '@shared/store/configureStore/renderer'
import { fetchNextHeadlinePage, getFeedById } from '@shared/store/reducer/feed'
import { formatDistance } from 'date-fns'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

type HeadlinesProps = {
  id: string
}

const Headlines: React.FC<HeadlinesProps> = ({ id }) => {
  const dispatch = useAppDispatchRenderer()
  const feed = useSelector(getFeedById(id))
  const { items, currentPage, totalItems, totalPages, itemsPerPage } =
    feed && feed.headlines
  const nextPage = useCallback(
    () => dispatch(fetchNextHeadlinePage(id)),
    [id, dispatch]
  )
  return (
    <Box m='4'>
      <div>{currentPage}</div>
      <div>{totalItems}</div>
      <div>{totalPages}</div>
      <div>{itemsPerPage}</div>
      <button onClick={nextPage}>Next</button>
      <List spacing='4'>
        {items &&
          items.length &&
          items.map(h => (
            <ListItem
              key={`${id}_${h.title}`}
              border='1px solid #CCC'
              borderRadius='8px'
              padding='4'
            >
              <HStack justifyContent='space-between'>
                {!h.isRead && (
                  <HStack>
                    <Box
                      boxSize='2'
                      bgColor='green.500'
                      borderRadius='50%'
                    ></Box>
                    <Box alignItems='flex-start'>
                      <Text fontWeight='bold'>{h.title}</Text>
                      <Text mt='0'>{h.author}</Text>
                    </Box>
                  </HStack>
                )}
                <HStack>
                  <Text as='span' fontSize='sm'>
                    {formatDistance(new Date(h.date), new Date(), {
                      addSuffix: true
                    })}
                  </Text>
                </HStack>
              </HStack>
            </ListItem>
          ))}
      </List>
      <Flex mr='16' ml='16' mt='4'>
        <Flex
          h='10'
          w='10'
          bg='green.500'
          alignItems='center'
          justifyContent='center'
        >
          <Text as='span' fontSize='sm'>
            1
          </Text>
        </Flex>
        <Spacer />
        <Flex
          h='10'
          w='10'
          bg='green.500'
          alignItems='center'
          justifyContent='center'
        >
          <Text as='span' fontSize='sm'>
            1
          </Text>
        </Flex>
        <Spacer />
        <Flex
          h='10'
          w='10'
          bg='green.500'
          alignItems='center'
          justifyContent='center'
        >
          <Text as='span' fontSize='sm'>
            1
          </Text>
        </Flex>
        <Spacer />
        <Flex
          h='10'
          w='10'
          bg='green.500'
          alignItems='center'
          justifyContent='center'
        >
          <Text as='span' fontSize='sm'>
            1
          </Text>
        </Flex>
        <Spacer />
        <Flex
          h='10'
          w='10'
          bg='green.500'
          alignItems='center'
          justifyContent='center'
        >
          <Text as='span' fontSize='sm'>
            1
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Headlines
