import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const ItemTableRow = ({ item }: any) => {
  const values = item.Values;

  return (
    <TableRow hover={true}>
      <TableCell>
        <img
          src={values.Standard.IconFilename.replace(
            "data/ui/2kimages",
            "/img"
          ).replace(".png", "_0.png")}
          width="20px"
        />
      </TableCell>
      <TableCell>{values.Text.Translated}</TableCell>
      <TableCell>{values.Item.ItemType}</TableCell>
      <TableCell>{values.Item.Rarity || "Common"}</TableCell>
      <TableCell>{values.ItemEffect.EffectTargets.Text}</TableCell>
      <TableCell>
        {Object.entries(values)
          .filter(([key, value]) => key.includes("Upgrade") && value !== "")
          .map(
            ([key, value]: any[]) =>
              `${key}: ${Object.entries(value)
                .map(([vk, v]: any[]) => `${vk}: ${v.Value ? v.Value : "TBD"}`)
                .join(" ")}`
          )
          .join(" ")}
      </TableCell>
    </TableRow>
  );
};

export default ItemTableRow;
