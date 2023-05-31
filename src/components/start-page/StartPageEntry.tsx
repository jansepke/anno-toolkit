import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface StartPageEntryProps {
  url: string;
  label: string;
  icon: string;
  imageStyle?: React.CSSProperties;
}

export const StartPageEntry: React.FC<StartPageEntryProps> = (props) => (
  <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
    <Card sx={{ width: "100%", textAlign: "center" }}>
      <Link href={props.url} legacyBehavior>
        <CardActionArea sx={{ height: "100%" }}>
          <CardContent>
            <Image
              src={props.icon}
              width={75}
              height={75}
              priority={true}
              loading="eager"
              alt=""
              style={props.imageStyle}
            />
            <Typography variant="h5">{props.label}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  </Grid>
);
