import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import { useAppDispatchRenderer } from '@renderer/store/configureStore'
import { openExternalLinkAction } from '@shared/store/reducer/main'
import React from 'react'

type ExternalLinkConsentModalProps = {
  link: string
  isOpen: boolean
  onClose: () => void
}

const ExternalLinkConsentModal: React.FC<ExternalLinkConsentModalProps> = ({
  link,
  isOpen,
  onClose
}) => {
  const dispatch = useAppDispatchRenderer()
  const onOpenLink = () => {
    dispatch(openExternalLinkAction(link))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>External Link Warning</ModalHeader>
        <ModalBody>
          <Text as='p'>
            You are about to open the following URL in your browser:
          </Text>
          <Text as='p' mb='4' mt='4'>
            <strong>{link}</strong>
          </Text>
          <Text as='p'>
            External links can expose your machine to security vulnerabilities.
            Are you sure you want to open it anyways?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={onClose}>
            I&apos;ll stay safe
          </Button>
          <Button colorScheme='blue' variant='ghost' onClick={onOpenLink}>
            Yes, open it!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ExternalLinkConsentModal
