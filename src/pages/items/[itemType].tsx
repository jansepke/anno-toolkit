import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { itemTypes, languages } from "../../anno-config";
import ItemList from "../../components/items-page/ItemList";
import Page from "../../components/shared/Page";
import { AnnoItem } from "../../data/AnnoItem";
import { getEffectItems } from "../../data/data";
import { cartesianProduct } from "../../next/cartesianProduct";

interface ItemPageProps {
  items: AnnoItem[];
}

const ItemPage: React.FC<ItemPageProps> = ({ items }) => {
  const { t } = useTranslation("common");

  return (
    <Page headline={t("title.items")}>
      <ItemList items={items} />
    </Page>
  );
};

export default ItemPage;

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const items = await getEffectItems(
    languages.find((l) => l.key === locale)?.fileName || languages[0].fileName,
    params?.itemType as string
  );

  return {
    props: {
      items: items,
      key: Number(new Date()), // solves https://github.com/vercel/next.js/issues/9992
    },
  };
};

// generate every possible language + itemType combination
export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: cartesianProduct(
    locales as string[],
    itemTypes.map((t) => t.key)
  ).map((params) => ({
    locale: params[0],
    params: {
      itemType: params[1],
    },
  })),
  fallback: false,
});
