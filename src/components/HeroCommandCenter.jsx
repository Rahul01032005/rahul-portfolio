import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal, FaPlay, FaDownload, FaChevronRight, FaDatabase, FaServer, FaUserCheck } from 'react-icons/fa';

const BackendThreeScene = React.lazy(() => import('./BackendThreeScene'));

function CanvasFallback() {
  return (
    <div className="w-full h-[280px] md:h-[400px] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-accent-sky/5 rounded-full blur-3xl animate-pulse" />
      <div className="flex flex-col items-center space-y-3 z-10">
        <div className="w-10 h-10 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase animate-pulse">
          Mounting R3F Environment...
        </span>
      </div>
    </div>
  );
}

const roles = [
  "Backend Developer",
  "Java Developer",
  "Python Developer",
  "Database Developer",
  "SDE Aspirant"
];

export default function HeroCommandCenter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const heroRef = useRef(null);

  // Typewriter effect for roles
  useEffect(() => {
    let timer;
    const fullText = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // Terminal simulated logs startup sequence
  useEffect(() => {
    const startupSequence = [
      { text: "> initializing_rahul_profile...", delay: 300 },
      { text: "[OK] Profile structure fetched.", delay: 800 },
      { text: "> loading_backend_skills...", delay: 1300 },
      { text: "[OK] Skills mapped: Java, Python, SQL, REST APIs.", delay: 1800 },
      { text: "> connecting_database...", delay: 2400 },
      { text: "[OK] MySQL db latency: 14ms (SECURE)", delay: 3000 },
      { text: "> portfolio_ready ✅", delay: 3600 },
      { text: "[STATUS] SYSTEM ONLINE / SDE READY", delay: 4200 }
    ];

    startupSequence.forEach((log) => {
      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, log.text]);
      }, log.delay);
    });
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const yOffset = -40;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen pt-24 pb-16 lg:py-0 flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Background radial blue glow behind hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] bg-accent-sky/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Full-Screen Workspace Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUMN 1: DEVELOPER IDENTITY CARD (LEFT) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-black/90 border border-accent-cyan/15 hover:border-accent-cyan/30 transition-all duration-300 text-left shadow-2xl"
          >
            <div className="space-y-6">
              {/* Identity Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-[10px] font-mono text-accent-cyan font-bold tracking-widest uppercase flex items-center space-x-1.5">
                  <FaUserCheck size={11} />
                  <span>Profile Console</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              </div>

              {/* Name & Title */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400">IDENTITY_SYS</h4>
                <h1 className="text-4xl font-extrabold tracking-tight text-white font-display">
                  Rahul E
                </h1>
                <p className="text-[11px] font-mono text-accent-cyan font-bold uppercase tracking-wider">
                  Entry-Level Software / Backend Developer
                </p>
              </div>

              {/* Tagline */}
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                “Building scalable backend systems, database-driven applications, and intelligent software solutions.”
              </p>

              {/* Role Indicator */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Current_Subroutine</span>
                <h3 className="text-lg font-bold font-mono text-white flex items-center">
                  <span>&gt;&nbsp;</span>
                  <span className="text-gradient-blue font-extrabold typing-cursor">{currentText}</span>
                </h3>
              </div>
            </div>

            {/* Cyber Terminal Command Buttons */}
            <div className="flex flex-col space-y-3 pt-8 mt-auto">
              <a
                href="#about"
                onClick={(e) => handleScrollTo(e, '#about')}
                className="px-4 py-3 bg-gradient-to-r from-accent-sky to-accent-blue hover:shadow-[0_0_15px_rgba(0,210,255,0.3)] text-white font-bold font-mono text-xs uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-between group hover:scale-[1.01] cursor-pointer"
              >
                <span>[ Explore System ]</span>
                <FaPlay size={10} className="transition-transform group-hover:translate-x-0.5 text-white" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#projects"
                  onClick={(e) => handleScrollTo(e, '#projects')}
                  className="px-3 py-3 bg-black/60 hover:bg-black border border-white/10 hover:border-accent-cyan/60 text-white font-mono text-[10px] uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center space-x-1.5 hover:scale-[1.01]"
                >
                  <FaChevronRight size={10} className="text-accent-cyan" />
                  <span>Projects</span>
                </a>
                <a
                  href="/Resume_Rahul_E.pdf"
                  download
                  className="px-3 py-3 bg-black/60 hover:bg-black border border-white/10 hover:border-accent-cyan/60 text-white font-mono text-[10px] uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center space-x-1.5 hover:scale-[1.01]"
                >
                  <FaDownload size={10} className="text-accent-cyan" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* COLUMN 2: INTERACTIVE 3D CANVAS (CENTER) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-4 flex items-center justify-center relative min-h-[360px] md:min-h-[420px] lg:min-h-[480px] w-full glass-panel-glow rounded-2xl border border-accent-cyan/15 hover:border-accent-cyan/30 shadow-2xl p-6 transition-all duration-300 overflow-hidden"
          >
            {/* Mesh Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent-sky/5 to-transparent pointer-events-none" />
            <div className="absolute w-[260px] h-[260px] md:w-[360px] md:h-[360px] bg-accent-sky/10 rounded-full blur-[80px] pointer-events-none animate-pulse" />
            
            <div className="w-full h-full flex items-center justify-center">
              <Suspense fallback={<CanvasFallback />}>
                <BackendThreeScene />
              </Suspense>
            </div>
          </motion.div>
          
          {/* COLUMN 3: SYSTEM STATUS DIAGNOSTICS (RIGHT) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col p-6 rounded-2xl bg-black/90 border border-accent-cyan/15 hover:border-accent-cyan/30 transition-all duration-300 text-left shadow-2xl"
          >
            {/* Diagnostics Header */}
            <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
              <span className="text-[10px] font-mono text-accent-cyan font-bold tracking-widest uppercase flex items-center space-x-1.5">
                <FaTerminal size={11} />
                <span>Console Diagnostics</span>
              </span>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                <span className="text-[9px] font-mono text-slate-500">SYS_OK</span>
              </div>
            </div>

            {/* Diagnostic Logs Box */}
            <div className="flex-1 bg-slate-950/80 rounded-xl p-4 border border-white/5 font-mono text-xs text-slate-300 space-y-3.5 overflow-y-auto h-[250px] lg:h-auto max-h-[350px] scrollbar-none select-none">
              {consoleLogs.map((log, index) => {
                const isError = log.includes('[ERR]');
                const isSuccess = log.includes('✅') || log.includes('[OK]');
                return (
                  <div 
                    key={index}
                    className={`leading-relaxed ${
                      isError ? 'text-red-400' :
                      isSuccess ? 'text-accent-cyan font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
              {consoleLogs.length < 8 && (
                <div className="text-slate-600 animate-pulse">Running diagnostic checks...</div>
              )}
            </div>

            {/* Stats Overview */}
            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                <span className="text-slate-500">PING</span>
                <span className="text-accent-cyan font-bold">14ms</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                <span className="text-slate-500">PORT</span>
                <span className="text-accent-cyan font-bold">5173</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
