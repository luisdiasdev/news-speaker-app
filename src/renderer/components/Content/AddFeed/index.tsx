import { Center, Container, Heading, HStack } from '@chakra-ui/layout'
import React from 'react'
import { BiEdit } from 'react-icons/bi'

import { ContentContainer } from '../ContentContainer'
import Form from './form'

const AddFeed: React.FC = () => {
  return (
    <ContentContainer>
      <Container>
        <HStack>
          <Center>
            <BiEdit />
          </Center>
          <Heading as='h2' size='md'>
            Add new feed
          </Heading>
        </HStack>
        <Form />
      </Container>
    </ContentContainer>
  )
}

export default AddFeed
