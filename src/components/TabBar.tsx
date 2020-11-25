import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { itemTypes } from "../anno-config.json";

const TabBar = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { assetType = itemTypes[0].key } = router.query;
  const tabKeys = itemTypes.map((tab) => tab.key);
  const activeTab = tabKeys.indexOf(assetType as string);

  return (
    <Tabs
      value={activeTab}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      {itemTypes
        .filter((itemType) => !itemType.hidden)
        .map((itemType) => (
          <Link key={itemType.key} href={`/items/${itemType.key}`}>
            <Tab
              label={t("common:itemTypes." + itemType.key)}
              icon={
                <Image
                  src={`/img/${itemType.key}.png`}
                  width={20}
                  height={20}
                  priority={true}
                  loading="eager"
                />
              }
            />
          </Link>
        ))}
    </Tabs>
  );
};

export default TabBar;
