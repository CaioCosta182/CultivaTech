import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ListaPropriedades = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

export const PropriedadeItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
`;

export const TituloPropriedade = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
`;

export const DetalhesPropriedade = styled.p`
  margin: 5px 0;
  color: #666;
`;

export const Botao = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
