import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="" alt="MV Player" />
      </div>
      <nav className="nav">
        <ul>
          <li>Shows</li>
          <li>Movies</li>
          <li>New & Hot</li>
          <li>DistroTV</li>
          <li>MV VDesi</li>
          <li>Others</li>
        </ul>
      </nav>
      <div className="btn-login">
        <button>Login</button>
      </div>
    </header>
  );
};

export default Header;
