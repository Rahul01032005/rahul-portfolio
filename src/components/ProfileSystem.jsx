import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTerminal, FaCode, FaServer, FaGraduationCap, FaAward, FaDatabase } from 'react-icons/fa';

// Viewport triggered counter component
function Counter({ value, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(value);
    if (start === end) return;

    const totalFrames = 100;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = start + (end - start) * (progress * (2 - progress));
      
      setCount(current);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono font-extrabold text-2xl md:text-3xl text-accent-cyan">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function ProfileSystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const stats = [
    {
      id: 1,
      value: "3",
      suffix: "+",
      label: "Projects Built",
      desc: "Deployable systems",
      icon: <FaCode size={16} className="text-accent-cyan" />,
      decimals: 0
    },
    {
      id: 2,
      value: "10",
      suffix: "+",
      label: "Modules Developed",
      desc: "API endpoints & tasks",
      icon: <FaServer size={16} className="text-accent-cyan" />,
      decimals: 0
    },
    {
      id: 3,
      value: "9.31",
      suffix: "",
      label: "BCA CGPA",
      desc: "Academic distinction",
      icon: <FaGraduationCap size={16} className="text-accent-cyan" />,
      decimals: 2
    },
    {
      id: 4,
      value: "90",
      suffix: "%",
      label: "NPTEL Score",
      desc: "Elite Gold Scholar",
      icon: <FaAward size={16} className="text-accent-cyan" />,
      decimals: 0
    },
    {
      id: 5,
      value: "100",
      suffix: "%",
      label: "Backend & Database",
      desc: "FastAPI / SQL Focus",
      icon: <FaDatabase size={16} className="text-accent-cyan" />,
      decimals: 0
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-dark-bg border-b border-white/5">
      {/* Background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-sky/5 rounded-full blur-[130px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Centered Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h3 className="text-xs font-mono tracking-widest text-accent-cyan uppercase mb-2">
            Profile_System
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            System Configuration
          </h2>
          <div className="h-1 w-20 bg-accent-cyan mt-4 rounded-full" />
        </div>

        {/* Profile System Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Terminal style code compiler view */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between rounded-2xl bg-black border border-accent-cyan/15 shadow-2xl relative overflow-hidden"
          >
            {/* Window title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-white/5">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">developer.js</span>
              <FaTerminal size={10} className="text-slate-600" />
            </div>

            {/* Code Body */}
            <div className="p-6 md:p-8 font-mono text-xs md:text-sm text-slate-300 text-left leading-relaxed overflow-x-auto select-all">
              <div>
                <span className="text-accent-cyan">const</span> <span className="text-white">developer</span> = &#123;
              </div>
              <div className="pl-6 md:pl-8">
                <span className="text-slate-400">name:</span> <span className="text-blue-400">"Rahul E"</span>,
              </div>
              <div className="pl-6 md:pl-8">
                <span className="text-slate-400">role:</span> <span className="text-blue-400">"Backend Developer"</span>,
              </div>
              <div className="pl-6 md:pl-8">
                <span className="text-slate-400">location:</span> <span className="text-blue-400">"Bengaluru, Karnataka"</span>,
              </div>
              <div className="pl-6 md:pl-8">
                <span className="text-slate-400">focus:</span> [
                <span className="text-blue-400">"Backend"</span>, <span className="text-blue-400">"Databases"</span>, <span className="text-blue-400">"APIs"</span>, <span className="text-blue-400">"DSA"</span>
                ],
              </div>
              <div className="pl-6 md:pl-8">
                <span className="text-slate-400">goal:</span> <span className="text-blue-400">"SDE / Software Developer Role"</span>
              </div>
              <div>&#125;;</div>
              
              {/* Additional short notice */}
              <div className="mt-6 pt-6 border-t border-white/5 text-[11px] md:text-xs font-sans text-slate-400 font-medium">
                I am Rahul E, an entry-level software developer based in Bengaluru, Karnataka. I focus on backend development, database integration, API development, automation, and user-facing dashboards. I have built multiple projects involving CRUD workflows, databases, REST APIs, Java, Python, PHP, MySQL, and web structures.
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Stats Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl bg-black/90 border border-white/5 hover:border-accent-cyan/25 transition-all duration-300 flex flex-col justify-between text-left hover:shadow-[0_0_15px_rgba(0,210,255,0.1)] group ${
                  stat.id === 5 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:border-accent-cyan/35 transition-colors">
                    {stat.icon}
                  </div>
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm md:text-base font-display">{stat.label}</h4>
                  <p className="text-slate-500 text-[10px] md:text-xs mt-0.5 font-medium">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
