import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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

  const effectTargets = data.items
    .flatMap((asset: any) => asset.Values.ItemEffect.EffectTargets.Text)
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i);

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
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={4} md={2}>
              <FormControl fullWidth={true}>
                <InputLabel>EffectTarget (TBD)</InputLabel>
                <Select value="1">
                  {effectTargets.map((target: any) => (
                    <MenuItem key={target} value={target}>
                      {target}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ItemTable data={data.items}></ItemTable>
    </Container>
  );
};

export default App;
