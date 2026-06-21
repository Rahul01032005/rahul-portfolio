import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaVolumeUp, FaVolumeMute, FaRobot, FaMinus } from 'react-icons/fa';

// Color themes configuration
const THEMES = {
  cyber: {
    primary: '#00d2ff',
    secondary: '#0070f3',
    bg: 'rgba(3, 3, 15, 0.95)',
    border: 'rgba(0, 210, 255, 0.25)',
    glow: 'rgba(0, 210, 255, 0.4)',
    bubbleUser: 'bg-gradient-to-r from-accent-sky to-accent-blue text-white',
    bubbleBot: 'bg-slate-900 border border-accent-cyan/15 text-slate-100',
    avatarBg: 'bg-slate-950 border-2 border-accent-cyan shadow-[0_0_15px_rgba(0,210,255,0.4)]',
  },
  kawaii: {
    primary: '#ff7eb9',
    secondary: '#ff758f',
    bg: 'rgba(15, 3, 10, 0.95)',
    border: 'rgba(255, 126, 185, 0.25)',
    glow: 'rgba(255, 126, 185, 0.4)',
    bubbleUser: 'bg-gradient-to-r from-pink-500 to-rose-400 text-white',
    bubbleBot: 'bg-zinc-900 border border-pink-500/15 text-pink-100',
    avatarBg: 'bg-slate-950 border-2 border-pink-400 shadow-[0_0_15px_rgba(255,126,185,0.4)]',
  },
  mint: {
    primary: '#10b981',
    secondary: '#059669',
    bg: 'rgba(3, 15, 8, 0.95)',
    border: 'rgba(16, 185, 129, 0.25)',
    glow: 'rgba(16, 185, 129, 0.4)',
    bubbleUser: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
    bubbleBot: 'bg-slate-900 border border-emerald-500/15 text-emerald-100',
    avatarBg: 'bg-slate-950 border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
  },
  midnight: {
    primary: '#a855f7',
    secondary: '#7c3aed',
    bg: 'rgba(10, 3, 15, 0.95)',
    border: 'rgba(168, 85, 247, 0.25)',
    glow: 'rgba(168, 85, 247, 0.4)',
    bubbleUser: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
    bubbleBot: 'bg-slate-900 border border-purple-500/15 text-purple-100',
    avatarBg: 'bg-slate-950 border-2 border-purple-400 shadow-[0_0_15px_rgba(168, 85, 247, 0.4)]',
  }
};

