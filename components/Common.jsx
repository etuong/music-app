import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export const tinyTextStyles = {
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
};

export const StyledIconButton = styled(IconButton)(() => ({
  boxShadow: "3px 3px 6px #d4d4d4,  -1px -1px 3px #ffffff",
}));

export const TinyText = styled(Typography)(tinyTextStyles);

