import React, { useState } from 'react';
import AnimationPlayer from '../components/AnimationPlayer';
import FortuneResult from '../components/FortuneResult';
import { getRandomFortune, getAnimationUrl } from '../utils/storage';
import './Home.css';

const Home = () => {
  const [phase, setPhase] = useState('initial'); // initial, animation, result
  const [fortune, setFortune] = useState(null);
  const [animationUrl, setAnimationUrl] = useState('');

  const handleDrawFortune = () => {
    const url = getAnimationUrl();
    setAnimationUrl(url);
    setPhase('animation');
  };

  const handleAnimationComplete = () => {
    const randomFortune = getRandomFortune();
    setFortune(randomFortune);
    setPhase('result');
  };

  const handleRetry = () => {
    setPhase('initial');
    setFortune(null);
  };

  if (phase === 'animation') {
    return (
      <AnimationPlayer
        animationUrl={animationUrl}
        onComplete={handleAnimationComplete}
      />
    );
  }

  if (phase === 'result') {
    return <FortuneResult fortune={fortune} onRetry={handleRetry} />;
  }

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">오늘의 운세</h1>
        <p className="home-subtitle">버튼을 눌러 당신의 운세를 확인하세요</p>
        <button className="draw-button" onClick={handleDrawFortune}>
          운세 뽑기
        </button>
      </div>
    </div>
  );
};

export default Home;
