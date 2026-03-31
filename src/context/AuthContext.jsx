import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Fake backend db using local storage for portfolio purposes
  const [usersDb, setUsersDb] = useState(() => {
    const saved = localStorage.getItem('proquiz_users');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [progressDb, setProgressDb] = useState(() => {
    const saved = localStorage.getItem('proquiz_progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    // Check if there is an active session in local storage
    const activeUser = localStorage.getItem('proquiz_active_user');
    if (activeUser && usersDb[activeUser]) {
      setUser(activeUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('proquiz_users', JSON.stringify(usersDb));
  }, [usersDb]);

  useEffect(() => {
    localStorage.setItem('proquiz_progress', JSON.stringify(progressDb));
  }, [progressDb]);

  const login = (username, password) => {
    if (usersDb[username] && usersDb[username] === password) {
      setUser(username);
      localStorage.setItem('proquiz_active_user', username);
      return true;
    }
    return false;
  };

  const signup = (username, password) => {
    if (usersDb[username]) {
      return false; // User exists
    }
    setUsersDb(prev => ({ ...prev, [username]: password }));
    if (!progressDb[username]) {
      setProgressDb(prev => ({ ...prev, [username]: {} }));
    }
    setUser(username);
    localStorage.setItem('proquiz_active_user', username);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('proquiz_active_user');
  };

  const saveScore = (subject, score, total) => {
    if (!user) return;
    
    setProgressDb(prev => {
      const userProg = prev[user] || {};
      const subjectProg = userProg[subject] || { highscore: 0, total: total, attempts: 0 };
      
      return {
        ...prev,
        [user]: {
          ...userProg,
          [subject]: {
            highscore: Math.max(subjectProg.highscore, score),
            total: total,
            attempts: subjectProg.attempts + 1
          }
        }
      };
    });
  };

  const getProgress = () => {
    if (!user) return {};
    return progressDb[user] || {};
  };

  const value = {
    user,
    login,
    signup,
    logout,
    saveScore,
    getProgress
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
