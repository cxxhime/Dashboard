import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="custom-header">
      <div className="header-content">
        <h2 className="logo">📌 Candidatures</h2>
        <nav className="nav-links">
          <Link to="/" className="nav-btn">Accueil</Link>
          <Link to="/add" className="nav-btn primary">+ Ajouter</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;