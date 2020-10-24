import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import ItemTable from "./components/ItemTable";

const tabs = ["HarborOffice", "Guildhouse", "Townhall"];

const App = ({ data }: any) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const changeTab = (event: any, newTab: number) => {
    setActiveTab(newTab);
  };

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
        onChange={changeTab}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {tabs.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>
      <ItemTable data={data[`${tabs[activeTab]}Item`]}></ItemTable>
    </Container>
  );
};

export default App;
