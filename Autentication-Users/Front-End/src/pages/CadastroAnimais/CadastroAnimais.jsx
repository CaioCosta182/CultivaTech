import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Formulario, Campo, Botao, ListaAnimais, AnimalItem, BotaoExcluir } from './styles';

const CadastroAnimais = () => {
  const navegar = useNavigate();

  // Estados para os campos do formulário
  const [tamanhoArea, setTamanhoArea] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [custoRacao, setCustoRacao] = useState('');
  const [custoSilagem, setCustoSilagem] = useState('');
  const [custoMaoDeObra, setCustoMaoDeObra] = useState('');
  const [custoMedicamentos, setCustoMedicamentos] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');

  // Estado para armazenar a lista de animais cadastrados
  const [animais, setAnimais] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cria um novo animal com os dados do formulário
    const novoAnimal = {
      tamanhoArea,
      especie,
      raca,
      idade,
      peso,
      quantidade,
      custoRacao,
      custoSilagem,
      custoMaoDeObra,
      custoMedicamentos,
      precoCompra,
      precoVenda,
    };

    // Adiciona o novo animal à lista de animais
    setAnimais([...animais, novoAnimal]);

    // Limpa os campos do formulário
    setTamanhoArea('');
    setEspecie('');
    setRaca('');
    setIdade('');
    setPeso('');
    setQuantidade('');
    setCustoRacao('');
    setCustoSilagem('');
    setCustoMaoDeObra('');
    setCustoMedicamentos('');
    setPrecoCompra('');
    setPrecoVenda('');
  };

  const handleExcluirAnimal = (index) => {
    // Remove o animal da lista pelo índice
    const novaListaAnimais = animais.filter((_, i) => i !== index);
    setAnimais(novaListaAnimais);
  };

  return (
    <Container>
      <h1>Cadastrar Animais</h1>
      <Formulario onSubmit={handleSubmit}>
        <Campo
          type="number"
          placeholder="Tamanho da Área (ha)"
          value={tamanhoArea}
          onChange={(e) => setTamanhoArea(e.target.value)}
          required
        />
        <Campo
          type="text"
          placeholder="Espécie do Animal"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
        />
        <Campo
          type="text"
          placeholder="Raça do Animal"
          value={especie}
          onChange={(e) => setRaca(e.target.value)}
          required
        />
        <Campo
          type="number"
          placeholder="Idade (meses)"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />
         <Campo
          type="number"
          placeholder="Peso (kg)"
          value={idade}
          onChange={(e) => setPeso(e.target.value)}
          required
        />
        <Campo
          type="number"
          placeholder="Quantidade de Animais"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <Campo
          type="number"
          placeholder="Custo com Ração/mês (R$)"
          value={custoRacao}
          onChange={(e) => setCustoRacao(e.target.value)}
        />
        <Campo
          type="number"
          placeholder="Custo com Silagem/mês (R$)"
          value={custoSilagem}
          onChange={(e) => setCustoSilagem(e.target.value)}
        />
        <Campo
          type="number"
          placeholder="Custo com Mão de Obra/mês (R$)"
          value={custoMaoDeObra}
          onChange={(e) => setCustoMaoDeObra(e.target.value)}
        />
        <Campo
          type="number"
          placeholder="Custo com Medicamentos/mês (R$)"
          value={custoMedicamentos}
          onChange={(e) => setCustoMedicamentos(e.target.value)}
        />
        <Campo
          type="number"
          placeholder="Preço de Compra por Animal (R$)"
          value={precoCompra}
          onChange={(e) => setPrecoCompra(e.target.value)}
        />
        <Campo
          type="number"
          placeholder="Preço de Venda por Animal (R$)"
          value={precoVenda}
          onChange={(e) => setPrecoVenda(e.target.value)}
        />
        <Botao type="submit">Adicionar Animal</Botao>
      </Formulario>

      <ListaAnimais>
        <h2>Animais Cadastrados</h2>
        {animais.map((animal, index) => (
          <AnimalItem key={index}>
            <div>
              <p><strong>Espécie:</strong> {animal.especie}</p>
              <p><strong>Quantidade:</strong> {animal.quantidade}</p>
              <p><strong>Idade:</strong> {animal.idade} meses</p>
              <p><strong>Peso:</strong> {animal.peso} Kg</p>
            </div>
            <BotaoExcluir onClick={() => handleExcluirAnimal(index)}>
              Excluir
            </BotaoExcluir>
          </AnimalItem>
        ))}
      </ListaAnimais>
    </Container>
  );
};

export default CadastroAnimais;