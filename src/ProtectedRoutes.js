import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ProtectedRoutes = ({ Component }) => {
    const navigate = useNavigate();
    useEffect(() => {
        let login = localStorage.getItem('login');
        if (!login) {
            navigate('/auth/login');
        }
    }, []);
    return (
        <>
            <Component />
        </>
    );
};

export default ProtectedRoutes;
