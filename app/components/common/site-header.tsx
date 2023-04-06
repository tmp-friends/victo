import { FC } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import {
  Box,
  Flex,
  Button,
  Spacer,
  Avatar,
  Spinner,
} from "@chakra-ui/react"

import LoginModalContainer from "../../containers/LoginModalContainer"
import { useAuthContext } from "../../contexts/AuthContext"

export const SiteHeader: FC = () => {
  const router = useRouter()

  const { authUser, isLoading } = useAuthContext()
  const isLogin = authUser && authUser.id !== undefined

  const handleLogin = async (err?: Error) => {
    if (!err) {
      await router.push("/my")
    }
  }

  return (
    <Flex as="header" shadow="md" alignItems="center">
      <Link href="/" passHref>
        <Button fontSize="lg" variant="ghost">
          Victo
        </Button>
      </Link>
      <Link href="/pickup" passHref>
        <Button fontSize="lg" variant="ghost">
          Pickup
        </Button>
      </Link>
      <Link href="/hashtags" passHref>
        <Button fontSize="lg" variant="ghost">
          Hashtags
        </Button>
      </Link>
      <Spacer />

      {(() => {
        if (isLogin) {
          return (
            <Link href="/my">
              <Box m={2}>
                <Avatar
                  src={authUser.profile_image_url}
                  size="md"
                  name={authUser.name}
                  mr={3}
                  // requestにリファラー情報が含まれると403エラーになる
                  referrerPolicy="no-referrer"
                />
              </Box>
            </Link>
          )
        } else if (isLoading) {
          return <Spinner />
        } else {
          return (
            <Box m={2}><LoginModalContainer onLogin={handleLogin} /></Box>
          )
        }
      })()}
    </Flex>
  )
}
