import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { expeditionThreats, itemTypes } from "../anno-config";
import Page from "../components/shared/Page";
import { StartPageEntry } from "../components/start-page/StartPageEntry";
import { StartPageSection } from "../components/start-page/StartPageSection";

const Index = () => {
  const { t } = useTranslation("common");

  return (
    <Page headline={t("title.index")}>
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
        <Grid container spacing={3}>
          <StartPageSection>
            <Typography align="justify">{t("index.intro")}</Typography>
          </StartPageSection>

          <StartPageSection heading={t("heading.items")}>
            <Grid container spacing={3}>
              {itemTypes
                .filter((itemType) => !itemType.hidden)
                .map((itemType) => (
                  <StartPageEntry
                    key={itemType.key}
                    label={t("itemTypes." + itemType.key)}
                    url={`/items/${itemType.key}`}
                    icon={`/img/main/3dicons/${itemType.icon}.png`}
                  />
                ))}
            </Grid>
          </StartPageSection>

          <StartPageSection heading={t("heading.expedition")}>
            <Grid container spacing={3}>
              {expeditionThreats
                .filter((threat) => threat.icon)
                .map((threat) => (
                  <StartPageEntry
                    key={threat.key}
                    label={t("expeditionThreats." + threat.key)}
                    url={`/expedition/${threat.key}`}
                    icon={`/img/main/icons/${threat.icon}_0.png`}
                    imageStyle={{ filter: "saturate(2) brightness(0.7)" }}
                  />
                ))}
            </Grid>
          </StartPageSection>

          <StartPageSection heading="About">
            <Typography align="justify">
              <Trans
                i18nKey="common:index.about"
                components={[
                  <MuiLink
                    key="issues"
                    href="https://github.com/jansepke/anno-toolkit/issues"
                    target="_blank"
                    rel="noopener"
                  />,
                  <MuiLink
                    key="license"
                    href="https://github.com/jansepke/anno-toolkit/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener"
                  />,
                ]}
              />
            </Typography>
            <Typography align="justify" sx={{ pt: 1 }}>
              <Trans
                i18nKey="common:index.support"
                components={[
                  <MuiLink key="issues" href={process.env.NEXT_PUBLIC_SUPPORT_URL} target="_blank" rel="noopener" />,
                ]}
              />
            </Typography>
          </StartPageSection>
        </Grid>
      </Container>
    </Page>
  );
};

export default Index;
