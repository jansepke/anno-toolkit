import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { expeditionThreats, itemTypes } from "../anno-config";
import Page from "../components/Page";

// TODO: extract components https://mui.com/material-ui/customization/how-to-customize/#2-reusable-component
const Index = () => {
  const { t } = useTranslation("common");

  return (
    <Page headline={t("title.index")}>
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography align="justify">{t("index.intro")}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4">{t("heading.items")}</Typography>
            <Grid container spacing={3}>
              {itemTypes
                .filter((itemType) => !itemType.hidden)
                .map((itemType) => (
                  <Grid
                    key={itemType.key}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{ display: "flex" }}
                  >
                    <Card sx={{ width: "100%", textAlign: "center" }}>
                      <Link href={`/items/${itemType.key}`} legacyBehavior>
                        <CardActionArea
                          sx={{ height: "100%" }}
                          disabled={itemType.hidden}
                        >
                          <CardContent>
                            <Image
                              src={`/img/main/3dicons/${itemType.icon}.png`}
                              width={75}
                              height={75}
                              priority={true}
                              loading="eager"
                              alt=""
                            />
                            <Typography variant="h5">
                              {t("itemTypes." + itemType.key)}
                            </Typography>
                            {itemType.hidden ? (
                              <Typography>{t("comingSoon")}</Typography>
                            ) : null}
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4">{t("heading.expedition")}</Typography>
            <Grid container spacing={3}>
              {expeditionThreats
                .filter((threat) => threat.icon)
                .map((threat) => (
                  <Grid
                    key={threat.key}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{ display: "flex" }}
                  >
                    <Card sx={{ width: "100%", textAlign: "center" }}>
                      <Link href={`/expedition/${threat.key}`} legacyBehavior>
                        <CardActionArea sx={{ height: "100%" }}>
                          <CardContent>
                            <Image
                              src={`/img/main/icons/${threat.icon}_0.png`}
                              width={75}
                              height={75}
                              priority={true}
                              loading="eager"
                              style={{ filter: "saturate(2) brightness(0.7)" }}
                              alt=""
                            />
                            <Typography variant="h5">
                              {t("expeditionThreats." + threat.key)}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4">About</Typography>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Index;
