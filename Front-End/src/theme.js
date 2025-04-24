// Este arquivo define um contexto para gerenciar o tema da aplicação (claro/escuro).

export const defaultTheme = Object.freeze({
  colors: Object.freeze({
    primary: "#4361ee",
    primaryDark: "#3a56d4",
    primaryLight: "#e6ebff",
    white: "#ffffff",
    gray: "#6c757d",
    grayLight: "#e9ecef",
    grayDark: "#343a40",
    error: "#dc3545",
    errorLight: "#f8d7da",
    success: "#28a745",
    background: "#f8f9fa",
    text: "#212529",
  }),
});

export const darkTheme = Object.freeze({
  colors: Object.freeze({
    primary: "#5a72f5",
    primaryDark: "#4361ee",
    primaryLight: "#1e2b6b",
    white: "#121212",
    gray: "#adb5bd",
    grayLight: "#343a40",
    grayDark: "#e9ecef",
    error: "#e35d6a",
    errorLight: "#3a1a1d",
    success: "#4caf50",
    background: "#121212",
    text: "#f8f9fa",
  }),
});
