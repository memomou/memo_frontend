import { DefaultTheme } from "styled-components";

const colors = {
  slate50: "#F8FAFC",
  slate200: "#F8FAFC",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate950: "#020617",
  blue700: "#1D4ED8",
}

export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  ...colors,
};

export const darkTheme: DefaultTheme = {
  headerbgColor: "#f8fbff" ,
  headerTextColor: "black",
  headerBorderColor: "#CBD5E1",
  SideBarbgColor: colors.slate200,
  SideBarBorderColor: colors.slate300,
  SideBarTextColor: colors.slate950,
  defaultTextColor: "black",
  ContentbgColor: "#fdfdfd",
  FooterbgColor: "#fdfdfd",
  ...colors,
};
