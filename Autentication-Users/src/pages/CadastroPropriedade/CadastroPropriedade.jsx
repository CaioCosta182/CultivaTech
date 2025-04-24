import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Formulario, Campo, Botao } from './styles.js';


const CadastroPropriedade = () => {
  const navegar = useNavigate();

  // Estados para os campos do formulário
  const [nomePropriedade, setNomePropriedade] = useState('');
  const [tamanhoPropriedade, setTamanhoPropriedade] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dados da propriedade cadastrada
    const propriedade = {
      nomePropriedade,
      tamanhoPropriedade,
      endereco,
    };

    console.log('Propriedade cadastrada:', propriedade);

    // Redireciona para a página de detalhes da propriedade
    navegar('/detalhes-propriedade', { state: { propriedade } });
  };

  return (
    <Container>
      <h1>Cadastrar Propriedade</h1>
      <Formulario onSubmit={handleSubmit}>
        <Campo
          type="text"
          placeholder="Nome da Propriedade"
          value={nomePropriedade}
          onChange={(e) => setNomePropriedade(e.target.value)}
          required
        />
        <Campo
          type="number"
          placeholder="Tamanho da Propriedade (ha)"
          value={tamanhoPropriedade}
          onChange={(e) => setTamanhoPropriedade(e.target.value)}
          required
        />
        <Campo
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
        <Botao type="submit">Cadastrar</Botao>
        <Botao onClick={() => navegar('/minhas-propriedades')}>
        Minhas Propriedades
      </Botao>
      </Formulario>
      
    </Container>
  );
};

export default CadastroPropriedade;