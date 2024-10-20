import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        // Check if the current path is a post URL
        const isPostPath = location.pathname.startsWith('/post/');

        // If the current path is a post and authentication is required, allow access
        if (isPostPath && !authentication) {
            setLoader(false); // Allow access to post even if not authenticated
        } else if (authentication && !authStatus) {
            // User should be authenticated; redirect to login
            navigate('/login');
        } else if (!authentication && authStatus) {
            // User should not be authenticated; redirect to home
            navigate('/');
        } else {
            // If we reach here, authentication state is as expected
            setLoader(false); // Stop loading
        }
    }, [authStatus, navigate, authentication, location.pathname]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
