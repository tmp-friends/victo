import { FC } from "react"
import Link from "next/link"
import {
  Box,
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react"
import { LoginButton } from "./login-button";
import { useAuthContext } from "../auth/AuthContext";
import { getCookie } from "typescript-cookie";

export const SiteHeader: FC = () => {
  const { user } = useAuthContext()
  const isLogin = !!user

  console.log(isLogin)
  return (
    <>
      <Flex as="header" shadow="md" alignItems="center">
        <Link href="/" passHref>
          <Button fontSize="md" variant="ghost">
            Victo
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button fontSize="sm" variant="ghost">
            Home
          </Button>
        </Link>
        <Link href="/pickup" passHref>
          <Button fontSize="sm" variant="ghost">
            Pickup
          </Button>
        </Link>
        <Link href="/hashtags" passHref>
          <Button fontSize="sm" variant="ghost">
            Hashtags
          </Button>
        </Link>
        <Spacer />
        <Box m={2}>
          <LoginButton />
        </Box>
      </Flex>
    </>
  );
};
