import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface TabProps {
  key: string;
  label: string;
  icon: string;
}

interface TabBarProps {
  queryKey: string;
  path: string;
  type: "centered" | "scrollable";
  tabs: TabProps[];
}

const TabBar = ({ queryKey, path, tabs, type }: TabBarProps) => {
  const router = useRouter();
  const queryValue = router.query[queryKey] as string;
  const tabKeys = tabs.map((tab) => tab.key);
  const activeTab = tabKeys.indexOf(queryValue);

  return (
    <Tabs
      value={activeTab}
      indicatorColor="primary"
      textColor="primary"
      variant={type === "scrollable" ? "scrollable" : "standard"}
      centered={type === "centered"}
    >
      {tabs.map((tab) => (
        <Link key={tab.key} href={`/${path}/${tab.key}`}>
          <Tab
            label={tab.label}
            icon={
              <Image
                src={tab.icon}
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
