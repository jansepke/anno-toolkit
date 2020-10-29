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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ItemTable from "./components/ItemTable";
import { PageData } from "./data/data";
import i18n from "./i18n";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const App = ({ data }: { data: PageData }) => {
  const [t] = i18n.useTranslation("common");

  const router = useRouter();
  const { assetType = "HarborOffice" } = router.query;
  const tabs = data.tabs.map((tab) => tab.key);
  const activeTab = tabs.indexOf(assetType as string);

  const effectTargets = data.items
    .flatMap((asset) => asset.effectTargets)
    .filter((v, i, a) => a.indexOf(v) === i);

  const [effectTarget, setEffectTarget] = useState("all");
  const handleEffectTargetChange = (
    event: object,
    value: string,
    reason: string
  ) => {
    reason === "clear" ? setEffectTarget("all") : setEffectTarget(value);
  };

  const raritySet = [
    { value: "all" },
    { value: "Common" },
    { value: "Uncommon" },
    { value: "Rare" },
    { value: "Epic" },
    { value: "Legendary" },
  ];

  const [rarity, setRarity] = useState("all");
  const handleRarityChange = (event: object, value: string, reason: string) => {
    reason === "clear" ? setRarity("all") : setRarity(value);
  };

  const filteredItems = data.items
    .filter(
      (item) =>
        effectTarget === "all" || item.effectTargets.includes(effectTarget)
    )
    .filter((item) => rarity === "all" || item.rarity === rarity);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center">
        {t("title")}
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
        {data.tabs.map((tab) => (
          <Link key={tab.key} href={`/de/${tab.key}`}>
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
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={4} md={2}>
              <FormControl fullWidth={true}>
                <Autocomplete
                  options={effectTargets}
                  autoComplete={true}
                  getOptionLabel={(option) => option}
                  onInputChange={handleEffectTargetChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("effectTarget")}
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4} md={2}>
              <FormControl fullWidth={true}>
                <Autocomplete
                  options={raritySet}
                  autoComplete={true}
                  getOptionLabel={(option) => option.value}
                  onInputChange={handleRarityChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("rarity")}
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4} md={2}>
              <Typography align="right">
                {filteredItems.length !== data.items.length
                  ? `${filteredItems.length}/`
                  : ""}
                {data.items.length} Items
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ItemTable data={filteredItems}></ItemTable>
    </Container>
  );
};

export default App;
