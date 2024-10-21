import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'; // Make sure to install heroicons

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Regular expression for name validation
    const nameRegex = /^[a-zA-Z0-9_ ]+$/;
 // Allow letters, numbers, and underscores
    const badWords = ['badword1', 'badword2']; // Add your bad words here

    const validateName = (name) => {
        return nameRegex.test(name) && !badWords.some(badWord => name.toLowerCase().includes(badWord));
    };

    // Regular expression for email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{9,255}$/;

    const create = async (data) => {
        setError("");
        setLoading(true);
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
            setLoading(false);
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
                            {...register("name", {
                                required: "Full Name is required", // Custom error message
                                validate: validateName,
                            })}
                            className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            error={errors.name?.message} // Pass error message here
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required", // Custom error message
                                validate: {
                                    matchPattern: (value) =>
                                        emailRegex.test(value) || "Email address must be valid",
                                },
                            })}
                            className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            error={errors.email?.message} // Pass error message here
                        />
                        <div className="relative">
                            <Input
                                label="Password: "
                                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required", // Custom error message
                                    validate: {
                                        matchPattern: (value) =>
                                            passwordRegex.test(value) || "Password must be between 9 to 255 characters and include at least one uppercase letter, one lowercase letter, and one number.",
                                    },
                                })}
                                className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 pr-10" // Added padding to the right for the icon
                                error={errors.password?.message} // Pass error message here
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500" // Centered vertically
                            >
                                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>
                        <Button
                            type="submit"
                            className={`w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
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
