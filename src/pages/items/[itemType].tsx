import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { itemTypes, languages } from "../../anno-config";
import ItemList from "../../components/items-page/ItemList";
import Page from "../../components/shared/Page";
import { AnnoItem } from "../../data/AnnoItem";
import { getEffectItems } from "../../data/data";
import { cartesianProduct } from "../../next/cartesianProduct";

interface ItemPageProps {
  itemType: string;
  items: AnnoItem[];
}

const ItemPage: React.FC<ItemPageProps> = ({ itemType, items }) => {
  const { t } = useTranslation("common");

  return (
    <Page headline={t("title.items")} key={itemType}>
      <ItemList items={items} />
    </Page>
  );
};

export default ItemPage;

export const getStaticProps: GetStaticProps<ItemPageProps> = async ({ locale, params }) => {
  const items = await getEffectItems(
    languages.find((l) => l.key === locale)?.fileName || languages[0].fileName,
    params?.itemType as string,
  );

  return {
    props: {
      itemType: params?.itemType as string,
      items: items,
    },
  };
};

// generate every possible language + itemType combination
export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: cartesianProduct(
    locales as string[],
    itemTypes.map((t) => t.key),
  ).map((params) => ({
    locale: params[0],
    params: {
      itemType: params[1],
    },
  })),
  fallback: false,
});
