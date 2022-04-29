import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function SiteNavBar() {

  const themeContext = useContext(ThemeContext);

  const theme = themeContext.isDark ? "dark" : "light";

  // It should provide the ability to toggle.
  const toggleButtonTheme = themeContext.isDark ? "light" : "dark";

  function handleToggleThemeButtonClick(){
    themeContext.toggleTheme();
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
      <div className="container-fluid">
        <a className="navbar-brand">Magic Cards Dashboard</a>
        <form className="d-flex">
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
        <button className={`btn btn-outline btn-${toggleButtonTheme} border-${toggleButtonTheme}`}
            onClick={handleToggleThemeButtonClick}
        >Turn {toggleButtonTheme}</button>
      </div>
    </nav>
  );
}
