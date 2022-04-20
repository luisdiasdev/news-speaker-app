import { Container, Heading, Text, VStack } from '@chakra-ui/layout'
import { getFeedFileByLocalId } from '@shared/store/reducer/feedFile'
import React from 'react'
import { useSelector } from 'react-redux'

type CustomizeFeedProps = Record<string, unknown>

const CustomizeFeed: React.FC<CustomizeFeedProps> = ({ localId }) => {
  const feedFile = useSelector(getFeedFileByLocalId(localId as string))

  console.log('CustomizeFeed -> feedFile -> ', feedFile)
  // TODO: Add customize form (display name)
  return (
    <Container>
      <VStack align='flex-start'>
        <Heading fontFamily='Roboto Mono' fontWeight='medium'>
          Customize feed
        </Heading>
        {!feedFile ? (
          <Text
            fontFamily='Roboto'
            fontWeight='light'
            fontSize='xl'
            lineHeight='1'
          >
            Loading...
          </Text>
        ) : (
          <Text
            fontFamily='Roboto'
            fontWeight='light'
            fontSize='xl'
            lineHeight='1'
          >
            Customize feed
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default CustomizeFeed
