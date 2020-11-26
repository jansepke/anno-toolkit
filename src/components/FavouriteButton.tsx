import yellow from "@material-ui/core/colors/yellow";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import React from "react";

const useStyles = makeStyles({
  unchecked: {
    "&:hover svg": {
      fill: yellow[400],
    },
  },
  checked: {
    "& svg": {
      fill: yellow[400],
    },
  },
});

const FavouriteButton = ({
  favourite,
  handleFavouriteChange,
}: {
  favourite: boolean;
  handleFavouriteChange: () => void;
}) => {
  const classes = useStyles();

  return (
    <IconButton
      size="small"
      onClick={handleFavouriteChange}
      className={favourite ? classes.checked : classes.unchecked}
    >
      {favourite ? <Star /> : <StarBorder />}
    </IconButton>
  );
};

export default FavouriteButton;
