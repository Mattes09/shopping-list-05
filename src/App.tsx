import React from "react";
import { useTranslation } from "react-i18next";
import AppRouter from "./routes/AppRouter";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { WbSunny, DarkMode, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface AppProps {
  toggleDarkMode: () => void;
}

const App: React.FC<AppProps> = ({ toggleDarkMode }) => {
  const { i18n } = useTranslation();
  const [languageAnchor, setLanguageAnchor] =
    React.useState<null | HTMLElement>(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const navigate = useNavigate();

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setLanguageAnchor(null);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
    toggleDarkMode();
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <Home />
          </IconButton>

          <Box display="flex" alignItems="center">
            <IconButton color="inherit" disabled>
              {isDarkMode ? <DarkMode /> : <WbSunny />}
            </IconButton>
            <Switch
              checked={isDarkMode}
              onChange={handleDarkModeToggle}
              color="default"
              sx={{ mr: 2 }}
            />

            <IconButton color="inherit" onClick={handleLanguageMenuOpen}>
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={languageAnchor}
              open={Boolean(languageAnchor)}
              onClose={() => setLanguageAnchor(null)}
            >
              <MenuItem onClick={() => handleLanguageChange("en")}>
                🇺🇸 English
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("sk")}>
                🇸🇰 Slovak
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <AppRouter />
    </Box>
  );
};

export default App;
