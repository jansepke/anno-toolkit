import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import App from "../App";
import { getData, PageData } from "../data/data";

const languages: { [key: string]: string } = {
  de: "german",
  en: "english",
};

const f = (a: any, b: any) =>
  [].concat(...a.map((d: any) => b.map((e: any) => [].concat(d, e))));
const cartesian = (a: any, b: any = undefined, ...c: any[]): any =>
  b ? cartesian(f(a, b), ...c) : a;

const Index = ({ data }: { data: PageData }) => (
  <>
    <Head>
      <title>Anno toolkit</title>
      <meta
        name="description"
        content="Finding the best fitting specialists."
      />
    </Head>
    <App data={data} />
  </>
);

export default Index;

export const getStaticProps: GetStaticProps = async ({
  locale = "de",
  params = { assetType: "harboroffice" },
} = {}) => {
  const data = await getData(
    languages[locale],
    (params.assetType as string) + "item"
  );

  return {
    props: {
      data: data,
      key: Number(new Date()), // solves https://github.com/vercel/next.js/issues/9992
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: cartesian(locales, ["harboroffice", "guildhouse", "townhall"]).map(
    (params: any) => ({
      locale: params[0],
      params: {
        assetType: params[1],
      },
    })
  ),
  fallback: false,
});
