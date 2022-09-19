import { FC } from "react";
import Link from "next/link";
import { Divider, Flex, Text } from "@chakra-ui/react";

import { ContentWrapper } from "./content-wrapper";

export const SiteFooter: FC = () => (
  <>
    <Divider size="xl" />
    <Flex as="footer" justify="center" height="10vh">
      <ContentWrapper>
        <Link href="/" passHref>
          <Text color="whiteAlpha.600">©komekami</Text>
        </Link>
      </ContentWrapper>
    </Flex>
  </>
);
