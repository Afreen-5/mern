import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">MX Player</Link>
      </div>
      <nav>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/about" className="mr-4">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
