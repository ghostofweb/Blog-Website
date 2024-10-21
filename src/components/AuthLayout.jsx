import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const isPostPath = location.pathname.startsWith('/post/');
        
        if (isPostPath && !authentication) {
            setLoader(false); // Allow access to the post without authentication
        } else if (authentication && !authStatus) {
            navigate('/login');
        } else if (!authentication && authStatus) {
            navigate('/');
        } else {
            setLoader(false); // Stop loading when authentication is as expected
        }
    }, [authStatus, navigate, authentication, location.pathname]);
    

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
