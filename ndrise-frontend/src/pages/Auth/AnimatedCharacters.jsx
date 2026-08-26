import React, { useEffect, useState, useRef } from 'react';
import './AnimatedCharacters.css';

export default function AnimatedCharacters({ focusedField, textLength = 0, showPassword = false }) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);

  // Random eye blink loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Global mouse cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center normalized to [-1, 1]
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const clampedX = Math.min(Math.max(deltaX, -1), 1);
      const clampedY = Math.min(Math.max(deltaY, -1), 1);

      setMousePos({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isPassword = focusedField === 'password' || showPassword;
  const isEmail = (focusedField === 'email' || focusedField === 'username' || focusedField === 'name') && !isPassword;

  // Calculate eye pupil shift based on mouse cursor position and typing text length
  // In password mode (or when tapping show/hide button), eyes ALWAYS look to the far left (opposite side of password field on right!)
  const pupilX = isPassword
    ? -8
    : (!isPassword
      ? mousePos.x * 6 + (isEmail ? Math.min(Math.max((textLength - 8) * 0.6, -2), 6) : 0)
      : 0);

  const pupilY = !isPassword
    ? mousePos.y * 5 + (isEmail ? 2 : 0)
    : 0;

  // Subtle 3D stage tilt following mouse cursor (or turned left in password mode)
  const stageRotateX = !isPassword ? -mousePos.y * 6 : 0;
  const stageRotateY = !isPassword ? mousePos.x * 10 : -20;

  return (
    <div
      ref={stageRef}
      className={`characters-stage ${isPassword ? 'mode-look-away' : ''} ${isEmail ? 'mode-watching' : ''}`}
    >
      <div className="stage-bg-glow"></div>

      <div
        className="characters-group"
        style={{
          '--rotate-x': `${stageRotateX}deg`,
          '--rotate-y': `${stageRotateY}deg`
        }}
      >

        {/* 1. ORANGE BLOB (Bottom Left) */}
        <div className={`character char-orange ${isPassword ? 'turned-away' : ''}`}>
          <div className="char-body orange-body">
            <div className="char-face">
              <div className={`eyes-container ${isBlinking ? 'blinking' : ''}`}>
                <div className="eye eye-dot">
                  <div className="pupil" style={{ transform: `translate(${pupilX}px, ${pupilY}px)` }}></div>
                </div>
                <div className="eye eye-dot">
                  <div className="pupil" style={{ transform: `translate(${pupilX}px, ${pupilY}px)` }}></div>
                </div>
              </div>
              <div className="mouth mouth-dot"></div>
            </div>
          </div>
          <div className="char-shadow"></div>
        </div>

        {/* 2. PURPLE TALL BLOB (Top / Center-Left) */}
        <div className={`character char-purple ${isPassword ? 'turned-away' : ''}`}>
          <div className="char-body purple-body">
            <div className="char-face">
              <div className={`eyes-container ${isBlinking ? 'blinking' : ''}`}>
                <div className="eye eye-white">
                  <div className="pupil" style={{ transform: `translate(${pupilX}px, ${pupilY}px)` }}></div>
                </div>
                <div className="eye eye-white">
                  <div className="pupil" style={{ transform: `translate(${pupilX}px, ${pupilY}px)` }}></div>
                </div>
              </div>
              <div className="mouth mouth-small"></div>
            </div>
          </div>
          <div className="char-shadow"></div>
        </div>

        {/* 3. BLACK CHARACTER (Center / Mid-Right) */}
        <div className={`character char-black ${isPassword ? 'turned-away' : ''}`}>
          <div className="char-body black-body">
            <div className="char-face">
              <div className={`eyes-container ${isBlinking ? 'blinking' : ''}`}>
                <div className="eye eye-square">
                  <div
                    className="pupil"
                    style={{ transform: `translate(${pupilX * 1.2}px, ${pupilY}px)` }}
                  ></div>
                </div>
                <div className="eye eye-square">
                  <div
                    className="pupil"
                    style={{ transform: `translate(${pupilX * 1.2}px, ${pupilY}px)` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="char-shadow"></div>
        </div>

        {/* 4. YELLOW BLOB (Bottom Right) */}
        <div className={`character char-yellow ${isPassword ? 'turned-away' : ''}`}>
          <div className="char-body yellow-body">
            <div className="char-face">
              <div
                className="side-eye-line"
                style={{
                  transform: `translate(${pupilX * 0.5}px, ${pupilY * 0.5}px)`
                }}
              ></div>
            </div>
          </div>
          <div className="char-shadow"></div>
        </div>

      </div>
    </div>
  );
}
