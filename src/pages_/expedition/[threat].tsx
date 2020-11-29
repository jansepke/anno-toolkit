import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import expeditionThreats from "../../../data/anno/assets/expeditionthreat.json";
import ExpeditionList from "../../components/ExpeditionList";
import Page from "../../components/Page";
import { cartesianProduct } from "../../util/functions";

const ExpeditionPage = ({ threat }: { threat: string }) => {
  const { t } = useTranslation("common");

  return (
    <Page headline={t("title.expedition")}>
      <ExpeditionList threat={threat} />
    </Page>
  );
};

export default ExpeditionPage;

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  return {
    props: {
      threat: params!.threat,
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
