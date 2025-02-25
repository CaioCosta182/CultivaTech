import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza verticalmente */
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px; /* Espaço abaixo do título */

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const Description = styled.p`
  font-size: 1.5rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px; /* Espaço abaixo da frase */
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: ${({ theme }) => (theme === "light" ? "#007bff" : "#333")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? "#0056b3" : "#555"};
  }

  @media (min-width: 768px) {
    padding: 12px;
  }
`;
