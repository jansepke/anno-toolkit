import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";

const App = ({ data }: any) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center">
        Anno 1800 items
      </Typography>
      <Box m={2}>
        <Typography align="justify">Lorem ipsum.</Typography>
      </Box>
      {data.map((item: any) => (
        <p key={item.Values.Standard.GUID}>
          {item.Values.Text.LocaText.English.Text}
        </p>
      ))}
      {JSON.stringify(data[0], null, 2)}
    </Container>
  );
};

export default App;
