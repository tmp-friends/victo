import { FC } from "react";
import Link from "next/link";
import { Flex, Button } from "@chakra-ui/react";

export const SiteHeader: FC = () => {
  return (
    <Flex as="header" shadow="md">
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
      <Link href="/tags" passHref>
        <Button fontSize="sm" variant="ghost">
          Tags
        </Button>
      </Link>
    </Flex>
  );
};
