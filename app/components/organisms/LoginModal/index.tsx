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

interface LoginModalProps {
  /**
   * ログインボタンを押したときのイベントハンドラ
   */
  onLogin?: () => void
}

/**
 * ログインモーダル
 */
const LoginModal = ({ onLogin }: LoginModalProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure()

  const handleLogin = async () => {
    onLogin && onLogin()
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
              onClick={handleLogin}
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

export default LoginModal
