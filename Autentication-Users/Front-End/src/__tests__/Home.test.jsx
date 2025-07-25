import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import { ThemeProvider } from '../context/ThemeContext';

describe('Home Component', () => {
  it('deve renderizar o título e a descrição', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText(/Bem-vindo ao CultivaTech/i)).toBeInTheDocument();
    expect(screen.getByText(/Gerencie suas propriedades e culturas de forma eficiente./i)).toBeInTheDocument();
  });

  it('deve renderizar os botões de Login e Cadastro', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cadastre-se/i })).toBeInTheDocument();
  });
});