import "./App.scss";
import React, { useEffect, useState } from "react";
import { ThemeContext, themes } from "./Contexts/ThemeContext";
import SiteNavBar from "./components/SiteNavBar";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () =>{
    setIsDarkTheme(!isDarkTheme);
  };
  const currentTheme = isDarkTheme ? themes.dark : themes.light;

  const contextValue = {
    isDark: isDarkTheme,
    theme: currentTheme,
    toggleTheme : toggleTheme
  }

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.background = currentTheme.background;
  }, [isDarkTheme]);


  return (
    <ThemeContext.Provider value={contextValue}>
        <SiteNavBar/>
    </ThemeContext.Provider>
 
  );
}

export default App;
