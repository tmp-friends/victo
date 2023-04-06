import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

import theme from "./config/theme"
import { ContentWrapper } from "../components/common/content-wrapper"
import { SiteHeader } from "../components/common/site-header"
import { SiteFooter } from "../components/common/site-footer"
import { AuthContextProvider } from "../contexts/AuthContext"
import { ApiContext } from "../types/data"
import { FollowingHashtagsContextProvider } from "../contexts/FollowingHashtagsContext"

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_ROOT_URL || "/api/proxy",
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider context={context}>
        <FollowingHashtagsContextProvider context={context}>
          <SiteHeader />
          <ContentWrapper>
            <Component {...pageProps} />
          </ContentWrapper>
          <SiteFooter />
        </FollowingHashtagsContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
