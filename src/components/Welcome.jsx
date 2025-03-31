import React, { useState } from 'react';
import '../styles/welcome.css';
import questionsData from '../data.json';

const Welcome = ({ onStart }) => {
  const [name, setName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleStart = () => {
    if (name && selectedTopic) {
      onStart({ name, topicId: selectedTopic });
    } else {
      alert('Please enter your name and select a topic.');
    }
  };

  // Get data
  const topics = questionsData.categories.map((category) => ({
    id: category.id,
    label: category.name
  }));
  

  return (
    <div className="welcome-container">
      <main className="welcome-box">
        <h2>Welcome to <span>QUIZ</span><strong>Mania</strong></h2>

        <div className="rules-box">
          <p>Please read all the rules about this quiz before you start.</p>
          <a href="#rules">Quiz rules</a>
        </div>

        <div className="input-group">
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            id="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Please select a topic to continue</label>
          <div className="topics">
            {topics.map((topic) => (
              <div className="topic-option" key={topic.id}>
                <input
                  type="radio"
                  id={topic.id}
                  name="topic"
                  value={topic.id}
                  checked={selectedTopic === topic.id}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                />
                <label htmlFor={topic.id}>{topic.label}</label>
              </div>
            ))}
          </div>
        </div>

        <button className="start-btn" onClick={handleStart}>
          Start Quiz
        </button>
      </main>
    </div>
  );
};

export default Welcome;
