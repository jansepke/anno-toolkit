import { DocumentHeadTags, DocumentHeadTagsProps, documentGetInitialProps } from "@mui/material-nextjs/v14-pagesRouter";
import { DocumentProps, Head, Html, Main, NextScript } from "next/document";
import { roboto } from "../next/theme";

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en" className={roboto.className}>
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = documentGetInitialProps;
