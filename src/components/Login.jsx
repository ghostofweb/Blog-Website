import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // State to manage loading

    const login = async (data) => {
        setError("");
        setLoading(true); // Start loading
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                }
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-300 dark:border-gray-700 shadow-lg transition-colors duration-300">
                <div className="mb-4 flex justify-center">
                    <Logo width="100%" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
                    Welcome back!
                </h2>
                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
                    Don't have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 dark:text-red-400 mt-4 text-center">{error}</p>
                )}
                
                {loading && (
                    <p className="text-blue-500 dark:text-blue-400 mt-4 text-center">Logging in...</p>
                )}

                <form onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", { required: true })}
                            className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                            className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        />
                        <Button
                            type="submit"
                            className={`w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
