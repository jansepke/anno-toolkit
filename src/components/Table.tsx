import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const ItemTable = ({ data }: any) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Icon</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Rarity</TableCell>
            <TableCell>EffectTarget</TableCell>
            <TableCell>Effect</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: any) => {
            const values = item.Values;

            return (
              <TableRow key={values.Standard.GUID} hover={true}>
                <TableCell>{values.Standard.IconFilename}</TableCell>
                <TableCell>{values.Text.LocaText.English.Text}</TableCell>
                <TableCell>{values.Item.ItemType}</TableCell>
                <TableCell>{values.Item.Rarity}</TableCell>
                <TableCell>{JSON.stringify(values.ItemEffect)}</TableCell>
                <TableCell>
                  {Object.entries(values)
                    .filter(
                      ([key, value]) => key.includes("Upgrade") && value !== ""
                    )
                    .map(
                      ([key, value]: any[]) =>
                        `${key}: ${Object.entries(value)
                          .map(
                            ([vk, v]: any[]) =>
                              `${vk}: ${v.Value ? v.Value : "TBD"}`
                          )
                          .join(" ")}`
                    )
                    .join(" ")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
