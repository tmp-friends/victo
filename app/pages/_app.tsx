import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./config/theme";
import { ContentWrapper } from "../components/content-wrapper";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SiteHeader />
      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>
      <SiteFooter />
    </ChakraProvider>
  );
}

export default MyApp;
