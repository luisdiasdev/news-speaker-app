import { Box, Stack } from '@chakra-ui/layout'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const Form: React.FC = () => {
  return (
    <Box mt='4'>
      <form>
        <Stack>
          <FormControl id='name'>
            <FormLabel>Feed Name</FormLabel>
            <Input type='text' placeholder='My favorite news' />
          </FormControl>
          <FormControl id='url'>
            <FormLabel>URL</FormLabel>
            <Input type='text' placeholder='https://some.podcast.com/rss' />
          </FormControl>
          <Button colorScheme='blue' type='submit'>
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default Form
