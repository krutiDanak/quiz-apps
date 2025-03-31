import React, { useEffect, useState } from 'react';
import Question from './Question';

const Quiz = ({ category, onComplete }) => {
  const questions = category.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10);

  const currentQuestion = questions[currentIndex];

  // Timer 
  useEffect(() => {
    if (currentIndex >= questions.length) return;

    if (timeLeft === 0) {
      handleNext(); 
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, currentIndex]);

  //  Handle user selecting an answer
  const handleAnswer = (answerOption) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: answerOption }));
  };

  //  next question
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(10);
    } else {
      calculateScore();
    }
  };

  //  calculation
  const calculateScore = () => {
    let correct = 0;
    let unanswered = 0;

    questions.forEach((q, index) => {
      const selected = selectedAnswers[index];
      if (!selected) {
        unanswered++;
      } else if (selected.startsWith(q.correctAnswer)) {
        correct++;
      }
    });

    onComplete({
      correct,
      unanswered,
      total: questions.length
    });
  };

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h2>{category.name}</h2>
        <div className="timer">Time Left: {timeLeft}s</div>
      </div>

      <Question
        question={currentQuestion}
        selectedOption={selectedAnswers[currentIndex]}
        onAnswer={handleAnswer}
      />

      <button className="next-btn" onClick={handleNext}>
        {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

export default Quiz;
