import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projectsData } from '../data/projects';
import { FaGithub, FaExternalLinkAlt, FaDatabase, FaServer, FaUser, FaLaptopCode, FaCogs, FaCheck } from 'react-icons/fa';

// Helper to render dynamic HTML-based diagram for each project
function ProjectDiagram({ projectId }) {
  if (projectId === 1) {
    // Project 1: AI Self Management
    // User -> Streamlit -> FastAPI -> AI API -> Task/Activity Data
    return (
      <div className="relative w-full h-[180px] border border-white/5 bg-slate-950/60 rounded-xl flex items-center justify-between p-4 font-mono text-[9px] uppercase tracking-wide text-slate-400 overflow-hidden">
        {/* Animated flow dots on group hover */}
        <div className="absolute top-[90px] left-[15%] right-[15%] h-[1px] bg-accent-blue/20 pointer-events-none z-0" />
        <div className="absolute top-[90px] left-[15%] w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 animate-flow-p1" />

        {/* Nodes */}
        <div className="flex flex-col items-center space-y-1 z-10 w-[18%]">
          <FaUser size={14} className="text-slate-400" />
          <span>User</span>
        </div>
        
        <div className="flex flex-col items-center space-y-1 z-10 w-[20%] text-center p-1 border border-white/10 bg-black rounded">
          <FaLaptopCode size={14} className="text-accent-cyan" />
          <span>Streamlit</span>
        </div>
        
        <div className="flex flex-col items-center space-y-1 z-10 w-[20%] text-center p-1 border border-white/10 bg-black rounded">
          <FaServer size={14} className="text-accent-cyan" />
          <span>FastAPI</span>
        </div>
        
        <div className="flex flex-col items-center space-y-1 z-10 w-[20%] text-center p-1 border border-white/10 bg-black rounded">
          <FaCogs size={14} className="text-accent-cyan" />
          <span>AI APIs</span>
        </div>

        <div className="flex flex-col items-center space-y-1 z-10 w-[18%]">
          <FaDatabase size={14} className="text-slate-400" />
          <span>Data</span>
        </div>
      </div>
    );
  }

  if (projectId === 2) {
    // Project 2: Fuel Station
    // Admin/User -> Java Console App -> JDBC Layer -> MySQL Database
    return (
      <div className="relative w-full h-[180px] border border-white/5 bg-slate-950/60 rounded-xl flex items-center justify-between p-4 font-mono text-[9px] uppercase tracking-wide text-slate-400 overflow-hidden">
        <div className="absolute top-[90px] left-[15%] right-[15%] h-[1px] bg-accent-blue/20 pointer-events-none z-0" />
        <div className="absolute top-[90px] left-[15%] w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 animate-flow-p2" />

        <div className="flex flex-col items-center space-y-1 z-10 w-[20%]">
          <FaUser size={14} className="text-slate-400" />
          <span>Admin</span>
        </div>
        
        <div className="flex flex-col items-center space-y-1 z-10 w-[24%] text-center p-1.5 border border-white/10 bg-black rounded">
          <FaLaptopCode size={14} className="text-accent-cyan" />
          <span>Java App</span>
        </div>
        
        <div className="flex flex-col items-center space-y-1 z-10 w-[24%] text-center p-1.5 border border-white/10 bg-black rounded">
          <FaServer size={14} className="text-accent-cyan" />
          <span>JDBC</span>
        </div>

        <div className="flex flex-col items-center space-y-1 z-10 w-[20%]">
          <FaDatabase size={14} className="text-slate-400" />
          <span>MySQL</span>
        </div>
      </div>
    );
  }

  // Project 3: Online Voting Portal
  // Voter -> Web Portal -> PHP Backend -> MySQL Database -> Result View
  return (
    <div className="relative w-full h-[180px] border border-white/5 bg-slate-950/60 rounded-xl flex items-center justify-between p-4 font-mono text-[9px] uppercase tracking-wide text-slate-400 overflow-hidden">
      <div className="absolute top-[90px] left-[15%] right-[15%] h-[1px] bg-accent-blue/20 pointer-events-none z-0" />
      <div className="absolute top-[90px] left-[15%] w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 animate-flow-p3" />

      <div className="flex flex-col items-center space-y-1 z-10 w-[18%]">
        <FaUser size={14} className="text-slate-400" />
        <span>Voter</span>
      </div>
      
      <div className="flex flex-col items-center space-y-1 z-10 w-[20%] text-center p-1 border border-white/10 bg-black rounded">
        <FaLaptopCode size={14} className="text-accent-cyan" />
        <span>Portal</span>
      </div>
      
      <div className="flex flex-col items-center space-y-1 z-10 w-[20%] text-center p-1 border border-white/10 bg-black rounded">
        <FaServer size={14} className="text-accent-cyan" />
        <span>PHP Api</span>
      </div>
      
      <div className="flex flex-col items-center space-y-1 z-10 w-[20%] text-center p-1 border border-white/10 bg-black rounded">
        <FaDatabase size={14} className="text-accent-cyan" />
        <span>MySQL</span>
      </div>

      <div className="flex flex-col items-center space-y-1 z-10 w-[18%]">
        <FaLaptopCode size={14} className="text-slate-400" />
        <span>Results</span>
      </div>
    </div>
  );
}

