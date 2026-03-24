import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import QuizInterface from './components/QuizInterface';
import QuizResult from './components/QuizResult';
import CreateQuiz from './components/CreateQuiz';
import './index.css'; // Make sure the styles are imported

const App = () => {
  return (
    <QuizProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/quiz" element={<QuizInterface />} />
              <Route path="/result" element={<QuizResult />} />
              <Route path="/create" element={<CreateQuiz />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QuizProvider>
  );
};

export default App;
