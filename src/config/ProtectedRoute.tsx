import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from './authUtils';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const location = useLocation();
    const token = getAuthToken();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            localStorage.removeItem('token');
            alert("Login expirado, faça novamente o login");
            setRedirect(true);
        }, 60000 * 60);

        return () => clearTimeout(timeoutId);
    }, []);

    if (redirect) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (!token) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return element;
};

export default ProtectedRoute;
