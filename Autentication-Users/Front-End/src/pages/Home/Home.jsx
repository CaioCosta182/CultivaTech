
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
  Container, 
  Title, 
  Description, 
  ButtonContainer, 
  Button 
} from './styles';

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');

  return (
    <Container theme={theme}>
      <Title theme={theme}>Bem-vindo ao CultivaTech</Title>
      <Description theme={theme}>
        Gerencie suas propriedades e culturas de forma eficiente.
      </Description>
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