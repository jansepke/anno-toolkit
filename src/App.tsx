import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ItemTable from "./components/ItemTable";

const tabs = ["HarborOffice", "Guildhouse", "Townhall"];

const App = ({ data }: any) => {
  const router = useRouter();
  const { assetType = "HarborOffice" } = router.query;
  const activeTab = tabs.indexOf(assetType as string);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center">
        Anno 1800 items
      </Typography>
      <Box m={2}>
        <Typography align="justify">Lorem ipsum.</Typography>
      </Box>
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {tabs.map((tab) => (
          <Link key={tab} href={`/de/${tab}`}>
            <Tab
              label={tab}
              icon={<img src={`/img/${tab.toLowerCase()}.png`} width="20px" />}
            />
          </Link>
        ))}
      </Tabs>
      <ItemTable data={data.items}></ItemTable>
    </Container>
  );
};

export default App;
