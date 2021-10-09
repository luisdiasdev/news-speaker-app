import { Box, HStack, List, ListItem, Text } from '@chakra-ui/layout'
import { getFeedById } from '@shared/store/reducer/feed'
import { formatDistance } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux'

type HeadlinesProps = {
  id: string
}

const Headlines: React.FC<HeadlinesProps> = ({ id }) => {
  const feed = useSelector(getFeedById(id))
  const headlines = feed && feed.headlines

  return (
    <Box m='4'>
      <List spacing='4'>
        {headlines &&
          headlines.length &&
          headlines.map(h => (
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
                    <Text fontWeight='bold'>{h.title}</Text>
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
    </Box>
  )
}

export default Headlines
