import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaFolderOpen, FaCertificate, FaGraduationCap, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: '#home', icon: <FaHome size={15} /> },
  { name: 'About', href: '#about', icon: <FaUser size={15} /> },
  { name: 'Skills', href: '#skills', icon: <FaCode size={15} /> },
  { name: 'Projects', href: '#projects', icon: <FaFolderOpen size={15} /> },
  { name: 'Certifications', href: '#certifications', icon: <FaCertificate size={15} /> },
  { name: 'Education', href: '#education', icon: <FaGraduationCap size={15} /> },
  { name: 'Contact', href: '#contact', icon: <FaEnvelope size={15} /> },
];

export default function SideDock() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Offset targeting upper-middle viewport scroll position
      const scrollPosition = window.scrollY + 200; 

      for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i];
        const section = document.querySelector(item.href);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.name.toLowerCase());
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const yOffset = -40; // Offset height
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(href.replace('#', ''));
    }
  };

  return (
    <>
      {/* Desktop Left Side Dock */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center py-8 px-3 rounded-full border border-accent-cyan/15 bg-black/80 backdrop-blur-xl gap-6 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.name.toLowerCase();
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative p-3.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer group ${
                isActive 
                  ? 'text-white bg-accent-blue/15 border border-accent-cyan/35 shadow-[0_0_12px_rgba(0,210,255,0.15)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {/* Icon with hover float */}
              <motion.span 
                whileHover={{ scale: 1.1, y: -1 }} 
                className={`relative z-10 transition-colors duration-300 ${
                  isActive ? 'text-accent-cyan' : 'text-slate-400 group-hover:text-white'
                }`}
              >
                {item.icon}
              </motion.span>

              {/* Glowing active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="activeDockDot"
                  className="absolute left-0 w-[3px] h-5 bg-accent-cyan rounded-full shadow-[0_0_8px_rgba(0,210,255,0.9)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}

              {/* Side sliding tooltip label */}
              <AnimatePresence>
                {hoveredItem === item.name && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 12, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-full ml-2 px-3.5 py-1.5 rounded-lg bg-slate-950 border border-accent-cyan/20 text-xs font-mono text-accent-cyan tracking-wider uppercase whitespace-nowrap shadow-2xl"
                  >
                    {item.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </motion.div>

      {/* Mobile Floating Bottom Dock */}
      <motion.div 
        initial={{ opacity: 0, y: 40, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex lg:hidden items-center py-2.5 px-4 rounded-full border border-accent-cyan/15 bg-black/85 backdrop-blur-xl gap-4 md:gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.9)] max-w-[90vw] overflow-x-auto scrollbar-none"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.name.toLowerCase();
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`relative p-3 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isActive 
                  ? 'text-accent-cyan bg-accent-blue/15 border border-accent-cyan/25' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className={`relative z-10 ${isActive ? 'text-accent-cyan' : 'text-slate-400'}`}>
                {item.icon}
              </span>

              {/* Active indication dot */}
              {isActive && (
                <span className="absolute -bottom-1.5 w-1 h-1 bg-accent-cyan rounded-full animate-pulse shadow-[0_0_6px_rgba(0,210,255,0.8)]" />
              )}
            </a>
          );
        })}
      </motion.div>
    </>
  );
}
