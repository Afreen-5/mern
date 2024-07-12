import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen]  = useState(false);
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


  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <header className="p-4 flex justify-between items-center">
      <div className="text-2xl font-bold flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          {/* Adding Boxicons home icon */}
          <span>MX Player</span>
        </Link>
      </div>
      <nav className="flex space-x-4">
      <i className='bx bxs-home text-blue-500' style={{ fontSize: '1.5em' }} onClick={handleHomeClick}></i>
        <Link to="/" className="mr-4">Movies</Link>
        <Link to="/about" className="mr-4">About</Link>
        <Link to="/contact" className="mr-4">Contact</Link>
        {!isLoggedIn ? (
            <Link to="/login" className="mr-4" onClick={ ()=> setIsLoggedIn(true) }>Login</Link>
            ) : (
            <div className="relative">
              <button  onClick={toggleMenu} className="mr4">
                <i className='bx bx-menu' style={{ fontSize: '1.5em' }}></i>
              </button>
              {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
              >
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  My Profile
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Settings
                </Link>
                <Link to="/notifications" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Notifications
                </Link>
                <Link to="/favorites" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Favorites
                </Link>
                <Link to="/watch-later" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Watch Later
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
               )}
            </div>
        )
      }
      </nav>
    </header>
  );
};

export default Header;
