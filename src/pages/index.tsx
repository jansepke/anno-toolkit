import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import App from "../App";
import { getData } from "../data";

const Index = ({ data }: any) => (
  <>
    <Head>
      <title>Anno 1800 Items</title>
      <meta name="description" content="Anno 1800 items." />
    </Head>
    <App data={data} />
  </>
);

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const data = await getData();

  return {
    props: { data: data },
  };
};
