import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Home
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/create" className="navbar-link">
                            Create Post
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/signup" className="navbar-link">
                            Signup
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="navbar-link">
                            Login
                        </Link>
                    </li>


                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
