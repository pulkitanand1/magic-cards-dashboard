import React from "react";

const initialState = {
  selectedLanguage: "English",
  changeSelectedLanguage: (language: string) => {
    language;
  },
};

const LanguageContext = React.createContext(initialState);

export default LanguageContext;
