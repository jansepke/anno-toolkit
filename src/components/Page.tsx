import Alert from "@material-ui/lab/Alert";
import Head from "next/head";
import React from "react";
import TopBar from "./TopBar";

const Page = ({
  headline,
  children,
}: {
  headline: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Head>
        <title>Anno toolkit</title>
        <meta
          name="description"
          content="Finding the best fitting specialists."
        />
      </Head>
      <TopBar headline={headline} />
      <Alert severity="info" style={{ alignContent: "center" }}>
        anno-toolkit.one moved to anno-toolkit.jansepke.de
      </Alert>

      {children}
    </>
  );
};

export default Page;
