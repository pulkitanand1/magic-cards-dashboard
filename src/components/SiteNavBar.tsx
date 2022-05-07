import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import DropDownData from "../utils/DropdownData";
import SearchForm from "./SearchForm";

interface SiteNavBarProps {
  handleSearchButtonClick: (searchText: string) => void;
}

export default function SiteNavBar(props: SiteNavBarProps) {
  const { handleSearchButtonClick } = props;
  const location = useLocation();
  const themeContext = useContext(ThemeContext);
  const { selectedLanguage, changeSelectedLanguage } =
    useContext(LanguageContext);

  const alterThemeTag = themeContext.isDark ? "dark" : "light";

  // It should provide the ability to toggle.
  const toggleButtonTheme = themeContext.isDark ? "light" : "dark";

  function handleToggleThemeButtonClick() {
    themeContext.toggleTheme();
  }

  const languagesList = DropDownData.languagesList;

  function handleLanguageSelection(value: string) {
    changeSelectedLanguage(value);
  }

  const searchFormProps = {
    handleSearchButtonClick: handleSearchButtonClick,
    isVisible: location.pathname.indexOf("magicCardDetails") < 0,
  };
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${alterThemeTag} bg-${alterThemeTag}`}
    >
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
        <SearchForm {...searchFormProps} />
      </div>
    </nav>
  );
}
