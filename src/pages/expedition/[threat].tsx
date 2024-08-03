import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { expeditionThreats, languages } from "../../anno-config";
import ExpeditionList from "../../components/expedition-page/ExpeditionList";
import Page from "../../components/shared/Page";
import { AnnoItem } from "../../data/AnnoItem";
import { getExpeditionItems } from "../../data/data";
import { cartesianProduct } from "../../next/cartesianProduct";

interface ExpeditionPageProps {
  threat: string;
  items: AnnoItem[];
}

const ExpeditionPage: React.FC<ExpeditionPageProps> = ({ threat, items }) => {
  const { t } = useTranslation("common");

  return (
    <Page headline={t("title.expedition")} key={threat}>
      <ExpeditionList items={items} />
    </Page>
  );
};

export default ExpeditionPage;

export const getStaticProps: GetStaticProps<ExpeditionPageProps> = async ({ locale, params }) => {
  const threat = params?.threat as string;

  const items = await getExpeditionItems(
    languages.find((l) => l.key === locale)?.fileName || languages[0].fileName,
    threat,
  );

  const filteredAndSortedItems = items.sort(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (a, b) => getAttribute(b, threat)!.value - getAttribute(a, threat)!.value,
  );

  return {
    props: {
      threat: threat,
      items: filteredAndSortedItems,
    },
  };
};

// generate every possible language + threat combination
export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: cartesianProduct(
    locales as string[],
    expeditionThreats.filter((et) => et.icon).map((et) => et.key),
  ).map((params) => ({
    locale: params[0],
    params: {
      threat: params[1],
    },
  })),
  fallback: false,
});

function getAttribute(item: AnnoItem, threat: string) {
  return item.expeditionAttributes.find((attribute) => attribute.key === threat);
}
