import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ListaPropriedades,
  PropriedadeItem, TituloPropriedade,
  DetalhesPropriedade, Botao } from './styles';
  
const MinhasPropriedades = () => {
  const navegar = useNavigate();

  // Dados fictícios de propriedades (substitua por dados reais do backend)
  const propriedades = [
    {
      id: 1,
      nome: 'Fazenda Feliz',
      tamanho: '50 ha',
      endereco: 'Rodovia BR-101, Km 200',
      culturas: [
        { nome: 'Soja', tamanhoTalhao: '20 ha' },
        { nome: 'Milho', tamanhoTalhao: '30 ha' },
      ],
    },
    {
      id: 2,
      nome: 'Sítio Esperança',
      tamanho: '30 ha',
      endereco: 'Estrada do Sossego, 123',
      culturas: [
        { nome: 'Café', tamanhoTalhao: '15 ha' },
        { nome: 'Feijão', tamanhoTalhao: '15 ha' },
      ],
    },
  ];

  return (
    <Container>
      <h1>Minhas Propriedades</h1>
      <ListaPropriedades>
        {propriedades.map((propriedade) => (
          <PropriedadeItem key={propriedade.id}>
            <TituloPropriedade>{propriedade.nome}</TituloPropriedade>
            <DetalhesPropriedade>
              <strong>Tamanho:</strong> {propriedade.tamanho}
            </DetalhesPropriedade>
            <DetalhesPropriedade>
              <strong>Endereço:</strong> {propriedade.endereco}
            </DetalhesPropriedade>
            <DetalhesPropriedade>
              <strong>Culturas:</strong>
              <ul>
                {propriedade.culturas.map((cultura, index) => (
                  <li key={index}>
                    {cultura.nome} - {cultura.tamanhoTalhao}
                  </li>
                ))}
              </ul>
            </DetalhesPropriedade>
          </PropriedadeItem>
        ))}
      </ListaPropriedades>
      <Botao onClick={() => navegar('/dashboard')}>Voltar para Dashboard</Botao>
    </Container>
  );
};

export default MinhasPropriedades;