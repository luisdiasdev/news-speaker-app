import { IconButton } from '@chakra-ui/button'
import { useAppDispatchRenderer } from '@shared/store/configureStore/renderer'
import { closeWindowAction } from '@shared/store/reducer/main'
import React, { useCallback } from 'react'
import { BiX } from 'react-icons/bi'

import { Container, TitleContainer } from './styles'

const TitleBar: React.FC = ({ children }) => {
  const dispatch = useAppDispatchRenderer()
  const onClose = useCallback(() => dispatch(closeWindowAction()), [dispatch])
  return (
    <Container>
      <TitleContainer>{children}</TitleContainer>
      <IconButton
        css={`
          -webkit-app-region: no-drag;
        `}
        variant='ghost'
        fontSize='20px'
        aria-label='close application'
        icon={<BiX />}
        onClick={onClose}
      />
    </Container>
  )
}

export default TitleBar
