import "./common.scss";
import React, { Suspense, useEffect, useState } from "react";
import { ThemeContext, themes } from "./contexts/ThemeContext";
import SiteNavBar from "./components/SiteNavBar";
import LanguageContext from "./contexts/LanguageContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { getCardsForDashboardAsync } from "./features/magicCards/cardsDashboardSlice";
import { DashboardFilters } from "./dataTypes/DashboardFilters";
import Dashboard from "./components/Dashboard";
import {
  SelectFilters,
  updateFilters,
} from "./features/magicCards/filtersSlice";

function App() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(SelectFilters);
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

  /**
   * Handles the language change event on drop-down.
   * @param language Selected Language on dropdown.
   */
  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
  };

  const languageContextValue = {
    selectedLanguage: selectedLanguage,
    changeSelectedLanguage: handleLanguageSelection,
  };

  /**
   * Handles the click event of search button in navigation bar.
   * @param searchText The search text typed in search box
   */
  const handleSearchButtonClick = (searchText: string) => {
    const newFilters = { ...filters };
    newFilters.searchText = searchText;
    dispatch(updateFilters(newFilters));
    dispatch(getCardsForDashboardAsync());
  };

  const siteNavBarPassThruProps = { handleSearchButtonClick };

  /**
   * Handles the click event on magic card name.
   */
  const handleMagicCardClick = (id: string) => {
    setSelectedCardId(id);
  };

  /**
   * Handles the setting of new filter values.
   * @param filters
   */
  const handleSetFilters = (newFilters: DashboardFilters) => {
    setCurrentPage(1);
    dispatch(updateFilters(newFilters));
  };

  const dashboardPassThruProps = {
    filters,
    handleSetFilters,
    currentPage,
    setCurrentPage,
    handleMagicCardClick,
  };

  const magicCardDetailsProps = { selectedCardId: selectedCardId };

  const MagicCardDetailsPage = React.lazy(
    () => import("./components/MagicCardDetailsPage")
  );
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
                  <Suspense
                    fallback={
                      <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    }
                  >
                    <MagicCardDetailsPage {...magicCardDetailsProps} />
                  </Suspense>
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
