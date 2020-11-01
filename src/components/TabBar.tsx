import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TabData } from "../data/data";

const TabBar = ({ tabs }: { tabs: TabData[] }) => {
  const router = useRouter();
  const { assetType = tabs[0].key } = router.query;
  const tabKeys = tabs.map((tab) => tab.key);
  const activeTab = tabKeys.indexOf(assetType as string);

  return (
    <Tabs
      value={activeTab}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      {tabs.map((tab) => (
        <Link key={tab.key} href={`/${tab.key}`}>
          <Tab
            label={tab.label}
            icon={
              <Image
                src={`/img/${tab.key}.png`}
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
