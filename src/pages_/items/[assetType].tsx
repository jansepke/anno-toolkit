import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { defaultLocale } from "../../../i18n.json";
import { itemTypes, languages } from "../../anno-config.json";
import Items from "../../components/Items";
import Page from "../../components/Page";
import { getData, PageData } from "../../data/data";

const ItemPage = ({ data }: { data: PageData }) => {
  const { t } = useTranslation();

  return (
    <Page headline={t("common:title.items")}>
      <Items data={data} />
    </Page>
  );
};

export default ItemPage;

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
