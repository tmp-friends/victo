import NextDocument, { DocumentContext, DocumentInitialProps } from "next/document"

export default class Document extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }
}
