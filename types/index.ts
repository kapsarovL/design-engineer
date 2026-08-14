export * from "./task";

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
