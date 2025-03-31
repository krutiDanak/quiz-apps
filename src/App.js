// src/App.jsx

import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Question from './components/Question';
import Result from './components/Result';
import questionsData from './data.json';
import './styles/index.css'; 

const App = () => {
  const [step, setStep] = useState('welcome'); // 'welcome' | 'quiz' | 'result'
  const [user, setUser] = useState({ name: '', topicId: '' });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // array of selected answers or null (skipped)

  const handleStart = ({ name, topicId }) => {
    setUser({ name, topicId });
    setStep('quiz');
    setAnswers([]);
    setCurrentIndex(0);
  };

  const handleAnswer = (selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedAnswer;
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < getQuestions().length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('result');
    }
  };

  const handleRestart = () => {
    setStep('welcome');
    setAnswers([]);
    setCurrentIndex(0);
    setUser({ name: '', topicId: '' });
  };

  const getQuestions = () => {
    const category = questionsData.categories.find(cat => cat.id === user.topicId);
    return category?.questions || [];
  };

  const calculateScore = () => {
    const questions = getQuestions();
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      if (!userAnswer) {
        unanswered++;
      } else if (userAnswer.startsWith(q.correctAnswer)) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { correct, incorrect, unanswered };
  };

  const questions = getQuestions();
  const { correct, incorrect, unanswered } = calculateScore();

  return (
    <div className="app">
      {step === 'welcome' && <Welcome onStart={handleStart} />}

      {step === 'quiz' && (
        <Question
          question={questions[currentIndex]}
          current={currentIndex + 1}
          total={questions.length}
          onNext={handleAnswer}
          onExit={handleRestart}
        />
      )}

      {step === 'result' && (
        <Result
          name={user.name}
          score={correct}
          total={questions.length}
          correct={correct}
          incorrect={incorrect}
          unanswered={unanswered}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
