import { Box, Heading, Text, VStack } from '@chakra-ui/layout'
import { isFeatureFlagEnabled } from '@shared/store/reducer/featureFlags'
import React from 'react'
import { useSelector } from 'react-redux'

import Form from './Form'
import { Container } from './styles'

const AddFeed: React.FC = () => {
  const isOPMLEnabled = useSelector(isFeatureFlagEnabled('OPML_ENABLED'))
  console.log('OPML Enabled?', isOPMLEnabled)

  return (
    <Container>
      <VStack align='flex-start'>
        <Heading fontFamily='Roboto Mono' fontWeight='medium'>
          Add/import your feeds
        </Heading>
        {isOPMLEnabled ? (
          <Text
            fontFamily='Roboto'
            fontWeight='light'
            fontSize='xl'
            lineHeight='1'
          >
            Grab your favorite RSS feed URL and paste below or drag and drop
            your OPML file here. We will import everything so you can start
            listening to your favorite news!
          </Text>
        ) : (
          <Text
            fontFamily='Roboto'
            fontWeight='light'
            fontSize='xl'
            lineHeight='1'
          >
            Grab your favorite RSS feed URL and paste below. We will import
            everything so you can start listening to your favorite news!
          </Text>
        )}
      </VStack>
      <Box mt='8'>
        <Form isOPMLEnabled={isOPMLEnabled} />
      </Box>
    </Container>
  )
}

export default AddFeed
