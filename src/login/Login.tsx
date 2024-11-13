import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function getApiUrl(): string | null {
    return localStorage.getItem('API_URL');
}

const Registrar = () => {
    console.log(getApiUrl());
    window.location.href = '/register';
};

const CardapioCliente = () => {
    window.location.href = '/cardapio-cliente';
};

const Login: React.FC = () => {
    const url = getApiUrl();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isAppLoaded, setIsAppLoaded] = useState(false);
    const [mensagemDiv, setMensagemDiv] = useState('Carregando aplicação...');

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
            const { token, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
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

    useEffect(() => {
        const initializeApp = async () => {
            setMensagemDiv("Carregando aplicação...");
            
            try {
                const response = await axios.get(`${url}/connect`, { timeout: 5000 }); // Tempo limite de 5 segundos
                if (response.status === 200) {
                    setIsAppLoaded(true);
                } else {
                    throw new Error("Erro ao conectar com o backend.");
                }
            } catch (error) {
                console.error('Erro ao inicializar a aplicação: ', error);
                setMensagemDiv("Não foi possível carregar a aplicação. Aguarde alguns instantes e recarregue a página.");
                setIsAppLoaded(true);
            }
        };
    
        initializeApp();
    }, []);
    
      if (!isAppLoaded) {
        return <div className="loading-screen">{mensagemDiv}</div>;
      }

    return (
        <div>
            <div className='login-body'>
                <div className='login-content'>
                    <h2>Acesso de Clientes</h2>
                    <button type="button" className='btn-cardapio' onClick={CardapioCliente}>
                    Acessar cardápio do cliente
                        </button>
                    <p><strong>Aviso:</strong> A funcionalidade de registrar novos funcionários nesta tela é apenas para testes e aprendizado. Em um ambiente real, essa opção deve estar disponível somente após um usuário realizar login.</p>
                    
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
                    <h2>Acesso de Funcionários</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="login">Nome de Usuário:</label>
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
                            <div className="advise">
                                {error && <p style={{ color: '#d9534f' }}>{error}</p>}
                            </div>
                        </div>
                        
                        <button className='btn-home' type="submit" disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                        <button type="button" className='btn-home' onClick={Registrar}>
                            Novo Usuário
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
