import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Input, Button } from './styles';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { name, email, password });
      console.log(response.data);
      // Redirecionar para o login após o registro
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <Container>
      <h2>Registro</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button type="submit">Registrar</Button>
      </Form>
    </Container>
  );
};

export default Register;