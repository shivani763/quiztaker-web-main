import React from 'react';
import { useQuizContext } from '../context/QuizContext';
import { useAuthContext } from '../context/AuthContext';
import { BookOpen, CheckSquare, Layers, Code, Hash, Smartphone, BrainCircuit, Network, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getIconForSubject = (subject) => {
  const iconProps = { size: 32, className: "subject-icon" };
  const mapping = {
    "Operating Systems": <Layers {...iconProps} />,
    "Computer Networks": <Network {...iconProps} />,
    "Algorithms & Data Structures": <Hash {...iconProps} />,
    "DBMS": <Database {...iconProps} />,
    "Compiler Design": <Code {...iconProps} />,
    "Computer Organization and Architecture": <CheckSquare {...iconProps} />,
    "Software Engineering": <Smartphone {...iconProps} />,
    "Theory of Computation": <BrainCircuit {...iconProps} />,
    "Basics of Computer": <BookOpen {...iconProps} />
  };
  return mapping[subject] || <CheckSquare {...iconProps} />;
};

const Dashboard = () => {
  const { quizzes, startQuiz } = useQuizContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleStartQuiz = (subject) => {
    if (!user) {
      alert("Sign in or Create an account to take quizzes and track your progress!");
      navigate('/login');
      return;
    }
    startQuiz(subject);
    navigate('/quiz');
  };

  return (
    <section id="dashboard" className="view active-view">
      <div className="hero">
        <h2>Master Computer Science</h2>
        <p>Test your knowledge with comprehensively explained quizzes. Sign in to track your knowledge status and evaluate your expertise.</p>
        {!user && (
          <div style={{ marginTop: '1.5rem' }}>
            <button className="primary-btn" onClick={() => navigate('/signup')}>Start Tracking Progress</button>
          </div>
        )}
      </div>
      <h3 className="section-title">Select a Subject</h3>
      <div className="categories-grid">
        {Object.entries(quizzes).map(([subject, questions]) => (
          <div key={subject} className="category-card" onClick={() => handleStartQuiz(subject)}>
            <div className="category-icon-wrapper">
              {getIconForSubject(subject)}
            </div>
            <div className="category-info">
              <h4>{subject}</h4>
              <p>{questions.length} Questions</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
