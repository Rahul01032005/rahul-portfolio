import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTerminal, FaGraduationCap, FaCodeBranch, FaCheckCircle } from 'react-icons/fa';

export default function EducationTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Visvesvaraya Technological University",
      period: "Expected Sept 2027",
      grade: "Status: Active Pursuing",
      desc: "Advanced software engineering, database management systems, and enterprise logic integrations."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Mangalore University",
      period: "Aug 2022 - Aug 2025",
      grade: "CGPA: 9.31 / 10 (Distinction)",
      desc: "Core algorithms, database normalization, structural software development, and programming systems."
    }
  ];

  const coursework = [
    "Data Structures",
    "Object-Oriented Programming",
    "DBMS & SQL Queries",
    "Operating Systems",
    "Software Engineering",
    "System Diagnostics"
  ];

  return (
    <section id="education" className="py-20 relative overflow-hidden bg-dark-bg border-b border-white/5">
      {/* Background blurs */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-accent-sky/5 rounded-full blur-[130px] pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h3 className="text-xs font-mono tracking-widest text-accent-cyan uppercase mb-2">
            Timeline
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Academic Log
          </h2>
          <div className="h-1 w-20 bg-accent-cyan mt-4 rounded-full" />
        </div>

        {/* Terminal Timelines window console */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-black border border-accent-cyan/15 shadow-2xl relative overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-white/5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] font-mono text-slate-500">education_log.sh</span>
            <FaTerminal size={10} className="text-slate-600" />
          </div>

          <div className="p-6 md:p-8 font-mono text-xs md:text-sm text-slate-300">
            {/* Terminal Command trigger */}
            <div className="flex items-center space-x-2 text-white font-bold mb-8">
              <span className="text-accent-cyan">&gt;</span>
              <span className="text-gradient-blue font-extrabold">education.timeline()</span>
            </div>

            {/* Timelines tree */}
            <div className="pl-4 md:pl-6 border-l border-accent-cyan/20 relative space-y-10">
              
              {/* Glowing connecting line */}
              <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-cyan via-accent-sky to-transparent" />

              {education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Glowing Node Dot */}
                  <div className="absolute left-[-21px] md:left-[-31px] top-1.5 w-[9px] h-[9px] rounded-full bg-black border-2 border-accent-cyan group-hover:bg-accent-cyan group-hover:shadow-[0_0_12px_rgba(0,210,255,0.8)] transition-all duration-300 z-10" />

                  {/* Card readout */}
                  <div className="bg-slate-950/60 p-5 rounded-xl border border-white/5 group-hover:border-accent-cyan/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                      <h4 className="text-sm md:text-base font-bold text-white font-display">
                        {edu.degree}
                      </h4>
                      <span className="text-[10px] font-bold text-accent-cyan px-2 py-0.5 rounded bg-accent-blue/10 border border-accent-cyan/20 w-fit">
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-[11px] font-medium text-slate-400 mb-1">{edu.institution}</p>
                    <p className="text-slate-300 text-xs mt-3 leading-relaxed">{edu.desc}</p>
                    
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                      <span>MODULE_ACADEMIC_OK</span>
                      <span className="text-accent-cyan font-bold uppercase">{edu.grade}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coursework execution cmd */}
            <div className="flex items-center space-x-2 text-white font-bold mt-10 mb-6">
              <span className="text-accent-cyan">&gt;</span>
              <span className="text-gradient-blue font-extrabold">education.getRelevantCoursework()</span>
            </div>

            {/* Coursework list pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {coursework.map((course, idx) => (
                <div 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-[10px] md:text-xs text-slate-300 flex items-center space-x-1.5 hover:border-accent-cyan/35 hover:text-white transition-colors duration-300"
                >
                  <FaCheckCircle size={10} className="text-accent-cyan" />
                  <span>{course}</span>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
