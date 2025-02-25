import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Description, ButtonContainer, Button } from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Obtém o tema atual

  const handleLoginClick = () => {
    navigate('/login'); // Navega para a tela de Login
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navega para a tela de Cadastro
  };

  return (
    <Container>
      <Title>Bem-vindo ao CultivaTech</Title>
      <Description>Gerencie suas propriedades e culturas de forma eficiente.</Description>
      <ButtonContainer>
        <Button theme={theme} onClick={handleLoginClick}>
          Login
        </Button>
        <Button theme={theme} onClick={handleRegisterClick}>
          Cadastre-se
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Home;