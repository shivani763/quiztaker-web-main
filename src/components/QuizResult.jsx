import React, { useEffect } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { RefreshCcw, Home } from 'lucide-react';

const QuizResult = () => {
  const { activeSession, resetSession } = useQuizContext();
  const { saveScore } = useAuthContext();
  const navigate = useNavigate();

  const { score, questions, subject, isFinished } = activeSession;
  
  // Save score only if the quiz is finished and has questions
  useEffect(() => {
    if (isFinished && questions.length > 0) {
      saveScore(subject, score, questions.length);
    }
  }, [isFinished, questions.length, score, subject, saveScore]);

  if (!isFinished) {
    return <Navigate to="/" replace />;
  }

  const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;

  const handleReturnHome = () => {
    resetSession();
    navigate('/');
  };

  return (
    <section id="result-view" className="view active-view">
      <div className="result-card glass-panel">
        <h2>Quiz Completed!</h2>
        <div className="score-circle" style={{ '--percentage': percentage }}>
          <span id="final-score">{score}/{questions.length}</span>
        </div>
        <p id="score-message">
          {percentage === 100 ? "Perfect! You're an expert." : 
           percentage >= 75 ? "Great job! Keep it up." :
           percentage >= 50 ? "Good effort, but lots to learn!" :
           "Time to hit the books!"}
        </p>
        <div className="result-actions" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="primary-btn" onClick={handleReturnHome}>
            <Home size={18} /> Back to Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizResult;
