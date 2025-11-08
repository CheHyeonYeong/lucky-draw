import React from 'react';
import './FortuneResult.css';

const FortuneResult = ({ fortune, onRetry }) => {
  if (!fortune) return null;

  return (
    <div className="fortune-result" style={{ '--fortune-color': fortune.color }}>
      <div className="result-card">
        <div className="result-header">
          <h1 className="result-title">{fortune.title}</h1>
        </div>
        <div className="result-content">
          <p>{fortune.content}</p>
        </div>
        <button className="retry-button" onClick={onRetry}>
          다시 뽑기
        </button>
      </div>
    </div>
  );
};

export default FortuneResult;
