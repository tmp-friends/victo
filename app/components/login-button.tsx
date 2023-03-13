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
import { useRouter } from "next/router"

import { login } from "../auth/login"

export const LoginButton = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()

  const router = useRouter()
  const handleClick = async () => {
    await login()
    onClose()
    router.push("/my")
  }

  return (
    <>
      <Button colorScheme="teal" color="white" onClick={onOpen}>Log in</Button>

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
