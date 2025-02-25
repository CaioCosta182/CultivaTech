import React, { useState } from 'react';
import { Container, Formulario, Campo, Botao, AreaTexto } from './styles';
import { useNavigate, useLocation } from 'react-router-dom';



const CadastroCulturas = () => {
  const navegar = useNavigate();
  const localizacao = useLocation();
  const { propriedade } = localizacao.state || {}; // Recebe os dados da propriedade

  // Estados para os detalhes da propriedade
  const [culturas, setCulturas] = useState('');
  const [custosInsumos, setCustosInsumos] = useState('');
  const [custosMaoDeObra, setCustosMaoDeObra] = useState('');
  const [resultadoColheita, setResultadoColheita] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode enviar os detalhes para o backend ou armazená-los localmente
    const cadastroCulturas = {
      ...culturas, // Dados da propriedade cadastrada
      culturas,
      custosInsumos,
      custosMaoDeObra,
      resultadoColheita,
    };

    console.log('Cadastro Culturas:', cadastroCulturas);

    // Redireciona para a página de dashboard após o cadastro
    navegar('/dashboard');
  };

  return (
    <Container>
      <h1>Detalhes da Propriedade: {propriedade?.nomePropriedade}</h1>
      <Formulario onSubmit={handleSubmit}>
        <AreaTexto
          placeholder="Culturas/Tamanho do Talhão"
          value={culturas}
          onChange={(e) => setCulturas(e.target.value)}
          required
        />
        <Campo
          type="number"
          placeholder="Custos com Insumos (R$)"
          value={custosInsumos}
          onChange={(e) => setCustosInsumos(e.target.value)}
          required
        />
        <Campo
          type="number"
          placeholder="Custos com Mão de Obra (R$)"
          value={custosMaoDeObra}
          onChange={(e) => setCustosMaoDeObra(e.target.value)}
          required
        />
        <AreaTexto
          placeholder="Resultado da Colheita"
          value={resultadoColheita}
          onChange={(e) => setResultadoColheita(e.target.value)}
          required
        />
        <Botao type="submit">Salvar Detalhes</Botao>
      </Formulario>
    </Container>
  );
};

export default CadastroCulturas;