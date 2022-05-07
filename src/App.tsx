import "./App.scss";
import React, { useEffect, useState } from "react";
import { ThemeContext, themes } from "./contexts/ThemeContext";
import SiteNavBar from "./components/SiteNavBar";
import Dashboard from "./components/Dashboard";
import LanguageContext from "./contexts/LanguageContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MagicCardDetailsPage from "./components/MagicCardDetailsPage";
import { useAppDispatch } from "./app/hook";
import { getCardsForDashboardAsync } from "./features/magicCards/cardsDashboardSlice";
import { intialFilterState } from "./utils/DropdownData";

function App() {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState(intialFilterState);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState("");

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
    const newFilters = { ...filters };
    newFilters.searchText = searchText;
    setFilters(newFilters);
    dispatch(getCardsForDashboardAsync());
  };

  const siteNavBarPassThruProps = { handleSearchButtonClick };

  const handleMagicCardClick = (id: string) => {
    setSelectedCardId(id);
  };

  const dashboardPassThruProps = {
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    handleMagicCardClick,
  };

  const magicCardDetailsProps = { selectedCardId: selectedCardId };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <BrowserRouter>
          <SiteNavBar {...siteNavBarPassThruProps} />

          <Routes>
            <Route
              path="/"
              element={<Dashboard {...dashboardPassThruProps} />}
            />
            <Route
              path="/magicCardDetails"
              element={
                selectedCardId !== "" ? (
                  <MagicCardDetailsPage {...magicCardDetailsProps} />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
