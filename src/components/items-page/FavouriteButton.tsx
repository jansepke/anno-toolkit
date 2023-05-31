import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import { yellow } from "@mui/material/colors";

const colorYellow = { color: yellow[400] };

interface FavouriteButtonProps {
  favourite: boolean;
  handleFavouriteChange: () => void;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ favourite, handleFavouriteChange }) => (
  <IconButton size="small" onClick={handleFavouriteChange}>
    {favourite ? <Star sx={colorYellow} /> : <StarBorder sx={{ ":hover": colorYellow }} />}
  </IconButton>
);

export default FavouriteButton;
