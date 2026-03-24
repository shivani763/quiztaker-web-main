import React from 'react';
import { useQuizContext } from '../context/QuizContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const QuizInterface = () => {
  const { activeSession, handleAnswer, nextQuestion } = useQuizContext();
  const navigate = useNavigate();

  // Redirect if no active session
  if (!activeSession.subject) {
    return <Navigate to="/" replace />;
  }

  // Redirect to results if finished
  if (activeSession.isFinished) {
    return <Navigate to="/result" replace />;
  }

  const currentQ = activeSession.questions[activeSession.currentIndex];
  const progressPercent = activeSession.questions.length > 0 
    ? (activeSession.currentIndex / activeSession.questions.length) * 100 
    : 0;

  return (
    <section id="quiz-interface" className="view active-view">
      <div className="quiz-header">
        <h2>{activeSession.subject}</h2>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="progress-text">Question {activeSession.currentIndex + 1} of {activeSession.questions.length}</p>
      </div>

      <div className="question-container glass-panel">
        <h3>{currentQ.question}</h3>
        <div className="options-grid">
          {currentQ.options.map((opt, i) => {
            const idx = i + 1;
            let className = "option-btn";
            if (activeSession.isAnswered) {
              if (idx === currentQ.correct) className += " correct";
              else if (idx === activeSession.selectedIndex) className += " wrong";
            }
            return (
              <button 
                key={i} 
                className={className}
                onClick={() => handleAnswer(idx)}
                disabled={activeSession.isAnswered}
              >
                <span>{opt}</span>
                <span className="icon">
                  {activeSession.isAnswered && idx === currentQ.correct && <CheckCircle2 size={20} />}
                  {activeSession.isAnswered && idx === activeSession.selectedIndex && idx !== currentQ.correct && <XCircle size={20} />}
                </span>
              </button>
            );
          })}
        </div>

        {activeSession.isAnswered && (
          <div className="explanation-box">
            <div className="explanation-header">
              <span className={`status-badge ${activeSession.selectedIndex === currentQ.correct ? 'correct' : 'wrong'}`}>
                {activeSession.selectedIndex === currentQ.correct ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: currentQ.explanation }}></p>
            <button className="primary-btn" onClick={nextQuestion}>
              {activeSession.currentIndex === activeSession.questions.length - 1 ? 'See Results' : 'Next Question'}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizInterface;
