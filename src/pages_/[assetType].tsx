import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { defaultLocale } from "../../i18n.json";
import { itemTypes, languages } from "../anno-config.json";
import App from "../App";
import { getData, PageData } from "../data/data";

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
  locale = defaultLocale,
  params = { assetType: itemTypes[0].key },
} = {}) => {
  const data = await getData(
    languages.find((l) => l.key === locale)?.fileName || languages[0].fileName,
    params.assetType as string
  );

  return {
    props: {
      data: data,
      key: Number(new Date()), // solves https://github.com/vercel/next.js/issues/9992
    },
  };
};

const f = (a: any, b: any) =>
  [].concat(...a.map((d: any) => b.map((e: any) => [].concat(d, e))));
const cartesian = (a: any, b: any = undefined, ...c: any[]): any =>
  b ? cartesian(f(a, b), ...c) : a;

// generate every possible language + itemType combination
export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: cartesian(
    locales,
    itemTypes.map((t) => t.key)
  ).map((params: any) => ({
    locale: params[0],
    params: {
      assetType: params[1],
    },
  })),
  fallback: false,
});
