import { IconButton } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import { usePlayer } from '@contexts/PlayerContext'
import React from 'react'
import { BiPlay, BiSkipNext, BiSkipPrevious, BiStop } from 'react-icons/bi'

const Controls: React.FC = () => {
  const { play, stop } = usePlayer()
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
        onClick={play}
      />
      <IconButton
        variant='ghost'
        aria-label='stop'
        fontSize='24px'
        icon={<BiStop />}
        onClick={stop}
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
