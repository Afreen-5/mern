import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <header
      className={`p-4 flex justify-between items-center bg-gradient-to-b from-black to-white-20% z-50 text-white ${
        location.pathname === '/' ? 'fixed top-0 left-0 w-full' : 'relative'
      }`}
    >
      <div className="text-2xl font-bold flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <span>MX Player</span>
        </Link>
      </div>
      <nav className="flex space-x-4 font-semibold">
        <i className='bx bxs-home text-blue-500' style={{ fontSize: '1.5em' }} onClick={handleHomeClick}></i>
        <Link to="/" className="mr-4 hidden md:block">Shows</Link>
        <Link to="/movies" className="mr-4 hidden md:block">Movies</Link>
        <Link to="/new" className="mr-4 hidden md:block">New & Hot</Link>
        <Link to="/login" className="mr-4 hidden md:block">Login</Link>
        <button onClick={toggleMenu} className="">
          <i className='bx bx-menu' style={{ fontSize: '1.5em' }}></i>
        </button>
        {isMenuOpen && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Profile</Link>
            <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
