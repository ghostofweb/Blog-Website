import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={`py-4 shadow-md ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width="120px" />
            </Link>
          </div>
          <ul className="flex space-x-4 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className={`text-base font-semibold px-5 py-2 rounded-lg transition duration-300 ${
                      isDarkMode
                        ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-gray-400'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            <li>
              <button
                className={`px-5 py-2 rounded-full border text-base font-semibold transition duration-300 ${
                  isDarkMode
                    ? 'border-gray-300 text-gray-200 hover:bg-gray-700 hover:border-gray-500'
                    : 'border-gray-800 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