export default function ProjectArchitecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-dark-bg border-b border-white/5">
      {/* Background radial blue glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-accent-sky/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Styled keyframe animations for flow dot connections */}
      <style>{`
        @keyframes flow1 {
          0% { left: 15%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 85%; opacity: 0; }
        }
        @keyframes flow2 {
          0% { left: 20%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { left: 80%; opacity: 0; }
        }
        @keyframes flow3 {
          0% { left: 15%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 85%; opacity: 0; }
        }
        .group:hover .animate-flow-p1 {
          animation: flow1 2.2s infinite linear;
        }
        .group:hover .animate-flow-p2 {
          animation: flow2 1.8s infinite linear;
        }
        .group:hover .animate-flow-p3 {
          animation: flow3 2.5s infinite linear;
        }
      `}</style>

      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Centered Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h3 className="text-xs font-mono tracking-widest text-accent-cyan uppercase mb-2">
            Showcase
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Architecture Case Studies
          </h2>
          <div className="h-1 w-20 bg-accent-cyan mt-4 rounded-full" />
        </div>

        {/* Large Horizontal System Cards */}
        <div className="space-y-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -4, scale: 1.005 }}
              className="p-[1px] rounded-2xl bg-gradient-to-r from-white/5 via-white/5 to-white/5 hover:from-accent-cyan/25 hover:to-accent-blue/25 transition-all duration-500 shadow-xl shadow-black/85 group"
            >
              <div className="bg-black/95 rounded-2xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left border border-white/5 group-hover:border-transparent">
                
                {/* LEFT: Project Name and Description */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono font-bold tracking-wide uppercase px-2 py-0.5 bg-white/5 border border-white/10 rounded text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-accent-cyan transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* CENTER: Mini Architecture Diagram */}
                <div className="lg:col-span-4 flex flex-col space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1">Architecture_Flow</span>
                  <ProjectDiagram projectId={project.id} />
                </div>

                {/* RIGHT: Features & Buttons */}
                <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Features</span>
                    <div className="space-y-1.5">
                      {project.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-2 text-[10px] md:text-[11px]">
                          <span className="mt-0.5 p-0.5 bg-accent-cyan/10 border border-accent-cyan/30 rounded text-accent-cyan shrink-0">
                            <FaCheck size={6} />
                          </span>
                          <span className="text-slate-300 leading-normal font-medium line-clamp-2">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action buttons */}
                  <div className="flex flex-col space-y-2 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] uppercase tracking-wider rounded transition-all duration-300 flex items-center justify-center space-x-1.5"
                      >
                        <FaGithub size={12} className="text-slate-300" />
                        <span>View GitHub</span>
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-2 bg-gradient-to-r from-accent-sky to-accent-blue hover:shadow-[0_0_15px_rgba(0,210,255,0.35)] text-white font-mono text-[10px] uppercase tracking-wider rounded transition-all duration-300 flex items-center justify-center space-x-1.5"
                      >
                        <FaExternalLinkAlt size={10} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
