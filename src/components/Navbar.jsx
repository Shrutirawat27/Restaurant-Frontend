import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const navLinkClass = ({ isActive }) =>
    `block py-2 md:inline-block md:py-0 px-4 hover:text-green-600 transition ${
      isActive ? 'text-green-600' : ''
    }`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMenuOpen(false);
    navigate('/admin/login');
  };

  return (
    <nav className="bg-white text-gray-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="Zaika Logo" className="h-10 w-auto" />
        </NavLink>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Links */}
        <ul
          className={`md:flex md:items-center absolute md:static left-0 top-[64px] w-full md:w-auto bg-white md:bg-transparent md:shadow-none shadow-md z-40 transition-all duration-300 ${
            menuOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <li>
            <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </li>

          {/* Logout for admin */}
          {token && (
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-red-600 hover:text-red-800 font-semibold"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
