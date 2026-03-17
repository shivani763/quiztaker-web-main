import React, { useState, useEffect } from 'react';
import { csQuizzes as initialQuizzes } from './data';

const App = () => {
  const [csQuizzes, setCsQuizzes] = useState(initialQuizzes);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [customQuestionsDraft, setCustomQuestionsDraft] = useState([]);

  // Form states
  const [form, setForm] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correct: '',
    explanation: ''
  });

  const icons = {
    "Operating Systems": "💻",
    "Computer Networks": "🌐",
    "Algorithms & Data Structures": "🧮",
    "DBMS": "🗄️",
    "Compiler Design": "⚙️",
    "Computer Organization and Architecture": "🏗️",
    "Software Engineering": "📐",
    "Theory of Computation": "🧠",
    "Basics of Computer": "🖥️"
  };

  const startQuiz = (subject, questions) => {
    setCurrentCategory(subject);
    setCurrentQuestions([...questions]);
    setCurrentQuestionIndex(0);
    setUserScore(0);
    setIsAnswered(false);
    setSelectedIndex(null);
    setCurrentView('quiz');
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    setIsAnswered(true);
    if (index === currentQuestions[currentQuestionIndex].correct) {
      setUserScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedIndex(null);
    } else {
      setCurrentView('result');
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const addQuestionToDraft = () => {
    if (!form.question || !form.option1 || !form.option2 || !form.option3 || !form.option4 || !form.correct) {
      alert("Please fill out all required fields.");
      return;
    }
    const newQuestion = {
      question: form.question,
      options: [form.option1, form.option2, form.option3, form.option4],
      correct: parseInt(form.correct),
      explanation: form.explanation || "Custom explanation not provided."
    };
    setCustomQuestionsDraft(prev => [...prev, newQuestion]);
    setForm({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correct: '',
      explanation: ''
    });
  };

  const publishCustomQuiz = () => {
    if (customQuestionsDraft.length === 0) {
      alert("Please add at least one question to the draft before publishing.");
      return;
    }
    const quizName = `Custom Quiz ${Object.keys(csQuizzes).length + 1}`;
    setCsQuizzes(prev => ({ ...prev, [quizName]: [...customQuestionsDraft] }));
    setCustomQuestionsDraft([]);
    alert(`${quizName} has been successfully created!`);
    setCurrentView('dashboard');
  };

  const progressPercent = currentQuestions.length > 0 
    ? (currentQuestionIndex / currentQuestions.length) * 100 
    : 0;

  return (
    <div className="app-container">
      <header className="glass-header">
        <div className="logo">
          <h1>ProQuiz</h1>
        </div>
        <nav>
          <button 
            className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${currentView === 'create' ? 'active' : ''}`}
            onClick={() => setCurrentView('create')}
          >
            Create Quiz
          </button>
        </nav>
      </header>

      <main>
        {currentView === 'dashboard' && (
          <section id="dashboard" className="view active-view">
            <div className="hero">
              <h2>Master Computer Science</h2>
              <p>Test your knowledge with our comprehensively explained quizzes. Immediate feedback backed by Wikipedia accuracy.</p>
            </div>
            <h3 className="section-title">Select a Subject</h3>
            <div className="categories-grid">
              {Object.entries(csQuizzes).map(([subject, questions]) => (
                <div key={subject} className="category-card" onClick={() => startQuiz(subject, questions)}>
                  <div className="category-icon">{icons[subject] || "📝"}</div>
                  <div className="category-info">
                    <h4>{subject}</h4>
                    <p>{questions.length} Questions</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentView === 'quiz' && currentQuestions.length > 0 && (
          <section id="quiz-interface" className="view active-view">
            <div className="quiz-header">
              <h2>{currentCategory}</h2>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className="progress-text">Question {currentQuestionIndex + 1} of {currentQuestions.length}</p>
            </div>

            <div className="question-container glass-panel">
              <h3>{currentQuestions[currentQuestionIndex].question}</h3>
              <div className="options-grid">
                {currentQuestions[currentQuestionIndex].options.map((opt, i) => {
                  const idx = i + 1;
                  let className = "option-btn";
                  if (isAnswered) {
                    if (idx === currentQuestions[currentQuestionIndex].correct) className += " correct";
                    else if (idx === selectedIndex) className += " wrong";
                  }
                  return (
                    <button 
                      key={i} 
                      className={className}
                      onClick={() => handleAnswer(idx)}
                      disabled={isAnswered}
                    >
                      <span>{opt}</span>
                      <span className="icon">
                        {isAnswered && idx === currentQuestions[currentQuestionIndex].correct && '✓'}
                        {isAnswered && idx === selectedIndex && idx !== currentQuestions[currentQuestionIndex].correct && '✗'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="explanation-box">
                  <div className="explanation-header">
                    <span className={`status-badge ${selectedIndex === currentQuestions[currentQuestionIndex].correct ? 'correct' : 'wrong'}`}>
                      {selectedIndex === currentQuestions[currentQuestionIndex].correct ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: currentQuestions[currentQuestionIndex].explanation }}></p>
                  <button className="primary-btn" onClick={nextQuestion}>
                    {currentQuestionIndex === currentQuestions.length - 1 ? 'See Results' : 'Next Question'} <span className="arrow">→</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {currentView === 'result' && (
          <section id="result-view" className="view active-view">
            <div className="result-card glass-panel">
              <h2>Quiz Completed!</h2>
              <div className="score-circle" style={{ '--percentage': (userScore / currentQuestions.length) * 100 }}>
                <span id="final-score">{userScore}/{currentQuestions.length}</span>
              </div>
              <p id="score-message">
                {(userScore / currentQuestions.length) === 1 ? "Perfect! You're an expert." : 
                 (userScore / currentQuestions.length) >= 0.75 ? "Great job! Keep it up." :
                 (userScore / currentQuestions.length) >= 0.5 ? "Good effort, but lots to learn!" :
                 "Time to hit the books!"}
              </p>
              <div className="result-actions">
                <button className="primary-btn" onClick={() => setCurrentView('dashboard')}>Back to Dashboard</button>
              </div>
            </div>
          </section>
        )}

        {currentView === 'create' && (
          <section id="create-view" className="view active-view">
            <div className="glass-panel form-panel">
              <h2>Create Custom Quiz</h2>
              <form id="quiz-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                  <label htmlFor="question">Question Text</label>
                  <input type="text" id="question" value={form.question} onChange={handleFormChange} required placeholder="Type your question here..." />
                </div>
                <div className="options-inputs">
                  <div className="input-group">
                    <label htmlFor="option1">Option 1</label>
                    <input type="text" id="option1" value={form.option1} onChange={handleFormChange} required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="option2">Option 2</label>
                    <input type="text" id="option2" value={form.option2} onChange={handleFormChange} required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="option3">Option 3</label>
                    <input type="text" id="option3" value={form.option3} onChange={handleFormChange} required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="option4">Option 4</label>
                    <input type="text" id="option4" value={form.option4} onChange={handleFormChange} required />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="correct">Correct Answer (1-4)</label>
                  <input type="number" id="correct" min="1" max="4" value={form.correct} onChange={handleFormChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="explanation">Explanation & Source (Optional)</label>
                  <textarea id="explanation" rows="3" value={form.explanation} onChange={handleFormChange} placeholder="Provide background info and citation (e.g., 'Source: Google/Wikipedia')"></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="secondary-btn" onClick={addQuestionToDraft}>Add to Draft</button>
                  <button type="button" className="primary-btn" onClick={publishCustomQuiz}>Publish Quiz</button>
                </div>
              </form>
              <div className="draft-questions">
                <h3>Draft Questions (<span>{customQuestionsDraft.length}</span>)</h3>
                <ul id="question-list">
                  {customQuestionsDraft.map((q, i) => (
                    <li key={i}>
                      <span>Q{i + 1}: {q.question}</span> <span style={{ color: 'var(--success)' }}>✓ Added</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
