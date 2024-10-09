import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
    return (
        <section className="bg-gray-800 py-6 border-t-2 border-t-black">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <Logo width="100px" />
                        <p className="text-sm text-gray-600 ml-2">&copy; Copyright 2024</p>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <ul className="flex space-x-6 mb-4 md:mb-0">
                            <li>
                                <Link
                                    className="text-base font-medium text-white hover:text-gray-300 transition duration-200"
                                    to="mailto:sahiljeetsinghkalsi@gmail.com"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-base font-medium text-white hover:text-gray-300 transition duration-200"
                                    to="https://github.com/ghostofweb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-base font-medium text-white hover:text-gray-300 transition duration-200"
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
        </section>
    );
}

export default Footer;
