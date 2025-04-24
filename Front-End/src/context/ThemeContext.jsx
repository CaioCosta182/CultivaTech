// src/context/ThemeContext.jsx
import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { defaultTheme } from '../theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};