export default function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [themeName, setThemeName] = useState('cyber');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am Rock, your interactive resume assistant. (^_^) Feel free to ask me anything about Rahul's skills, projects, academic degrees, or certifications. Try clicking my avatar, but don't overwhelm me! ✨⭐",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [botState, setBotState] = useState('idle'); // 'idle', 'thinking', 'talking', 'dizzy', 'happy'
  const [clickCount, setClickCount] = useState(0);
  
  // Coordinate position state for closed avatar wandering
  const [pos, setPos] = useState({ x: 500, y: 500 });
  
  const chatEndRef = useRef(null);
  const clickTimeoutRef = useRef(null);
  const physicsRef = useRef({ d: 0, dir: -1, speed: 1.6 });

  const theme = THEMES[themeName];

  // Helper function to map 1D perimeter distance back to 2D coordinates on edges
  const getCoordinatesFromD = (d, width, height, minX, minY, maxX, maxY) => {
    const total = 2 * (width + height);
    let wrapped = d % total;
    if (wrapped < 0) wrapped += total;

    if (wrapped < width) {
      // Top Edge: left-to-right
      return { x: minX + wrapped, y: minY };
    } else if (wrapped < width + height) {
      // Right Edge: top-to-bottom
      return { x: maxX, y: minY + (wrapped - width) };
    } else if (wrapped < 2 * width + height) {
      // Bottom Edge: right-to-left
      return { x: maxX - (wrapped - width - height), y: maxY };
    } else {
      // Left Edge: bottom-to-top
      return { x: minX, y: maxY - (wrapped - 2 * width - height) };
    }
  };

  // Initialize physics position to bottom right once window context exists
  useEffect(() => {
    const size = 56;
    const pad = 20;
    const minX = pad;
    const maxX = Math.max(minX + 10, window.innerWidth - size - pad);
    const minY = pad;
    const maxY = Math.max(minY + 10, window.innerHeight - size - pad);
    
    const width = maxX - minX;
    const height = maxY - minY;
    
    // Start at bottom right corner (width + height) along perimeter path
    physicsRef.current = {
      d: width + height,
      dir: -1, // move counter-clockwise (up/left) initially
      speed: 1.6
    };
    
    const coords = getCoordinatesFromD(width + height, width, height, minX, minY, maxX, maxY);
    setPos(coords);
  }, []);

  // Synthesize audio feedback using Web Audio API
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      if (type === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(250, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.12);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      } else if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(550, ctx.currentTime);
        osc.frequency.setValueAtTime(350, ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'dizzy') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.35);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      } else if (type === 'talk') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        const pitch = 450 + Math.random() * 250;
        osc.frequency.setValueAtTime(pitch, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(pitch - 150, ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      }
    } catch (e) {
      console.warn("Audio Context error", e);
    }
  };

  // Listen for custom event to open the chatbox remotely
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      playSound('pop');
    };
    window.addEventListener('open-ai-chatbox', handleOpen);
    return () => window.removeEventListener('open-ai-chatbox', handleOpen);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // physics loop for moving closed avatar trigger strictly along edges
  useEffect(() => {
    if (isOpen) return;

    let animationFrameId;

    const animate = () => {
      const p = physicsRef.current;
      
      const size = 56; // size of avatar
      const pad = 20;
      const minX = pad;
      const maxX = Math.max(minX + 10, window.innerWidth - size - pad);
      const minY = pad;
      const maxY = Math.max(minY + 10, window.innerHeight - size - pad);
      
      const width = maxX - minX;
      const height = maxY - minY;

      // Update 1D position
      p.d += p.dir * p.speed;

      // Wrap d
      const total = 2 * (width + height);
      p.d = p.d % total;
      if (p.d < 0) p.d += total;

      // 0.8% chance per frame to reverse direction (wandering perimeter feel)
      if (Math.random() < 0.008) {
        p.dir = -p.dir;
      }

      const coords = getCoordinatesFromD(p.d, width, height, minX, minY, maxX, maxY);
      setPos(coords);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  // Click avatar to tickle / trigger dizzy easter egg
  const handleAvatarClick = () => {
    playSound('pop');
    setClickCount((prev) => {
      const next = prev + 1;
      
      // Clear existing timeout
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      
      if (next >= 5) {
        setBotState('dizzy');
        playSound('dizzy');
        setMessages((prevMsgs) => [
          ...prevMsgs,
          {
            id: `dizzy-${Date.now()}`,
            sender: 'bot',
            text: "Warning! Load limit exceeded! 🌀 (x_x) Rock's processors are overloaded! Diagnostic numbers and scripts are compiling... Please wait while I recalibrate my system matrix... 💫⚡",
            timestamp: new Date()
          }
        ]);
        // Reset after 4.5 seconds
        setTimeout(() => {
          setBotState('idle');
          setClickCount(0);
        }, 4500);
      } else {
        setBotState('happy');
        setTimeout(() => setBotState('idle'), 1200);
      }
      
      // Reset clicks if no clicks for 2 seconds
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);

      return next;
    });
  };

  // Local Keyword-based QA Search Engine with relative parsing
  const matchLocalResponse = (query) => {
    const q = query.toLowerCase();
    
    // Greetings
    if (q.match(/\b(hi|hello|hey|yo|hola|greetings)\b/)) {
      return "Hello! Hello! (｡♥‿♥｡) I'm Rock! Ready to explore? I'm fueled on caffeine and positive energy! Ask me details about Rahul's qualifications! ✨";
    }

    // Contact / Hire / LinkedIn / GitHub
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('job') || q.includes('reach') || q.includes('resume') || q.includes('linkedin') || q.includes('github') || (q.includes('him') && q.includes('call')) || (q.includes('him') && q.includes('message')) || q.includes('mail') || q.includes('connect')) {
      return "Let's connect! 🤝 You can reach Rahul at **rahul01032005@gmail.com** or call **+91 7619533115**. Check out his [GitHub](https://github.com/Rahul01032005) or [LinkedIn](https://linkedin.com/in/rahul-e-5624b5287). He is fully prepared to rock SDE and Backend Developer roles! 🚀";
    }

    // Java
    if (q.includes('java')) {
      return "Ooooh, Java! ☕ Rahul is extremely good at it (90% score!). He has an Oracle Core Java Certification and built the Fuel Station Monitoring System using Java, JDBC, and MySQL! OOP concepts are in his DNA! 🧬";
    }

    // Python / FastAPI
    if (q.includes('python') || q.includes('fastapi') || q.includes('streamlit')) {
      return "Python power! 🐍 Rahul uses Python and FastAPI to build super fast REST APIs. In fact, his 'AI Self Management System' leverages FastAPI, Python, and Streamlit to give smart productivity suggestions! 🤖💡";
    }

    // SQL / Databases / MySQL
    if (q.includes('sql') || q.includes('database') || q.includes('mysql') || q.includes('dbms')) {
      return "Data storage? MySQL is Rahul's playground! 🗄️ He understands relational schemas, database normalization, complex SQL queries, and secure JDBC mappings. Structured data loves him! 📊";
    }

    // Frontend / React / CSS / HTML / Tailwind
    if (q.includes('react') || q.includes('tailwindcss') || q.includes('css') || q.includes('html') || q.includes('frontend')) {
      return "Vibrant UI design! 🎨 Rahul uses React.js, Tailwind CSS, HTML5, CSS3, and Framer Motion to craft premium interfaces (like this high-end developer terminal)! Fluid layouts and micro-animations are his jam! 🌟";
    }

    // PHP
    if (q.includes('php')) {
      return "PHP logic! 🐘 Rahul built a web-based Online Voting Portal using PHP and MySQL. It validates registration and handles secure ballot logs seamlessly! 🗳️";
    }

    // Projects / Build
    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('build') || q.includes('made') || q.includes('create') || q.includes('develop')) {
      if (q.includes('self') || q.includes('management') || q.includes('ai')) {
        return "The **AI Self Management System** is built with Python, FastAPI, and Streamlit! It provides REST endpoints for scheduling, visualizes productivity logs, and generates intelligent suggestions based on past data! 🤖📈";
      }
      if (q.includes('fuel') || q.includes('station')) {
        return "The **Fuel Station Monitoring System** is a Java app utilizing JDBC and MySQL. It maintains live fuel stock logs, calculates bills automatically, and provides a secure admin dashboard to configure pricing! ⛽💸";
      }
      if (q.includes('voting') || q.includes('portal') || q.includes('vote')) {
        return "The **Online Voting Portal** is a sleek web application using PHP and MySQL. It secures ballot logs to prevent double-voting and aggregates results in real-time on a graphical distribution map! 🗳️📈";
      }
      return "Rahul has three major showcase projects:\n1️⃣ **AI Self Management System** (Python, FastAPI, Streamlit, AI APIs)\n2️⃣ **Fuel Station Monitoring System** (Java, JDBC, MySQL)\n3️⃣ **Online Voting Portal** (PHP, MySQL)!\nWhich one sounds cooler? Ask me! 🚀";
    }

    // Certifications
    if (q.includes('certif') || q.includes('nptel') || q.includes('sap') || q.includes('oracle') || q.includes('oci') || q.includes('badge') || q.includes('score') || q.includes('award') || q.includes('honor')) {
      return "Rahul has 4 amazing certifications:\n🥇 **NPTEL / IIT**: Data Structures Elite+Gold Scholar (90% score!)\n🥈 **SAP**: Enterprise Certified Business Data Cloud\n🥉 **Oracle**: Oracle Cloud Infrastructure Foundations Associate\n🏅 **Core Java**: Oracle Academy complete! 🏆🌟";
    }

    // Education / CGPA / Degrees
    if (q.includes('education') || q.includes('study') || q.includes('degree') || q.includes('academic') || q.includes('college') || q.includes('university') || q.includes('school') || q.includes('mca') || q.includes('bca') || q.includes('vtu') || q.includes('grades') || q.includes('cgpa')) {
      return "Rahul's academic credentials:\n• **MCA**: Visvesvaraya Technological University (VTU) (Pursuing, Expected Sept 2027)\n• **BCA**: Mangalore University (2022-2025) - CGPA: **9.31 / 10** (Distinction)! 🎓✨";
    }

    // Skills General
    if (q.includes('skill') || q.includes('languages') || q.includes('tech') || q.includes('code') || q.includes('know') || q.includes('good at') || q.includes('proficient')) {
      return "Here is a quick snapshot of Rahul's skill matrix: \n• Code: Java, Python, SQL, C, C++, PHP, JavaScript \n• Backend: FastAPI, Spring Boot, JDBC, REST API compilation \n• Frontend: React, Tailwind, Streamlit \n• Tools: Git/GitHub, VS Code, Postman! 💻🔥";
    }

    // Core Relative Context Resolver (For "about him", "tell me about him", "who is he", "who is rahul", etc.)
    if (q.includes('him') || q.includes('he') || q.includes('his') || q.includes('rahul') || q.includes('profile') || q.includes('about') || q.includes('who is') || q.includes('bio') || q.includes('tell me about') || q.includes('details')) {
      return "Rahul E is an entry-level software / backend developer currently pursuing an MCA at VTU! He achieved an impressive 9.31 CGPA during his BCA, holds an IIT/NPTEL Gold badge in Data Structures, and loves backend architectures like FastAPI and Spring Boot! Ask me about his skills, projects, or study log! 🚀🎒";
    }

    // Compliments / Jokes
    if (q.includes('cute') || q.includes('funny') || q.includes('love') || q.includes('friend') || q.includes('smart') || q.includes('cool')) {
      return "Thank you for the positive feedback! (♥_♥) I am programmed to assist you professionally. Tell Rahul he should give you a high five! 🖐️✨";
    }

    // Who built you / Name
    if (q.includes('who are you') || q.includes('your name') || q.includes('who built you') || q.includes('creator') || q.includes('made you') || q.includes('rock')) {
      return "I am Rock, a highly animated digital assistant created by Rahul! My task is to showcase his qualifications, skills, and projects in an interactive interface! (•⊙ω⊙•)✨";
    }

    // Fallbacks
    const fallbacks = [
      "Beep boop! 🤖 I searched my system logs but couldn't find that exact detail about Rahul. Try asking: 'What projects has he built?' or 'Show his skills'! 🚀",
      "System alert: query out of scope! 🛸 (o_O) Feel free to ask about Rahul's BCA/MCA academic records, his Java certification, or his Python projects! ⭐",
      "Compiling... 🔢 Reference not found! Try asking about 'NPTEL Elite Gold certification' or 'FastAPI'! 💻✨",
      "I am a specialized assistant focused solely on Rahul's resume data. 🤫 Please ask me about his qualifications, projects, or how to contact him! 📞"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  // Process User Input Message
  const handleSendMessage = async (textToSend = inputValue) => {
    const text = textToSend.trim();
    if (!text) return;

    playSound('beep');

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setBotState('thinking');

    // Simulate AI thinking and talking
    setTimeout(async () => {
      let botResponseText = '';
      
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (apiKey && apiKey !== 'your_api_key_here') {
        // Use Live Gemini API
        try {
          const systemContext = `
            You are Rock, a professional, interactive, animated AI assistant for Rahul's developer portfolio site.
            Always keep responses concise (under 2-3 sentences), helpful, energetic, and professional, including helpful emojis (e.g. ✨, 🚀, 💻).
            Answer the user's questions about Rahul using this precise resume data:
            - Profile: Rahul E, MCA student in Bangalore. Open to SDE and Backend developer opportunities.
            - Education: MCA at VTU (Expected Sept 2027), BCA at Mangalore University (2022-2025, CGPA 9.31/10 Distinction).
            - Skills: Java, Python, SQL, C, C++, PHP, JavaScript, FastAPI, Spring Boot, JDBC, REST APIs, CRUD Operations, MySQL, React.js, CSS3, HTML5, Tailwind CSS, Streamlit, Git, GitHub, VS Code, Postman.
            - Projects:
              1. AI Self Management System (Python, FastAPI, Streamlit, AI APIs)
              2. Fuel Station Monitoring System (Java, JDBC, MySQL)
              3. Online Voting Portal (PHP, MySQL, HTML, CSS)
            - Certifications: NPTEL Elite Gold Scholar in Data Structures (90% score), SAP Business Data Cloud Enterprise Certified, OCI Foundations Associate, Core Java certification.
            - Contact: rahul01032005@gmail.com, +91 7619533115.
          `;

          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `${systemContext}\n\nUser Question: ${text}` }]
              }]
            })
          });
          const data = await response.json();
          botResponseText = data.candidates[0].content.parts[0].text;
        } catch (error) {
          console.error("Gemini API Error, falling back to local QA:", error);
          botResponseText = matchLocalResponse(text);
        }
      } else {
        // Use local keyword matching engine
        botResponseText = matchLocalResponse(text);
      }

      setBotState('talking');
      
      // Simulate dialogue sound blips
      const speakInterval = setInterval(() => {
        playSound('talk');
      }, 95);

      setTimeout(() => {
        clearInterval(speakInterval);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: botResponseText,
            timestamp: new Date()
          }
        ]);
        setBotState('idle');
      }, 700);

    }, 800);
  };

  // Quick suggestion prompts
  const suggestions = [
    { label: "Skills Matrix 💻", text: "What technologies and languages does Rahul know?" },
    { label: "Projects Built 🚀", text: "Tell me about Rahul's programming projects." },
    { label: "Education Log 🎓", text: "Tell me about Rahul's college degrees and CGPA." },
    { label: "Certifications 🏆", text: "What professional certifications does Rahul hold?" },
    { label: "Hire / Contact 📞", text: "How can I contact Rahul or hire him?" }
  ];

  // SVG representation of Chibi Face
  const renderFace = () => {
    let eyeSvg = null;
    let mouthSvg = null;

    if (botState === 'dizzy') {
      // (x_x) Dizzy State
      eyeSvg = (
        <g stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round">
          {/* Left X */}
          <line x1="12" y1="16" x2="20" y2="24" />
          <line x1="20" y1="16" x2="12" y2="24" />
          {/* Right X */}
          <line x1="40" y1="16" x2="48" y2="24" />
          <line x1="48" y1="16" x2="40" y2="24" />
        </g>
      );
      mouthSvg = (
        <path d="M 26 36 Q 30 31 34 36" fill="none" stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round" />
      );
    } else if (botState === 'thinking') {
      // (⊙_⊙) Spinning/Thinking state
      eyeSvg = (
        <g fill="none" stroke={theme.primary} strokeWidth="2">
          <circle cx="16" cy="20" r="4" />
          <circle cx="44" cy="20" r="4" />
          {/* Spinning pupils */}
          <motion.circle 
            cx="16" cy="20" r="1.5" fill={theme.primary}
            animate={{ x: [0, 1.5, 0, -1.5, 0], y: [0, -1.5, 0, 1.5, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
          <motion.circle 
            cx="44" cy="20" r="1.5" fill={theme.primary}
            animate={{ x: [0, -1.5, 0, 1.5, 0], y: [0, 1.5, 0, -1.5, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
        </g>
      );
      mouthSvg = (
        <line x1="26" y1="34" x2="34" y2="34" stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round" />
      );
    } else if (botState === 'happy') {
      // (♥_♥) Heart Eyes
      eyeSvg = (
        <g fill={theme.primary}>
          {/* Heart Left */}
          <path d="M 12,18 C 10,14 15,12 16,16 C 17,12 22,14 20,18 L 16,22 Z" />
          {/* Heart Right */}
          <path d="M 40,18 C 38,14 43,12 44,16 C 45,12 50,14 48,18 L 44,22 Z" />
        </g>
      );
      mouthSvg = (
        <path d="M 24 32 Q 30 38 36 32" fill="none" stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round" />
      );
    } else if (botState === 'talking') {
      // Animated mouth for chatter
      eyeSvg = (
        <g fill={theme.primary}>
          <circle cx="16" cy="20" r="3" />
          <circle cx="44" cy="20" r="3" />
        </g>
      );
      mouthSvg = (
        <motion.circle 
          cx="30" cy="34" r="3.5" fill="none" stroke={theme.primary} strokeWidth="2"
          animate={{ scaleY: [0.5, 1.6, 0.4, 1.4, 0.5] }}
          transition={{ repeat: Infinity, duration: 0.4 }}
        />
      );
    } else {
      // (o_o) Idle State with blinking loop
      eyeSvg = (
        <g fill={theme.primary}>
          <motion.ellipse 
            cx="16" cy="20" rx="3.5" ry="3.5"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 1 }}
          />
          <motion.ellipse 
            cx="44" cy="20" rx="3.5" ry="3.5"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 1 }}
          />
        </g>
      );
      mouthSvg = (
        <path d="M 25 33 Q 30 36 35 33" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" />
      );
    }

    return (
      <svg width="60" height="50" viewBox="0 0 60 50" className="mx-auto">
        {eyeSvg}
        {mouthSvg}
      </svg>
    );
  };

  return (
    <div className="font-sans">
      <AnimatePresence>
        
        {/* Open Chatbox Window (Fixed to bottom-right) */}
        {isOpen && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              style={{ 
                backgroundColor: theme.bg,
                borderColor: theme.primary,
                boxShadow: `0 0 30px ${theme.glow}`
              }}
              className="w-[92vw] sm:w-[380px] h-[500px] rounded-2xl border flex flex-col overflow-hidden relative"
            >
              
              {/* Header controls bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-slate-950/70 select-none">
                
                {/* Left Chibi Icon & Label */}
                <div 
                  className="flex items-center space-x-2.5 cursor-pointer group"
                  onClick={handleAvatarClick}
                  title="Click Rock's face to trigger happy vibes!"
                >
                  <motion.div 
                    className={`w-9 h-9 rounded-full flex items-center pt-1.5 ${botState === 'dizzy' ? 'animate-wiggle' : 'group-hover:rotate-6'}`}
                    animate={botState === 'dizzy' ? { x: [-3, 3, -3, 3, 0] } : {}}
                    transition={botState === 'dizzy' ? { repeat: Infinity, duration: 0.2 } : {}}
                  >
                    {renderFace()}
                  </motion.div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide flex items-center space-x-1.5 font-display">
                      <span>Rock</span>
                      <span 
                        className="w-1.5 h-1.5 rounded-full animate-pulse" 
                        style={{ backgroundColor: theme.primary }}
                      />
                    </h4>
                    <p className="text-[9px] font-mono text-slate-500 uppercase">
                      {botState === 'dizzy' ? '🌀 Dizzy Mode' : botState === 'thinking' ? '💭 Typing...' : '✨ Interactive Assistant'}
                    </p>
                  </div>
                </div>

                {/* Theme Selector Dots & Audio Controls */}
                <div className="flex items-center space-x-2">
                  
                  {/* Audio Enable Toggle */}
                  <button
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                      playSound('beep');
                    }}
                    className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
                    title={soundEnabled ? "Mute audio" : "Unmute audio"}
                  >
                    {soundEnabled ? <FaVolumeUp size={11} /> : <FaVolumeMute size={11} />}
                  </button>

                  {/* Color Theme Buttons */}
                  <div className="flex items-center space-x-1.5 bg-slate-900/60 p-1 rounded-full border border-white/5">
                    {Object.keys(THEMES).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setThemeName(t);
                          playSound('pop');
                        }}
                        style={{ 
                          backgroundColor: THEMES[t].primary,
                          boxShadow: themeName === t ? `0 0 8px ${THEMES[t].primary}` : 'none'
                        }}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                          themeName === t ? 'scale-125' : 'opacity-40 hover:opacity-100'
                        }`}
                        title={`${t.charAt(0).toUpperCase() + t.slice(1)} theme`}
                      />
                    ))}
                  </div>

                  {/* Minimize window button */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      playSound('pop');
                    }}
                    className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <FaMinus size={10} />
                  </button>
                </div>

              </div>

              {/* Chat Messages scroll area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar select-text">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed select-text font-mono ${
                        msg.sender === 'user' 
                          ? theme.bubbleUser 
                          : theme.bubbleBot
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Bot thinking placeholder */}
                {botState === 'thinking' && (
                  <div className="flex justify-start">
                    <div className={`rounded-2xl px-4 py-2.5 text-xs ${theme.bubbleBot} flex items-center space-x-1.5`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Quick Suggestion Pills */}
              <div className="px-4 py-2 border-t border-white/5 bg-slate-950/20 select-none">
                <div className="flex space-x-2 overflow-x-auto py-1 scrollbar-none snap-x whitespace-nowrap">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sug.text)}
                      style={{ borderColor: `${theme.primary}20` }}
                      className="inline-block px-3 py-1.5 text-[10px] text-slate-300 bg-slate-900/60 border hover:border-accent-cyan/40 hover:text-white rounded-lg snap-start cursor-pointer transition-colors duration-300"
                    >
                      {sug.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Submission Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 border-t border-white/5 bg-slate-950/50 flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me a resume query..."
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent-cyan text-xs text-white placeholder-slate-600 transition-all font-mono"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || botState === 'thinking'}
                  style={{ backgroundColor: theme.primary }}
                  className="p-2.5 text-black hover:opacity-90 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane size={11} />
                </button>
              </form>

            </motion.div>
          </div>
        )}

        {/* Closed Avatar Trigger (Moves randomly/bounces strictly along screen edges) */}
        {!isOpen && (
          <div 
            style={{ 
              position: 'fixed', 
              left: pos.x, 
              top: pos.y, 
              zIndex: 50,
              pointerEvents: 'auto' 
            }}
          >
            {/* Bouncing Avatar button */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsOpen(true);
                playSound('pop');
              }}
              className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none relative ${theme.avatarBg}`}
            >
              <span 
                className="absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none" 
                style={{ backgroundColor: theme.primary }}
              />
              <div className="pt-2">
                {renderFace()}
              </div>
              {botState === 'happy' && (
                <span className="absolute -top-1 -right-1 text-xs text-yellow-300 animate-bounce">✨</span>
              )}
            </motion.div>
          </div>
        )}

      </AnimatePresence>
    </div>
  );
}
