import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/accounts">Accounts</Link>
        <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
    </nav>
);

export default Navbar;
