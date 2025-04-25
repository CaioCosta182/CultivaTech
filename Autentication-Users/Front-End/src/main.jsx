import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ThemeProvider } from './context/ThemeContext.jsx'; // Atualize a importação

// Seleciona o elemento raiz do DOM
const container = document.getElementById('root');

// Cria uma raiz (root) para renderização
const root = createRoot(container);

// Renderiza o aplicativo dentro da raiz
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);