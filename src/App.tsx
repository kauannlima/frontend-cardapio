import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cardapio from './cardapio/Cardapio';
import Login from './login/Login';
import Register from './login/Register';
import ProtectedRoute from './config/ProtectedRoute'; 

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/cardapio"
                    element={<ProtectedRoute element={<Cardapio />} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
