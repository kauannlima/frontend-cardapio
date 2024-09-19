import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Login: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://backend-cardapio-5kjd.onrender.com/auth/login',
                { login, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log(response.data);
            const { token } = response.data;
            localStorage.setItem('token', token);
            window.location.href = '/cardapio'; 
        } catch (error: any) {
            console.error('Error logging in:', error.response?.data || error.message);
            setError('Falha no login. Por favor, verifique suas credenciais...');
        }
         finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Bem-vindo ao meu projeto: Cardápio Online</h1>
            <div className='login-body'>
                <div className='login-content'>
                    <h2>Sobre a Aplicação</h2>
                    <p>Cardápio Online é um sistema de gerenciamento de cardápios para lanchonetes e restaurantes, permitindo cadastro e visualização de produtos de forma fácil e eficiente.</p>
                    <div className='links'>
                        <a href='https://github.com/kauannlima/backend-cardapio' target='_blank' rel='noopener noreferrer'>
                            <FaGithub size={24} />
                            <span>Back-End</span>
                        </a>
                        <a href='https://github.com/kauannlima/frontend-cardapio' target='_blank' rel='noopener noreferrer'>
                            <FaGithub size={24} />
                            <span>Front-End</span>
                        </a>
                        <a href='https://www.linkedin.com/in/kauan-de-almeida-lima/' target='_blank' rel='noopener noreferrer'>
                            <FaLinkedin size={24} />
                            <span>LinkedIn</span>
                        </a>
                        <a href='mailto:kauanalmeidalima1405@gmail.com'>
                            <FaEnvelope size={24} />
                            <span>Email</span>
                        </a>
                    </div>
                    <a href='/register'>Registre-se</a>
                </div>

                <div className='login-content'>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="login">Usuário:</label>
                            <input
                                type="text"
                                id="login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="error-container">
                            {error && <p style={{ color: '#007bff ' }} className="error-message">{error}</p>}
                        </div>
                        <button className='btn-logar' type="submit" disabled={loading}>
                            {loading ? 'Entrando...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
