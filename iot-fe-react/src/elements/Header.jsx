// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import '../style/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <FaReact size={40} />
                <span>MyApp</span>
            </div>
            <nav className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/data">Data Sensor</Link>
                <Link to="/action">Action History</Link>
                <Link to="/profile">Profile</Link>
            </nav>
        </header>
    );
};

export default Header;
