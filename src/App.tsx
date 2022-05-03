import "./App.scss";
import React, { useEffect, useState } from "react";
import { ThemeContext, themes } from "./Contexts/ThemeContext";
import SiteNavBar from "./components/SiteNavBar";
import LanguageContext from "./Contexts/LanguageContext";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const currentTheme = isDarkTheme ? themes.dark : themes.light;

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const themeContextValue = {
    isDark: isDarkTheme,
    theme: currentTheme,
    toggleTheme: toggleTheme,
  };

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.background = currentTheme.background;
  }, [isDarkTheme]);

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
  };

  const languageContextValue = {
    selectedLanguage: selectedLanguage,
    changeSelectedLanguage: handleLanguageSelection,
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <SiteNavBar />
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
