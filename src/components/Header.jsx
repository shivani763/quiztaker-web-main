import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrainCircuit, UserCircle, LogIn, UserPlus } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuthContext();

  return (
    <header className="glass-header">
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BrainCircuit size={28} color="var(--primary)" />
        <h1 style={{ margin: 0 }}>ProQuiz</h1>
      </div>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
        >
          Dashboard
        </NavLink>
        
        {user ? (
          <NavLink 
            to="/profile" 
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 'bold' }}
          >
            <UserCircle size={20} /> My Profile
          </NavLink>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <NavLink to="/login" className="nav-btn" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
              <LogIn size={16} /> Login
            </NavLink>
            <NavLink to="/signup" className="primary-btn" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
              <UserPlus size={16} /> Sign Up
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
