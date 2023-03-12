import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import theme from "./config/theme"

// Next.jsでダークモードを適用するにはbodyタグ内のコンテンツの前にColorModeScriptを追加する必要あり
// @see: https://chakra-ui.com/docs/styled-system/features/color-mode#for-nextjs
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.initialColorMode} />

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
