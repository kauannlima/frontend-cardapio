import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cardapio from './cardapio/Cardapio'
import Login from './login/Login'
import Register from './login/Register'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Defina suas rotas aqui */}
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/cardapio" element={<Cardapio/>} />
      </Routes>
    </Router>
  );
};

export default App;
