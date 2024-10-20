import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // State to manage loading
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        setLoading(true); // Start loading
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUserData = await authService.getCurrentUser();
                if (currentUserData) {
                    dispatch(login(currentUserData));
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
                    Sign up to create an account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 dark:text-red-400 mt-4 text-center">{error}</p>
                )}
                
                {loading && (
                    <p className="text-blue-500 dark:text-blue-400 mt-4 text-center">Creating account...</p>
                )}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", { required: true })}
                            className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be valid",
                                },
                            })}
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
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
