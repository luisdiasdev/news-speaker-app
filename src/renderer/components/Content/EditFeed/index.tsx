import { Box, Center, Container, Heading, HStack } from '@chakra-ui/layout'
import React from 'react'
import { BiEdit } from 'react-icons/bi'

import { ContentContainer } from '../ContentContainer'
import Form from './Form'

type EditFeedProps = Record<string, unknown>

const EditFeed: React.FC<EditFeedProps> = ({ id }) => {
  return (
    <ContentContainer>
      <Container>
        <HStack boxSize='10'>
          <Center>
            <BiEdit />
          </Center>
          <Heading as='h2' size='md'>
            Edit
          </Heading>
        </HStack>
        <Box mt='4'>
          <Form id={id as string} />
        </Box>
      </Container>
    </ContentContainer>
  )
}

export default EditFeed
