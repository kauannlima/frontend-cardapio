import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const response = await axios.post('https://backend-cardapio-5kjd.onrender.com/auth/login', {
                login,
                password,
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            window.location.href = '/cardapio'; 
                 } catch (error: any) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <h1>Bom vindo ao meu projeto Cardapio Online</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login">Login:</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};
      
export default Login;