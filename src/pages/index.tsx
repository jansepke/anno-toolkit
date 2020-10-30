import { GetStaticProps } from "next";
import page, { getStaticProps as pageGetStaticProps } from "./[assetType]";

export default page;

export const getStaticProps: GetStaticProps = async () =>
  await pageGetStaticProps({});
