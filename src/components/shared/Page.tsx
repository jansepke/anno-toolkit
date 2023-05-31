import Head from "next/head";
import React from "react";
import TopBar from "./TopBar";

interface PageProps extends React.PropsWithChildren {
  headline: string;
}

const Page: React.FC<PageProps> = ({ headline, children }) => (
  <>
    <Head>
      <title>{headline}</title>
      <meta name="description" content="Finding the best fitting specialists." />
    </Head>
    <TopBar headline={headline} />

    {children}
  </>
);

export default Page;
