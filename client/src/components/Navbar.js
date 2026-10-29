import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
 
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
 
  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };
 
  const isActive = (path) => location.pathname === path;
 
  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`text-sm font-medium transition-colors ${
        isActive(to) ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
      }`}
    >
      {label}
    </Link>
  );
 
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-display font-bold text-primary-700 text-xl">AgroConnect</span>
        </Link>
 
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLink('/', 'Home')}
          {navLink('/marketplace', 'Marketplace')}
          {navLink('/fertilizer', 'Fertilizer Guide')}
          {navLink('/chatbot', 'KrishiBot')}
          {navLink('/contact', 'Contact')}
          {user?.role === 'farmer' && navLink('/dashboard', 'Dashboard')}
        </div>
 
        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-500">
                Hi, <strong>{user.name.split(' ')[0]}</strong>
                <span className={`ml-1 badge ${user.role === 'farmer' ? 'bg-primary-100 text-primary-700' : 'bg-blue-100 text-blue-700'}`}>
                  {user.role}
                </span>
              </span>
              <button onClick={handleLogout} className="btn-outline text-sm py-1.5 px-4">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-sm py-1.5 px-4">Login</Link>
              <Link to="/register" className="btn-primary text-sm py-1.5 px-4">Register</Link>
            </>
          )}
        </div>
 
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
 
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
          {navLink('/', 'Home')}
          {navLink('/marketplace', 'Marketplace')}
          {navLink('/fertilizer', 'Fertilizer Guide')}
          {navLink('/chatbot', 'KrishiBot')}
          {navLink('/contact', 'Contact')}
          {user?.role === 'farmer' && navLink('/dashboard', 'Dashboard')}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {user ? (
              <>
                <span className="text-sm text-gray-600">Logged in as <strong>{user.name}</strong> ({user.role})</span>
                <button onClick={handleLogout} className="btn-outline w-full justify-center text-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline w-full justify-center text-sm">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center text-sm">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}