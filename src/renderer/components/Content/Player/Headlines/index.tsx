import { List, ListItem } from '@chakra-ui/layout'
import { getFeedById } from '@shared/store/reducer/feed'
import React from 'react'
import { useSelector } from 'react-redux'

// import { Container } from './styles';

type HeadlinesProps = {
  id: string
}

const Headlines: React.FC<HeadlinesProps> = ({ id }) => {
  const feed = useSelector(getFeedById(id))
  const headlines = feed && feed.headlines
  console.log(headlines, feed)
  return (
    <List>
      {headlines &&
        headlines.length &&
        headlines.map(h => (
          <ListItem key={`${id}_${h.title}`}>{h.title}</ListItem>
        ))}
    </List>
  )
}

export default Headlines
