import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function getApiUrl(): string | null {
    return localStorage.getItem('API_URL');
}

const Registrar = () => {
    window.location.href = '/register';
};

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
                setError('Usuário ou senha inválidos. Por favor, tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Bem-vindo ao Projeto de Cardápio!</h1>
            <div className='login-body'>
                <div className='login-content'>
                    <h2><a href='/cardapio-cliente'>Visualizar cardápio como cliente</a></h2>
                    
                    <p><strong>Atenção! </strong> A funcionalidade de registrar novos funcionários na tela de login é destinada apenas para fins de teste e aprendizado, não devendo ser utilizada em um ambiente real. Recomenda-se que essa opção seja disponibilizada somente após um usuário do tipo "ADM" realizar o login.
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
                    <h2>Área de Funcionários</h2>
                    <form onSubmit={handleSubmit}>
                        
                        <div>
                            <label htmlFor="login">Usuário:</label>
                            <input
                                type="text"
                                id="login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                                placeholder="Digite seu nome de usuário"
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
                                placeholder="Digite sua senha"
                            />
                        <div className="error">
                        {error && <p  style={{ color: '#d9534f' }}>{error}</p>}
                        </div>
                        </div>
                        
                        <button className='btn-home' type="submit" disabled={loading}>
                            {loading ? 'Entrando...' : 'Login'}
                        </button>
                        <button type="button" className='btn-home' onClick={Registrar}>
                          Novo Funcionário
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
