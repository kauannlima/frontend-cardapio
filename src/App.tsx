import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cardapio from './cardapio/Cardapio';
import Login from './login/Login';
import Register from './login/Register';
import ProtectedRoute from './config/ProtectedRoute'; 


const API_URL = "https://backend-cardapio-5kjd.onrender.com";
const LOCAL_URL = "http://localhost:8080";
localStorage.setItem('API_URL', LOCAL_URL);

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
