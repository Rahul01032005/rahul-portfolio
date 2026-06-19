import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaServer } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const yOffset = -40;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-white/5 py-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-accent-sky/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-left font-mono">
        
        {/* Left branding */}
        <div className="text-center md:text-left space-y-1 select-none">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="inline-block text-base font-bold font-display text-white tracking-wider hover:opacity-90">
            <span className="text-accent-cyan font-extrabold">&lt;</span>
            <span className="font-sans">Rahul E</span>
            <span className="text-accent-cyan font-extrabold">/&gt;</span>
          </a>
          <p className="text-[9px] text-slate-500 font-medium">
            SDE_CENTRAL_COMMAND_CENTER_SYS
          </p>
        </div>

        {/* Center credits */}
        <div className="text-center max-w-sm">
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
            [ React + Tailwind CSS v4 + R3F Stack ]
          </p>
          <p className="text-[9px] text-slate-600 mt-1 select-none">
            &copy; {currentYear} Rahul E. System status: online.
          </p>
        </div>

        {/* Right social connectors */}
        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/Rahul01032005"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-accent-cyan/35 transition-all duration-300 hover:scale-[1.03]"
            title="GitHub"
          >
            <FaGithub size={15} />
          </a>
          <a
            href="https://linkedin.com/in/rahul-e-5624b5287"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-accent-cyan/35 transition-all duration-300 hover:scale-[1.03]"
            title="LinkedIn"
          >
            <FaLinkedin size={15} />
          </a>
          <a
            href="mailto:rahul01032005@gmail.com"
            className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-accent-cyan/35 transition-all duration-300 hover:scale-[1.03]"
            title="Email"
          >
            <FaEnvelope size={15} />
          </a>
        </div>

      </div>
    </footer>
  );
}
