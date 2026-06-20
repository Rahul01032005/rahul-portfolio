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
  const [isOpen, setIsOpen] = useState(false);

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
      // Dynamic offset: desktop side dock doesn't need to clear a header, but mobile top header is 64px
      const yOffset = window.innerWidth >= 1024 ? -40 : -80; 
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

      {/* Mobile Top Header Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 z-50 flex lg:hidden items-center justify-between px-6 bg-black/85 backdrop-blur-md border-b border-accent-cyan/10">
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="text-base font-bold font-display text-white tracking-wider cursor-pointer select-none"
        >
          <span className="text-accent-cyan font-extrabold">&lt;</span>
          <span className="font-sans">Rahul E</span>
          <span className="text-accent-cyan font-extrabold">/&gt;</span>
        </a>

        {/* Animated Hamburger Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white p-2.5 rounded-lg bg-white/5 border border-white/10 focus:outline-none transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 relative flex items-center justify-center">
            <span className={`absolute w-5 h-[1.5px] bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute w-5 h-[1.5px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute w-5 h-[1.5px] bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Navigation Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-40 flex lg:hidden flex-col items-center justify-center bg-black/95 backdrop-blur-2xl px-6 py-10"
          >
            {/* Background micro grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,210,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,210,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-sky/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Nav list with staggering items */}
            <div className="flex flex-col items-center space-y-5 w-full max-w-sm z-10">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.name.toLowerCase();
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleLinkClick(e, item.href);
                      setIsOpen(false);
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`w-full py-3.5 px-6 rounded-xl font-mono text-xs uppercase tracking-widest flex items-center justify-between border transition-all duration-300 ${
                      isActive
                        ? 'bg-accent-blue/15 border-accent-cyan/35 text-white shadow-[0_0_15px_rgba(0,210,255,0.15)] font-bold'
                        : 'bg-black/60 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`${isActive ? 'text-accent-cyan' : 'text-slate-500'}`}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    {isActive ? (
                      <span className="text-[10px] font-mono text-accent-cyan animate-pulse">&gt;&gt;</span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-700">&gt;</span>
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Menu footer branding */}
            <div className="mt-auto text-[9px] font-mono text-slate-600 uppercase tracking-widest z-10 select-none">
              SYS_NAV_MENU_CONNECTED
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
