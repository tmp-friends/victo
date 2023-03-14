import { FC } from "react"
import Link from "next/link"
import {
  Box,
  Flex,
  Button,
  Spacer,
  Avatar,
} from "@chakra-ui/react"

import { LoginButton } from "../login-button";
import { useAuthContext } from "../../auth/AuthContext";

export const SiteHeader: FC = () => {
  const user = useAuthContext()
  const isLogin = !!user

  console.log(user)
  return (
    <>
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

        {isLogin
          ? <Link href="/my">
            <Box m={2}>
              <Avatar
                src={user?.profile_image_url ?? undefined}
                size="md"
                name={user?.name ?? undefined}
                mr={3}
                // requestにリファラー情報が含まれると403エラーになる
                referrerPolicy="no-referrer"
              />
            </Box>
          </Link>
          : <Box m={2}><LoginButton /></Box>
        }
      </Flex>
    </>
  );
};
