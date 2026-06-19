import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodeRunnerLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const totalDuration = 7000; // 7 seconds recommended duration
    const intervalStep = 40; 
    const totalSteps = totalDuration / intervalStep; 
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(Math.floor(nextProgress));

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setIsCompleted(true);
        // Delay completion slightly to show the completion flash
        setTimeout(onComplete, 800);
      }
    }, intervalStep);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Smooth quadratic easeInOut mapping for the vehicle's position
  const easedLeft = useMemo(() => {
    const t = progress / 100;
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-between py-16 font-mono select-none overflow-hidden h-screen w-screen"
    >
      {/* Subtle Digital Grid Road Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,210,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,210,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Perspective background glow */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-accent-sky/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Branding */}
      <div className="text-center relative z-10 mt-8">
        <h1 className="text-xs md:text-sm font-extrabold tracking-widest text-slate-500 uppercase">
          RAHUL_E <span className="text-accent-cyan">::</span> COMPILING_ENVIRONMENT
        </h1>
      </div>

      {/* Full-width Digital Track & Car Container */}
      <div className="w-full h-32 relative flex items-end z-10">
        
        {/* Full-width Road/Track Line */}
        <div className="absolute bottom-[22px] left-0 right-0 h-[1.5px] bg-accent-sky/20 border-b border-accent-cyan shadow-[0_0_15px_rgba(0,210,255,0.85)]" />
        
        {/* Moving Coding Vehicle (moves from 0% left to 100% right with offset compensation) */}
        <motion.div
          className="absolute bottom-[16px] z-20 flex items-center"
          style={{ 
            left: `${easedLeft * 100}%`,
            transform: `translateX(-${easedLeft * 135}px)` 
          }}
        >
          {/* Glowing speed trail behind the vehicle */}
          <div 
            className="absolute right-full top-[16px] h-[28px] bg-gradient-to-r from-transparent via-accent-sky/15 to-accent-cyan/50 rounded-l-full blur-[1.5px] pointer-events-none transition-all duration-75"
            style={{
              width: `${Math.min(180, progress * 4.5)}px`,
              marginRight: '-10px'
            }}
          />

          {/* Scattered particles tail */}
          {progress > 5 && (
            <div className="absolute right-full mr-3 top-6 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping opacity-85" />
              <span className="w-1 h-1 rounded-full bg-accent-sky animate-pulse opacity-60" style={{ animationDelay: '0.15s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-45" style={{ animationDelay: '0.3s' }} />
            </div>
          )}

          {/* SVG Tech Vehicle */}
          <svg width="135" height="52" viewBox="0 0 135 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Vehicle Underglow */}
            <ellipse cx="68" cy="46" rx="42" ry="5" fill="rgba(0, 210, 255, 0.45)" filter="blur(3.5px)" />
            
            {/* Car Body Shell */}
            <path d="M10 40 C10 40, 11 25, 22 19 C33 13, 48 10, 68 10 C92 10, 110 15, 120 28 C127 35, 130 40, 130 40 L125 43 L15 43 Z" fill="#020204" stroke="#00d2ff" strokeWidth="1.8" />
            
            {/* Windows */}
            <path d="M32 19 L52 14 L68 14 L75 19 Z" fill="#080c18" stroke="#0070f3" strokeWidth="1.2" />
            
            {/* White/Blue Code Details on Car Body */}
            <text x="28" y="34" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="extrabold">&lt;/&gt;</text>
            <text x="56" y="28" fill="#00d2ff" fontSize="6.5" fontFamily="monospace" opacity="0.9" fontWeight="bold">const x = 1</text>
            <text x="56" y="36" fill="#00d2ff" fontSize="6.5" fontFamily="monospace" opacity="0.9" fontWeight="bold">init_sde()</text>

            {/* Front Wheel (Spinning) */}
            <g className="animate-spin-wheel" style={{ transformOrigin: '100px 40px' }}>
              <circle cx="100" cy="40" r="10" fill="#000000" stroke="#00d2ff" strokeWidth="1.8" />
              <circle cx="100" cy="40" r="5" fill="#0070f3" />
              <line x1="100" y1="30" x2="100" y2="50" stroke="#00d2ff" strokeWidth="1.2" />
              <line x1="90" y1="40" x2="110" y2="40" stroke="#00d2ff" strokeWidth="1.2" />
            </g>

            {/* Rear Wheel (Spinning) */}
            <g className="animate-spin-wheel" style={{ transformOrigin: '32px 40px' }}>
              <circle cx="32" cy="40" r="10" fill="#000000" stroke="#00d2ff" strokeWidth="1.8" />
              <circle cx="32" cy="40" r="5" fill="#0070f3" />
              <line x1="32" y1="30" x2="32" y2="50" stroke="#00d2ff" strokeWidth="1.2" />
              <line x1="22" y1="40" x2="42" y2="40" stroke="#00d2ff" strokeWidth="1.2" />
            </g>
          </svg>
        </motion.div>

        {/* Pulse effect at finish */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.3, 1, 0], scale: [1, 2.5, 3.5] }}
              transition={{ duration: 0.7 }}
              className="absolute right-4 bottom-[10px] w-8 h-8 rounded-full bg-accent-cyan/40 blur-[8px] pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Percentage Indicator below the road */}
      <div className="flex flex-col items-center space-y-1 relative z-10 mb-8">
        <span 
          className="text-4xl md:text-5xl font-extrabold tracking-wider text-white drop-shadow-[0_0_12px_rgba(0,210,255,0.75)] font-sans"
        >
          {progress}%
        </span>
        <span className="text-[9.5px] text-slate-500 uppercase tracking-widest font-bold">Code compilation progress</span>
      </div>
    </motion.div>
  );
}
