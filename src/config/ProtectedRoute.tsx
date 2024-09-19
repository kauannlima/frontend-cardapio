/* Modal para mostrar mensagem - Retirado da Internet e boa!!!*/
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from './authUtils';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const token = getAuthToken();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return element;
};

export default ProtectedRoute;
