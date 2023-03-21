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
import { useUserContext } from "../../provider/user-context";

export const SiteHeader: FC = () => {
  const user = useUserContext()
  const isLogin = !!user

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
                src={user.image_url}
                size="md"
                name={user.name}
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
