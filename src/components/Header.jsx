import React from 'react';
import { Link } from 'react-router-dom'; // Used for navigation
import './Header.css'; // Import the CSS for this component

function Header() {
    return (
        <header className="header-container">
            <div className="logo">
                {/* Link to the home page */}
                <Link to="/">MedXmedify</Link>
            </div>
            <nav className="main-nav">
                <ul>
                    {/* Navigation links as per requirements */}
                    <li><Link to="/find-doctors">Find Doctors</Link></li>
                    <li><Link to="/hospitals">Hospitals</Link></li>
                    <li><Link to="/medicines">Medicines</Link></li>
                    {/* Crucial: Link to the My Bookings page with the exact path */}
                    <li><Link to="/my-bookings">My Bookings</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
