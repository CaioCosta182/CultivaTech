import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';

const ThemeButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: ${({ theme }) => (theme === 'light' ? '#007bff' : '#333')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme === 'light' ? '#0056b3' : '#555')};
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeButton theme={theme} onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </ThemeButton>
  );
};

export default ThemeToggle;