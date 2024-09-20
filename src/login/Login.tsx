import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function getApiUrl(): string | null {
    return localStorage.getItem('API_URL');
}

const Login: React.FC = () => {
    const url = getApiUrl();
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
                `${url}/auth/login`,
                { login, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("Dados da resposta:", response.data);
            const { token } = response.data;
            localStorage.setItem('token', token);
            window.location.href = '/cardapio';
        } catch (error: any) {
            console.error('Erro ao fazer login:', error.response?.data || error.message);
            if (axios.isAxiosError(error)) {
                console.error('Resposta de erro do Axios:', error.response);
                setError('Usuário ou senha incorretos. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Bem-vindo ao meu projeto!</h1>
            <div className='login-body'>
                <div className='login-content'>
                    <h2><a href='/cardapio-cliente'>Acesse o cardápio como cliente</a></h2>
                    <p>
                        <strong>Atenção!</strong> A opção de registrar novos funcionários na tela inicial é apenas para fins de estudo; em um cenário real, essa prática não é recomendada.
                    </p>
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
                    
                </div>

                <div className='login-content'>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <p>
                            Para acessar o cardápio como funcionário e realizar alterações nos dados, é necessário efetuar login.
                        </p>
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
                            {error && <p style={{ color: '#d9534f' }} className="error-message">{error}</p>}
                        </div>
                        <button className='btn-logar' type="submit" disabled={loading}>
                            {loading ? 'Entrando...' : 'Login'}
                        </button>
                        <button className='btn-logar'>Registre-se</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
