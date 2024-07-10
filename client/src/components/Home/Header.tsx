import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

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
        <Link to="/login" className="mr-4">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
