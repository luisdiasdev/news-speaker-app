import { Box, Heading, Text, VStack } from '@chakra-ui/layout'
import React from 'react'

import Form from './Form'
import { Container } from './styles'

const AddFeed: React.FC = () => {
  return (
    <Container>
      <VStack align='flex-start'>
        <Heading fontFamily='Roboto Mono' fontWeight='medium'>
          Add/import your feeds
        </Heading>
        <Text
          fontFamily='Roboto'
          fontWeight='light'
          fontSize='xl'
          lineHeight='1'
        >
          Grab your favorite RSS feed URL and paste below or drag and drop your
          OPML file here. We will import everything so you can start listening
          to your favorite news!
        </Text>
      </VStack>
      <Box mt='8'>
        <Form />
      </Box>
    </Container>
  )
}

export default AddFeed
