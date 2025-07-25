import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register/Register';
import axios from 'axios';

jest.mock('axios');

describe('Register Component', () => {
  it('deve renderizar o formulário de registro', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument();
  });

  it('deve mostrar mensagens de erro para campos inválidos', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));
    
    expect(await screen.findByText(/Nome é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/E-mail é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/Senha é obrigatória/i)).toBeInTheDocument();
  });

  it('deve chamar axios.post com os dados corretos ao submeter', async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Nome Completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/E-mail/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/CPF/i), { target: { value: '12345678901' } });
    fireEvent.change(screen.getByPlaceholderText(/Telefone/i), { target: { value: '11999999999' } });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await screen.findByText('Cadastrar');

    expect(axios.post).toHaveBeenCalledWith('/api/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      cpfCnpj: '12345678901',
      phone: '11999999999',
      profileType: 'PF',
    });
  });
});