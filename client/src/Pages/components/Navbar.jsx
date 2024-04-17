import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/" className="flex items-center">
                    Todo App
                    </Link>
                </div>
                <ul className="flex space-x-4">
                    <li className="hover:text-gray-300">
                        <Link to="/setting" className="flex items-center">
                            <FaCog className="mr-1" />
                            
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
