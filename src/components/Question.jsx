// src/components/Question.jsx

import React, { useEffect, useState } from 'react';
import '../styles/question.css';

const Question = ({ question, current, total, onNext, onExit }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSkip();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    onNext(selectedOption);
    resetState();
  };

  const handleSkip = () => {
    onNext(null); // null for skipped
    resetState();
  };

  const resetState = () => {
    setSelectedOption('');
    setTimeLeft(10);
  };

  return (
    <div className="question-container">
      <header className="quiz-header">
        <h1 className="logo">QUIZ<span>Mania</span></h1>
        <button className="exit-btn" onClick={onExit}>Exit Quiz</button>
      </header>

      <div className="quiz-progress">
        <div className="progress-info">
          <span><strong>{current}</strong> / {total}</span>
          <span className="timer">0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(current / total) * 100}%` }}></div>
        </div>
      </div>

      <div className="question-box">
        <h3>{current}. {question.question}</h3>
        <div className="options">
          {question.options.map((opt, idx) => (
            <label
              key={idx}
              className={`option ${selectedOption === opt ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="answer"
                value={opt}
                checked={selectedOption === opt}
                onChange={() => handleSelect(opt)}
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="actions">
          <button className="next-btn" onClick={handleNext}>Next</button>
          <button className="skip-btn" onClick={handleSkip}>Skip this question</button>
        </div>
      </div>
    </div>
  );
};

export default Question;
