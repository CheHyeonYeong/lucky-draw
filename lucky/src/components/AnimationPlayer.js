import React, { useEffect, useRef } from 'react';
import './AnimationPlayer.css';

const AnimationPlayer = ({ animationUrl, onComplete }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5초 후 자동 완료

    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    if (videoRef.current && animationUrl) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay failed:', err);
      });
    }
  }, [animationUrl]);

  return (
    <div className="animation-player">
      {animationUrl ? (
        <video
          ref={videoRef}
          className="animation-video"
          src={animationUrl}
          autoPlay
          muted
          playsInline
          loop={false}
        />
      ) : (
        <div className="default-animation">
          <div className="spinner"></div>
          <p className="loading-text">운세를 뽑고 있어요...</p>
        </div>
      )}
    </div>
  );
};

export default AnimationPlayer;
