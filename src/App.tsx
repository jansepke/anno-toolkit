import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ItemTable from "./components/Table";

const App = ({ data }: any) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center">
        Anno 1800 items
      </Typography>
      <Box m={2}>
        <Typography align="justify">Lorem ipsum.</Typography>
      </Box>
      <ItemTable data={data}></ItemTable>
      <p>{JSON.stringify(data[0])}</p>
      <p>{JSON.stringify(data[data.length - 1])}</p>
    </Container>
  );
};

export default App;
