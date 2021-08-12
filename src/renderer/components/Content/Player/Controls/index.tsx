import { IconButton } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import React from 'react'
import { BiPlay, BiSkipNext, BiSkipPrevious, BiStop } from 'react-icons/bi'

const Controls: React.FC = () => {
  return (
    <HStack>
      <IconButton
        variant='ghost'
        aria-label='previous'
        fontSize='24px'
        icon={<BiSkipPrevious />}
      />
      <IconButton
        variant='ghost'
        aria-label='play'
        fontSize='24px'
        icon={<BiPlay />}
      />
      <IconButton
        variant='ghost'
        aria-label='stop'
        fontSize='24px'
        icon={<BiStop />}
      />
      <IconButton
        variant='ghost'
        aria-label='next'
        fontSize='24px'
        icon={<BiSkipNext />}
      />
    </HStack>
  )
}

export default Controls
