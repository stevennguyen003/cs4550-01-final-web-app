import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header() {
    return (
        <header className="header-container">
            <Link to="/Home" className="header-logo">
                <h1 className="logo-text text-gradient">Senzu 🦇</h1>
            </Link>
            {/* we can add other nav links this section*/}
        </header>
    );
}

export default Header;
