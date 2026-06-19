import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaServer, FaCode, FaDatabase, FaLaptopCode, FaTools, FaShieldAlt, FaCloud } from 'react-icons/fa';
import { skillsData } from '../data/skills';

// Helper to assign icons to categories
const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'programming languages': return <FaCode size={16} />;
    case 'backend development': return <FaServer size={16} />;
    case 'databases': return <FaDatabase size={16} />;
    case 'frontend': return <FaLaptopCode size={16} />;
    case 'software engineering': return <FaShieldAlt size={16} />;
    case 'developer tools': return <FaTools size={16} />;
    default: return <FaCloud size={16} />;
  }
};

export default function SkillMatrix() {
  const [activeCategory, setActiveCategory] = useState(skillsData[0].category);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const activeSkills = skillsData.find(cat => cat.category === activeCategory) || skillsData[0];

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-dark-deep bg-grid border-b border-white/5">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent-sky/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h3 className="text-xs font-mono tracking-widest text-accent-cyan uppercase mb-2">
            Skill_Matrix
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            System Competency Core
          </h2>
          <div className="h-1 w-20 bg-accent-cyan mt-4 rounded-full" />
        </div>

        {/* Command Center Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Categories selector panel */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* Backend Core Center Badge */}
            <div className="p-4 rounded-xl bg-black border border-accent-cyan/25 flex items-center justify-between text-left select-none shadow-md">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-accent-blue/10 text-accent-cyan border border-accent-cyan/30 animate-pulse">
                  <FaServer size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">Backend Core</h4>
                  <p className="text-[10px] font-mono text-slate-500">ROOT_DIRECTORY</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">Active</span>
            </div>

            {/* Orbit Category Buttons */}
            <div className="space-y-2.5">
              {skillsData.map((cat, idx) => {
                const isActive = activeCategory === cat.category;
                return (
                  <motion.button
                    key={cat.category}
                    onClick={() => setActiveCategory(cat.category)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className={`w-full p-4 rounded-xl text-left font-mono text-xs uppercase tracking-wider flex items-center justify-between border transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-accent-blue/15 border-accent-cyan/40 text-white shadow-[0_0_15px_rgba(0,210,255,0.15)] font-bold' 
                        : 'bg-black/80 border-white/5 hover:border-white/15 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`${isActive ? 'text-accent-cyan' : 'text-slate-500'}`}>
                        {getCategoryIcon(cat.category)}
                      </span>
                      <span>{cat.category}</span>
                    </div>
                    {isActive ? (
                      <span className="text-[10px] font-mono text-accent-cyan animate-pulse">&gt;&gt;</span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-600">&gt;</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

          </div>

          {/* RIGHT: Selected Category skills matrix output details */}
          <div className="lg:col-span-7">
            <div className="bg-black/95 p-6 md:p-8 rounded-2xl border border-accent-cyan/15 hover:border-accent-cyan/30 shadow-2xl h-full flex flex-col justify-between transition-all duration-300">
              
              <div className="space-y-6">
                {/* Header info */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <div className="text-left">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Selected_Submodule</span>
                    <h4 className="text-lg font-bold font-display text-white mt-0.5">{activeSkills.category}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-accent-cyan font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase">
                    Compiled: OK
                  </span>
                </div>

                {/* Grid layout of actual skills inside the category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AnimatePresence mode="wait">
                    {activeSkills.skills.map((skill, sIdx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, delay: sIdx * 0.04 }}
                        whileHover={{ y: -3 }}
                        className="p-4 rounded-xl bg-slate-950 border border-white/5 hover:border-accent-cyan/30 transition-all duration-300 flex flex-col justify-between h-[84px]"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-white tracking-wide uppercase">
                            {skill.name}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Custom visual progress bar */}
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: 0.15 + sIdx * 0.02 }}
                            className={`h-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Console logs notice */}
              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500 text-left select-none uppercase tracking-wider">
                &gt;&gt; Active matrix module: {activeCategory.replace(/\s+/g, '_').toLowerCase()}.sh loaded successfully.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
