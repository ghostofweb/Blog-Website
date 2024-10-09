import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        // Check if authentication is required
        if (authentication && !authStatus) {
            // User should be authenticated; redirect to login
            navigate('/login');
        } else if (!authentication && authStatus) {
            // User should not be authenticated; redirect to home
            navigate('/');
        } else {
            // If we reach here, authentication state is as expected
            setLoader(false); // Stop loading
        }
    }, [authStatus, navigate, authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
