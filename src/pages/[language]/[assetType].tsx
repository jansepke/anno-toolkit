import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import App from "../../App";
import { AnnoItem } from "../../data/AnnoItem";
import { getData } from "../../data/data";

const languages: { [key: string]: string } = {
  de: "german",
};

const f = (a: any, b: any) =>
  [].concat(...a.map((d: any) => b.map((e: any) => [].concat(d, e))));
const cartesian = (a: any, b: any = undefined, ...c: any[]): any =>
  b ? cartesian(f(a, b), ...c) : a;

const Index = ({ data }: { data: { items: AnnoItem[] } }) => (
  <>
    <Head>
      <title>Anno 1800 Items</title>
      <meta name="description" content="Anno 1800 items." />
    </Head>
    <App data={data} />
  </>
);

export default Index;

export const getStaticProps: GetStaticProps = async ({
  params = { language: "de", assetType: "HarborOffice" },
} = {}) => {
  const data = await getData(
    languages[params.language as string],
    (params.assetType as string) + "Item"
  );

  return {
    props: { data: data },
  };
};

export const getStaticPaths = async () => ({
  paths: cartesian(["de"], ["HarborOffice", "Guildhouse", "Townhall"]).map(
    (params: any) => ({
      params: {
        language: params[0],
        assetType: params[1],
      },
    })
  ),
  fallback: false,
});
