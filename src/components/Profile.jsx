import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { UserCircle, Trophy, Target, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, getProgress, logout } = useAuthContext();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const progress = getProgress();
  const subjects = Object.keys(progress);

  return (
    <section className="view active-view" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <UserCircle size={64} color="var(--primary)" />
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{user}</h2>
            <p style={{ color: 'var(--text-muted)' }}>Student Profile</p>
          </div>
        </div>
        <button className="secondary-btn" onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--error)', color: 'var(--error)' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <h3 className="section-title">Knowledge Status</h3>
      
      {subjects.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <Target size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ marginBottom: '1rem' }}>No Data Yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You haven't taken any quizzes yet. Start learning to build your profile!</p>
          <Link to="/" className="primary-btn" style={{ textDecoration: 'none' }}>Go to Dashboard</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {subjects.map(subject => {
            const data = progress[subject];
            const percentage = Math.round((data.highscore / data.total) * 100) || 0;
            
            return (
              <div key={subject} className="glass-panel" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>{subject}</h4>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                    <Trophy size={20} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{data.highscore}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ {data.total}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Attempts</div>
                    <div style={{ fontWeight: 'bold' }}>{data.attempts}</div>
                  </div>
                </div>

                <div className="progress-container" style={{ height: '6px', marginBottom: '0.5rem' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${percentage}%`,
                      background: percentage >= 80 ? 'var(--success)' : percentage >= 50 ? 'var(--primary)' : 'var(--error)'
                    }}
                  ></div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.85rem', fontWeight: 'bold' }}>{percentage}% Mastery</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Profile;
