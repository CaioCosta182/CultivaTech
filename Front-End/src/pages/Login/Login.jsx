import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, LoginBox, Title, Form, Input, Button, RegisterButton } from './styles';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response.data);
      navigate('/dashboard'); // Redireciona para o dashboard após o login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Redireciona para a tela de Cadastro
  };

  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Entrar</Button>
          <RegisterButton type="button" onClick={handleRegisterClick}>
            Cadastre-se
          </RegisterButton>
        </Form>
      </LoginBox>
    </Container>
  );
};

export default Login;