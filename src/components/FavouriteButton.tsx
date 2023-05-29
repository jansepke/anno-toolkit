import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import { yellow } from "@mui/material/colors";

const FavouriteButton = ({
  favourite,
  handleFavouriteChange,
}: {
  favourite: boolean;
  handleFavouriteChange: () => void;
}) => {
  return (
    <IconButton size="small" onClick={handleFavouriteChange}>
      {favourite ? (
        <Star sx={{ color: yellow[400] }} />
      ) : (
        <StarBorder sx={{ "&:hover": { color: yellow[400] } }} />
      )}
    </IconButton>
  );
};

export default FavouriteButton;
