import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-header">
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BrainCircuit size={28} color="var(--primary)" />
        <h1 style={{ margin: 0 }}>ProQuiz</h1>
      </div>
      <nav>
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/create" 
          className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
        >
          Create Quiz
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
