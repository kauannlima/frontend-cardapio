import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export function getApiUrl(): string | null {
    return localStorage.getItem('API_URL');
}

console.log(getApiUrl());
const Register: React.FC = () => {
    const url = getApiUrl();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Valor padrão definido
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${url}/auth/register`, {
                login,
                password,
                role
            });
            window.location.href = '/';
            console.log("Response: "+ response)           
        } catch (error: any) {
            setError('O nome de usuário já está em uso.');
        } finally {
            setLoading(false);
           
        }
    };
    

    return (
        <div className='register-body'>
            <div className='register-content'>
                <h2>Registrar Novo Funcionário</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="login">Nome de Usuário:</label>
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

                    <div>
                        <label>Tipo de Usuário:</label>
                        <select 
                            id='role'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="ADMIN">Administrador</option>
                            <option value="USER">Operador</option>
                        </select>
                        <div className='advise'> 
                            <p>Apenas usuários com perfil de "Administrador" podem realizar exclusões no cardápio.</p>
                        </div>
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button className='btn-reg' type="submit" disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
