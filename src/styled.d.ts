import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    headerbgColor?: string;
    headerTextColor?: string;
    SideBarbgColor?: string;
    SideBarTextColor?: string;
    ContentbgColor?: string;
    FooterbgColor?: string;
  }
}
