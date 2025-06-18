// src/pages/Register/Register.jsx
import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  Input,
  Button,
  Select,
  ErrorMessage,
  InputGroup
} from './styles';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpfCnpj: '',
    phone: '',
    profileType: 'PF' // PF (Pessoa Física) ou PJ (Pessoa Jurídica)
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    if (!formData.cpfCnpj) {
      newErrors.cpfCnpj = formData.profileType === 'PF' ? 'CPF é obrigatório' : 'CNPJ é obrigatório';
    }
    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCpfCnpj = (value) => {
    if (formData.profileType === 'PF') {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cpfCnpj: formData.cpfCnpj.replace(/\D/g, ''),
        phone: formData.phone.replace(/\D/g, ''),
        profileType: formData.profileType
      });

      console.log('Registro bem-sucedido:', response.data);
      
      // Redirecionar para o login ou dashboard
    } catch (error) {
      console.error("Erro no registro:", error);

      if (error.response) {
        const msg = error.response.data?.error || 'Erro desconhecido no servidor.';
        setErrors({ email: msg });
      } else if (error.request) {
        alert("Não foi possível se conectar ao servidor. Verifique sua conexão.");
      } else {
        alert("Erro inesperado. Tente novamente.");
      }
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <h2>Cadastro de Usuário</h2>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <label>Tipo de Cadastro</label>
          <Select
            name="profileType"
            value={formData.profileType}
            onChange={handleChange}
          >
            <option value="PF">Pessoa Física</option>
            <option value="PJ">Pessoa Jurídica</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Input
            type="text"
            name="name"
            placeholder="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            hasError={!!errors.name}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            hasError={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            hasError={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Input
            type="text"
            name="cpfCnpj"
            placeholder={formData.profileType === 'PF' ? 'CPF' : 'CNPJ'}
            value={formData.cpfCnpj}
            onChange={(e) => {
              const formattedValue = formatCpfCnpj(e.target.value);
              setFormData(prev => ({
                ...prev,
                cpfCnpj: formattedValue
              }));
            }}
            maxLength={formData.profileType === 'PF' ? 14 : 18}
            hasError={!!errors.cpfCnpj}
          />
          {errors.cpfCnpj && <ErrorMessage>{errors.cpfCnpj}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={(e) => {
              const formattedValue = formatPhone(e.target.value);
              setFormData(prev => ({
                ...prev,
                phone: formattedValue
              }));
            }}
            maxLength={15}
            hasError={!!errors.phone}
          />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
        </InputGroup>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;