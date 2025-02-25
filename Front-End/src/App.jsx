import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CadastroPropriedade from './pages/CadastroPropriedade/CadastroPropriedade';
import CadastroCulturas from './pages/CadastroCulturas/CadastroCulturas';
import CadastroAnimais from './pages/CadastroAnimais/CadastroAnimais';
import MinhasPropriedades from './pages/MinhasPropriedades/MinhasPropriedades'; 
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeContext } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';


function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <Router>
      <GlobalStyles theme={theme} />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/minhas-propriedades" element={<MinhasPropriedades />} />
        <Route path="/cadastro-propriedade" element={<CadastroPropriedade />} />
        <Route path="/cadastro-culturas" element={<CadastroCulturas />} /> 
        <Route path="/cadastro-animais" element={<CadastroAnimais />} /> 
      </Routes>
    </Router>
  );
}

export default App;