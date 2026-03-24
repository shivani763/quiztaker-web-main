import React, { useState } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, BookmarkPlus } from 'lucide-react';

const CreateQuiz = () => {
  const { customDraft, addCustomQuestion, publishCustomQuiz, quizzes } = useQuizContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correct: '',
    explanation: ''
  });

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
    addCustomQuestion(newQuestion);
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

  const handlePublish = () => {
    if (customDraft.length === 0) {
      alert("Please add at least one question to the draft before publishing.");
      return;
    }
    const quizName = `Custom Quiz ${Object.keys(quizzes).length + 1}`;
    publishCustomQuiz(quizName);
    alert(`${quizName} has been successfully created!`);
    navigate('/');
  };

  return (
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
            <button type="button" className="secondary-btn" onClick={addQuestionToDraft}>
              <PlusCircle size={18} /> Add to Draft
            </button>
            <button type="button" className="primary-btn" onClick={handlePublish}>
              <BookmarkPlus size={18} /> Publish Quiz
            </button>
          </div>
        </form>
        <div className="draft-questions">
          <h3>Draft Questions (<span>{customDraft.length}</span>)</h3>
          <ul id="question-list">
            {customDraft.map((q, i) => (
              <li key={i}>
                <span>Q{i + 1}: {q.question}</span> <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>✓ Added</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CreateQuiz;
