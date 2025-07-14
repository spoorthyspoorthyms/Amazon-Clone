// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css'; 

function Navbar() {
  const { cart } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('authUser'));

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">🛒 Amazon Clone</Link>

        <div className="d-flex align-items-center gap-2 ms-auto flex-wrap">
          <Link to="/" className="nav-btn">🏠 Home</Link>

          <Link to="/cart" className="nav-btn position-relative">
            🛒 Cart
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/my-orders" className="nav-btn">📦 My Orders</Link>
              <Link to="/my-account" className="nav-btn">👤 My Account</Link>
              <button className="nav-btn" onClick={handleLogout}>🔓 Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn">🔐 Login</Link>
              <Link to="/register" className="nav-btn">📝 Register</Link>
            </>
          )}

          <button className="nav-btn" onClick={toggleTheme}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
