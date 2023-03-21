import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./config/theme";
import { ContentWrapper } from "../components/common/content-wrapper";
import { SiteHeader } from "../components/common/site-header";
import { SiteFooter } from "../components/common/site-footer";
import { AuthProvider } from "../auth/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <SiteHeader />
        <ContentWrapper>
          <Component {...pageProps} />
        </ContentWrapper>
        <SiteFooter />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;