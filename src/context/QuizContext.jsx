import React, { createContext, useState, useContext } from 'react';
import { csQuizzes as initialQuizzes } from '../data';

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState(() => {
    // Make a deep isolated copy to prevent reference mutation bugs
    return JSON.parse(JSON.stringify(initialQuizzes));
  });
  const [customDraft, setCustomDraft] = useState([]);

  // Active quiz session state
  const [activeSession, setActiveSession] = useState({
    subject: null,
    questions: [],
    currentIndex: 0,
    score: 0,
    isAnswered: false,
    selectedIndex: null,
    isFinished: false
  });

  const startQuiz = (subject) => {
    setActiveSession({
      subject,
      questions: [...quizzes[subject]], // Deep copy not fully needed here since we don't mutate questions
      currentIndex: 0,
      score: 0,
      isAnswered: false,
      selectedIndex: null,
      isFinished: false
    });
  };

  const handleAnswer = (index) => {
    if (activeSession.isAnswered || activeSession.isFinished) return;
    
    const isCorrect = index === activeSession.questions[activeSession.currentIndex].correct;
    
    setActiveSession(prev => ({
      ...prev,
      isAnswered: true,
      selectedIndex: index,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const nextQuestion = () => {
    setActiveSession(prev => {
      if (prev.currentIndex < prev.questions.length - 1) {
        return {
          ...prev,
          currentIndex: prev.currentIndex + 1,
          isAnswered: false,
          selectedIndex: null
        };
      } else {
        return {
          ...prev,
          isFinished: true
        };
      }
    });
  };

  const addCustomQuestion = (questionObj) => {
    setCustomDraft(prev => [...prev, questionObj]);
  };

  const publishCustomQuiz = (quizName) => {
    setQuizzes(prev => ({
      ...prev,
      [quizName]: [...customDraft]
    }));
    setCustomDraft([]);
  };

  const resetSession = () => {
    setActiveSession({
      subject: null,
      questions: [],
      currentIndex: 0,
      score: 0,
      isAnswered: false,
      selectedIndex: null,
      isFinished: false
    });
  };

  const value = {
    quizzes,
    customDraft,
    activeSession,
    startQuiz,
    handleAnswer,
    nextQuestion,
    addCustomQuestion,
    publishCustomQuiz,
    resetSession
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
