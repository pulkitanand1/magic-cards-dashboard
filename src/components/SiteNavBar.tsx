import React from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import DropDownData from "../utils/DropdownData";

interface SiteNavBarProps {
  handleSearchButtonClick: (searchText: string) => void;
}

export default function SiteNavBar(props: SiteNavBarProps) {
  const { handleSearchButtonClick } = props;
  const location = useLocation();
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
    handleSearchButtonClick(inputRef.current?.value as string);
  }

  const inputRef = React.useRef<HTMLInputElement>(null);

  const SearchForm = () => {
    const enableSearchForm = location.pathname.indexOf("magicCardDetails") < 0;
    if (enableSearchForm) {
      return (
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
            ref={inputRef}
          />
          <button className={`btn btn-${toggleButtonTheme}`} type="submit">
            Search
          </button>
        </form>
      );
    } else {
      return <></>;
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Magic Cards Dashboard
        </Link>
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
        <SearchForm />
      </div>
    </nav>
  );
}
