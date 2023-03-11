import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle"

import { login } from "../auth/login";

export const LoginButton = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()

  const handleClick = async () => {
    await login()
    onClose()
  }

  return (
    <>
      <Button colorScheme="twitter" onClick={onOpen}>Log in</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Victo</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Button
              leftIcon={<FcGoogle size={22} />}
              size="lg"
              variant="outline"
              onClick={handleClick}
            >
              Login with Google
            </Button>
          </ModalBody>
          <ModalFooter>
            利用規約、プライバシーポリシーに同意したうえでログインしてください
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
