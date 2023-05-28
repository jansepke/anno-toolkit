import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import { yellow } from "@mui/material/colors";
import makeStyles from "@mui/styles/makeStyles";

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
