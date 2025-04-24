// Este arquivo define um contexto para gerenciar o tema da aplicação (claro/escuro).


import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styled from 'styled-components';

// Versão ultra-segura com múltiplos fallbacks
const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${({ $theme }) => 
    $theme?.colors?.primary || 
    '#4361ee'}; /* Fallback explícito */
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $theme }) => 
      $theme?.colors?.primaryDark || 
      '#3a56d4'}; /* Fallback explícito */
    transform: scale(1.1);
  }
`;

const ThemeToggle = () => {
  const { themeName, toggleTheme, theme } = useTheme();
  
  // Fallback visual se algo der errado
  if (!theme) {
    return (
      <button 
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#4361ee',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        {themeName === 'light' ? '🌙' : '☀️'}
      </button>
    );
  }

  return (
    <ToggleButton 
      onClick={toggleTheme} 
      $theme={theme} // Usando prop transitória ($) para evitar warnings
      aria-label="Alternar tema"
    >
      {themeName === 'light' ? '🌙' : '☀️'}
    </ToggleButton>
  );
};

export default ThemeToggle;