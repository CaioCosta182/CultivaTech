import React, { createContext, useState } from 'react';

// Cria o contexto do tema
export const ThemeContext = createContext();

// Provedor do tema
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Tema inicial: claro

  // Função para alternar entre temas
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};