import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { Navigate } from 'react-router-dom';

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      Navigate("/")
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
