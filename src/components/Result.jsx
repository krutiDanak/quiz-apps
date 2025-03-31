import React from 'react';
import '../styles/result.css';

const Result = ({ name, score, total, correct, incorrect, unanswered, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 50;

  return (
    <div className="result-container">
      {/* Top Bar */}
      <div className="result-header">
        <h1 className="logo">QUIZ<span>Mania</span></h1>
        <div className="user-info">
          <div className="user-badge">{name?.charAt(0).toUpperCase()}</div>
          <span className="user-name">{name}</span>
        </div>
      </div>

      {/* Icon */}
      <div className="result-icon">
        {passed ? (
           <div className="icon success-icon">
           <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="10" />
             <path d="M9 12l2 2l4 -4" />
           </svg>
         </div>
        ) : (
          <div className="icon fail-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 15c1.5-1 6.5-1 8 0" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
        )}
      </div>

      {/* Result Content */}
      <div className="result-content">
      {passed ? (
        <>
          <h2 className="result-heading">CONGRATULATION</h2>
          <p className="result-subtext">You successfully completed the Quiz and hold</p>
        </>
      ) : (
        <>
          <p className="result-subtext">You successfully completed the Quiz but you need to</p>
          <h2 className="result-heading fail">KEEP<br />PRACTICING!</h2>
        </>
      )}

      <p className="score-label">Your Score</p>
      <h3 className={`score-value ${passed ? 'green' : 'red'}`}>{percentage}%</h3>
      {passed && <p className="score-message large">Great job!</p>}
      {!passed && <p className="score-message">Try again!</p>}

      <div className="summary-box">
        <p>Out of {total} question</p>
        <div className="summary-stats">
          <span className="correct">{correct} Correct</span>
          <span className="incorrect">{incorrect} Incorrect</span>
          <span className="unanswered">{unanswered} Not answered</span>
        </div>
      </div>

      <button className="restart-btn" onClick={onRestart}>Retake Quiz</button>
    </div>
    </div>
  );
};

export default Result;
