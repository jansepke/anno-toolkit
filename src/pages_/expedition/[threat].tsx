import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import expeditionThreats from "../../../data/anno/assets/expeditionthreat.json";
import { languages } from "../../anno-config.json";
import ExpeditionList from "../../components/ExpeditionList";
import Page from "../../components/Page";
import { AnnoItem } from "../../data/AnnoItem";
import { getData } from "../../data/data";
import { cartesianProduct } from "../../util/functions";

const ExpeditionPage = ({ items }: { items: AnnoItem[] }) => {
  const { t } = useTranslation("common");

  return (
    <Page headline={t("title.expedition")}>
      <ExpeditionList items={items} />
    </Page>
  );
};

export default ExpeditionPage;

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const items = await getData(
    languages.find((l) => l.key === locale)?.fileName || languages[0].fileName,
    "harboroffice"
  );

  const threat = params!.threat as string;

  const filteredAndSortedItems = items
    .filter((item) => getAttribute(item, threat) !== undefined)
    .sort(
      (a, b) => getAttribute(b, threat)!.value - getAttribute(a, threat)!.value
    );

  return {
    props: {
      items: filteredAndSortedItems,
      key: Number(new Date()), // solves https://github.com/vercel/next.js/issues/9992
    },
  };
};

// generate every possible language + threat combination
export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: cartesianProduct(
    locales as string[],
    expeditionThreats.map((et) => et.Values.Standard.Name.toLowerCase())
  ).map((params) => ({
    locale: params[0],
    params: {
      threat: params[1],
    },
  })),
  fallback: false,
});

function getAttribute(item: AnnoItem, threat: string) {
  return item.expeditionAttributes.find(
    (attribute) => attribute.key === threat
  );
}
