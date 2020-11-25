import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { itemTypes } from "../anno-config.json";
import Page from "../components/Page";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  gridItem: {
    display: "flex",
  },
  card: {
    width: "100%",
    textAlign: "center",
  },
  cardActionArea: {
    height: "100%",
  },
}));

const Index = () => {
  const classes = useStyles();
  const { t } = useTranslation("common");

  return (
    <Page headline={t("title.index")}>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">{t("heading.items")}</Typography>
          </Grid>
          {itemTypes.map((itemType) => (
            <Grid
              key={itemType.key}
              item
              xs={12}
              sm={6}
              md
              className={classes.gridItem}
            >
              <Card className={classes.card}>
                <Link href={`/items/${itemType.key}`}>
                  <CardActionArea
                    className={classes.cardActionArea}
                    disabled={itemType.hidden}
                  >
                    <CardContent>
                      <Image
                        src={`/img/main/3dicons/${itemType.icon}.png`}
                        width={75}
                        height={75}
                        priority={true}
                        loading="eager"
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
          <Grid item xs={12}>
            <Typography variant="h4">{t("heading.expedition")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{t("comingSoon")}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Index;
