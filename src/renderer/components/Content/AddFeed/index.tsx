import { Box, Center, Container, Heading, HStack } from '@chakra-ui/layout'
import React from 'react'
import { BiEdit } from 'react-icons/bi'

import { ContentContainer } from '../ContentContainer'
import Form from './Form'

const AddFeed: React.FC = () => {
  return (
    <ContentContainer>
      <Container maxW='container.lg'>
        <HStack>
          <Center>
            <BiEdit />
          </Center>
          <Heading as='h2' size='md'>
            Add new feed
          </Heading>
        </HStack>
        <Box mt='4'>
          <Form />
        </Box>
      </Container>
    </ContentContainer>
  )
}

export default AddFeed
