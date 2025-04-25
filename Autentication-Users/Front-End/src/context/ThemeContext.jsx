// Este arquivo define um contexto para gerenciar o tema da aplicação (claro/escuro).

import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { defaultTheme, darkTheme } from '../theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');
  
  // Carrega o tema salvo ao montar o componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setThemeName(savedTheme);
    }
  }, []);

  // Atualiza o localStorage quando o tema muda
  useEffect(() => {
    localStorage.setItem('theme', themeName);
  }, [themeName]);

  const theme = themeName === 'light' ? defaultTheme : darkTheme;
  
  const toggleTheme = () => {
    setThemeName(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn('useTheme must be used within a ThemeProvider');
    return {
      theme: defaultTheme,
      themeName: 'light',
      toggleTheme: () => {}
    };
  }
  return context;
};