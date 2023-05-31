import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

interface StartPageSectionProps extends React.PropsWithChildren {
  heading?: string;
}

export const StartPageSection: React.FC<StartPageSectionProps> = ({
  heading,
  children,
}) => (
  <Grid item xs={12}>
    {heading ? <Typography variant="h4">{heading}</Typography> : null}
    {children}
  </Grid>
);
