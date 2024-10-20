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
                {isDarkMode ? (
                  // Moon SVG icon for Dark Mode
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 inline">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1M12 20v1M4.22 4.22l.707.707M18.36 18.36l.707.707M3 12h1m17 0h1M4.22 19.78l.707-.707M18.36 5.64l.707-.707" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a6 6 0 100-12 6 6 0 000 12zm0 0v1a6 6 0 01-6 6h-1a6 6 0 016-6zm0 0v-1a6 6 0 016-6h1a6 6 0 01-6 6z" />
                  </svg>
                ) : (
                  // Sun SVG icon for Light Mode
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 inline">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1M12 19v1m8.485-8.485l-.707.707M5.514 5.514l-.707.707M20 12h-1m-17 0H2m3.514 3.514l-.707-.707M19.485 5.514l-.707-.707" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
