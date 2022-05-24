import React from "react";
import { ThemeItem } from "../dataTypes/ThemeItem";
import { ThemeType } from "../dataTypes/ThemeType";

const themeItems: ThemeItem[] = [
  {
    foreground: "#000000",
    background: "#eeeeee",
  },
  {
    foreground: "#ffffff",
    background: "#383838",
  },
];

export const themes: ThemeType = {
  light: themeItems[0],
  dark: themeItems[1],
};

const initialState = {
  isDark: false,
  theme: themes.light,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
};
export const ThemeContext = React.createContext(initialState);
