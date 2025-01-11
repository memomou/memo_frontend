import { DefaultTheme } from "styled-components";

const colors = {
  slate200: "#F8FAFC",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate950: "#020617",
}

export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  ...colors,
};

export const darkTheme: DefaultTheme = {
  headerbgColor: "#f0f0f0" ,//"#96C5F7"
  headerTextColor: "black",
  SideBarbgColor: colors.slate200,
  SideBarBorderColor: colors.slate300,
  SideBarTextColor: colors.slate950,
  ContentbgColor: "#fdfdfd",
  FooterbgColor: "#fdfdfd",
  ...colors,
};
