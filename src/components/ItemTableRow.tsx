import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { AnnoItem } from "../data/AnnoItem";

const ItemTableRow = ({ item }: { item: AnnoItem }) => {
  return (
    <TableRow hover={true}>
      <TableCell>
        <img src={item.Icon} width="20px" />
      </TableCell>
      <TableCell>{item.Name}</TableCell>
      <TableCell>{item.Type}</TableCell>
      <TableCell>{item.Rarity}</TableCell>
      <TableCell>{item.EffectTargets.join(", ")}</TableCell>
      <TableCell>{item.Upgrades.join(" ")}</TableCell>
    </TableRow>
  );
};

export default ItemTableRow;
