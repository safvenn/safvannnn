import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {  useThemeMode } from '../context/ThemeContext';
import {  useTheme } from '@mui/material/styles';
export default function ThemeToggle() {
  const theme = useTheme();
  const { toggleColorMode } = useThemeMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}