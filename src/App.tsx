import "./App.scss";
import React, { useEffect, useState } from "react";
import { ThemeContext, themes } from "./contexts/ThemeContext";
import SiteNavBar from "./components/SiteNavBar";
import Dashboard from "./components/Dashboard";
import LanguageContext from "./contexts/LanguageContext";
import { DashboardFilters } from "./dataTypes/DashboardFilters";

function App() {
  const intialFilterState: DashboardFilters = {
    language: "English",
    pageSize: 50,
    colors: [],
    rarity: "All",
    superType: "All",
    searchText: ""
  };
  const [filters, setFilters] = useState(intialFilterState);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [enableSearchForm, setEnableSearchForm] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleSearchButtonClick = (searchText: string) => {
    const newFilters = {...filters};
    newFilters.searchText = searchText;
    setFilters(newFilters);
  };

  const siteNavBarPassThruProps = { enableSearchForm, handleSearchButtonClick };
  const dashboardPassThruProps = {
    filters,
    setFilters,
    currentPage,
    setCurrentPage
  };
  return (
    <LanguageContext.Provider value={languageContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <SiteNavBar {...siteNavBarPassThruProps} />
        <Dashboard {...dashboardPassThruProps} />
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
