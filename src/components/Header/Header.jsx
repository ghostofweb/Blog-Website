import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="bg-gray-800 py-4 shadow-md">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>

          {/* Hamburger Button for Mobile */}
          <button
            className="text-white lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-4 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded"
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
          </ul>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <ul className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 p-4 space-y-4">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className="block w-full text-white hover:text-gray-300 transition duration-300 px-4 py-2 rounded"
                      onClick={() => {
                        navigate(item.slug);
                        setIsMobileMenuOpen(false); // Close menu after navigation
                      }}
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
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
