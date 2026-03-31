import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Signup = () => {
  const { signup } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (signup(form.username, form.password)) {
      navigate('/profile');
    } else {
      setError('Username already exists. Please choose another.');
    }
  };

  return (
    <section className="view active-view" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="glass-panel form-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
        {error && <div style={{ color: 'var(--error)', backgroundColor: 'var(--error-bg)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Choose Username</label>
            <input 
              type="text" 
              id="username" 
              required 
              value={form.username} 
              onChange={e => setForm({ ...form, username: e.target.value })} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Create Password</label>
            <input 
              type="password" 
              id="password" 
              required 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
            />
          </div>
          <div className="form-actions" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
              <UserPlus size={18} /> Sign Up
            </button>
          </div>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
