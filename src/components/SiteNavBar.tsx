import React from "react";
import { useContext } from "react";
import { useAppDispatch } from "../app/hook";
import LanguageContext from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { getCardsForDashboardAsync } from "../features/magicCards/cardsDashboardSlice";
import DropDownData from "../utils/DropdownData";

export default function SiteNavBar() {
  const dispatch = useAppDispatch();
  const themeContext = useContext(ThemeContext);
  const { selectedLanguage, changeSelectedLanguage } =
    useContext(LanguageContext);

  const theme = themeContext.isDark ? "dark" : "light";

  // It should provide the ability to toggle.
  const toggleButtonTheme = themeContext.isDark ? "light" : "dark";

  function handleToggleThemeButtonClick() {
    themeContext.toggleTheme();
  }

  const languagesList = DropDownData.languagesList;

  function handleLanguageSelection(value: string) {
    changeSelectedLanguage(value);
  }

  function handleSearchOperation() {
    dispatch(getCardsForDashboardAsync());
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
      <div className="container-fluid">
        <a className="navbar-brand">Magic Cards Dashboard</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className={`btn btn-outline btn-${toggleButtonTheme} border-${toggleButtonTheme}`}
                onClick={handleToggleThemeButtonClick}
              >
                Turn {toggleButtonTheme}
              </button>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedLanguage}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {languagesList.map((lang) => (
                  <li
                    key={lang}
                    onClick={() => {
                      handleLanguageSelection(lang);
                    }}
                    value={lang}
                  >
                    <span className="dropdown-item">{lang}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        <form
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchOperation();
          }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className={`btn btn-${toggleButtonTheme}`} type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
