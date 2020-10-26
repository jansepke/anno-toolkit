import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { AnnoItem } from "../data/AnnoItem";
import ItemTableRow from "./ItemTableRow";

const ItemTable = ({ data }: { data: AnnoItem[] }) => {
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
          {data.map((item) => (
            <ItemTableRow key={item.GUID} item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
