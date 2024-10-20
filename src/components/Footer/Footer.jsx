import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="border-t-2 transition-colors duration-300 py-6  bg-gray-100 dark:bg-gray-900 border-t-gray-300 dark:border-t-gray-700 text-gray-800 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Logo width="100px" />
            <p className="text-sm ml-4">&copy; 2024 SyntaxPath</p>
          </div>
          <div className="flex flex-col md:flex-row">
            <ul className="flex space-x-6 mb-4 md:mb-0">
              <li>
                <Link
                  className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-400 transition duration-200"
                  to="mailto:sahiljeetsinghkalsi@gmail.com"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-400 transition duration-200"
                  to="https://github.com/ghostofweb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-400 transition duration-200"
                  to="https://www.linkedin.com/in/sahiljeet-singh-kalsi-085844244/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
