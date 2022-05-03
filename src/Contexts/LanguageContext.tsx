import React from "react";

const initialState = {
    selectedLanguage : "English",
    changeSelectedLanguage: (language: string) => { console.log(language);}
};


const LanguageContext = React.createContext(initialState);

export default LanguageContext;