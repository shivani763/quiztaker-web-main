import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import QuizInterface from './components/QuizInterface';
import QuizResult from './components/QuizResult';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import './index.css'; // Make sure the styles are imported

const App = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <BrowserRouter>
          <div className="app-container">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/quiz" element={<QuizInterface />} />
                <Route path="/result" element={<QuizResult />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
