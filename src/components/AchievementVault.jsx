import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCertificate, FaAward, FaDatabase, FaCloud, FaJava, FaShieldAlt } from 'react-icons/fa';
import { certificationsData } from '../data/certifications';

// Helper to match icon badges
const getBadgeIcon = (title) => {
  if (title.includes('NPTEL')) return <FaAward size={24} className="text-accent-cyan group-hover:text-white transition-colors duration-300" />;
  if (title.includes('SAP')) return <FaDatabase size={24} className="text-accent-cyan group-hover:text-white transition-colors duration-300" />;
  if (title.includes('Oracle') || title.includes('OCI')) return <FaCloud size={24} className="text-accent-cyan group-hover:text-white transition-colors duration-300" />;
  return <FaJava size={24} className="text-accent-cyan group-hover:text-white transition-colors duration-300" />;
};

function VaultCard({ cert, index, isInView }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="w-full h-64 [perspective:1000px] group cursor-pointer"
    >
      {/* 3D Card Inner Container */}
      <div 
        className={`relative w-full h-full text-center transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : 'lg:group-hover:[transform:rotateY(180deg)]'
        }`}
      >
        
        {/* FRONT OF BADGE CARD */}
        <div className="absolute w-full h-full rounded-2xl bg-black border border-accent-cyan/15 group-hover:border-accent-cyan/40 group-hover:shadow-[0_0_25px_rgba(0,210,255,0.15)] p-6 flex flex-col justify-between items-center [backface-visibility:hidden] shadow-lg shadow-black/85 transition-all duration-300">
          {/* Radial backdrop glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent-sky/5 to-transparent rounded-2xl pointer-events-none" />

          {/* Badge Icon (Concentric circles) */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-accent-cyan/20 bg-slate-950 group-hover:border-accent-cyan/45 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.25)] group-hover:scale-105 transition-all duration-300">
            <div className="absolute inset-1.5 rounded-full border border-dashed border-accent-cyan/30 animate-spin-slow pointer-events-none" />
            {getBadgeIcon(cert.title)}
          </div>

          {/* Badge Details */}
          <div className="space-y-1.5 z-10">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wide group-hover:text-accent-cyan transition-colors duration-300">
              {cert.title}
            </h4>
            <p className="text-[10px] text-slate-500 font-mono">
              {cert.issuer}
            </p>
          </div>

          {/* Verified Label */}
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-cyan/15 group-hover:bg-accent-cyan/25 group-hover:border-accent-cyan/40 text-[9px] font-mono text-accent-cyan font-bold uppercase tracking-wider transition-all duration-300">
            <FaShieldAlt size={10} className="animate-pulse" />
            <span>Verified System</span>
          </div>
        </div>

        {/* BACK OF BADGE CARD (FLIPPED details) */}
        <div className="absolute w-full h-full rounded-2xl bg-slate-950 border border-accent-cyan/30 p-6 flex flex-col justify-between text-left [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-lg shadow-black/85">
          {/* Card meta header */}
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <span className="text-[9px] font-mono text-slate-500 uppercase">SYS_LOG_CREDENTIAL</span>
            <FaCertificate size={12} className="text-accent-cyan" />
          </div>

          {/* Detailed information */}
          <div className="space-y-3 mt-2">
            <div className="space-y-0.5">
              <span className="text-[8px] font-mono text-slate-500 uppercase">ID_CODE</span>
              <p className="text-xs font-mono text-white font-bold">{cert.code}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[8px] font-mono text-slate-500 uppercase">ACCOLADE_RATING</span>
              <p className="text-xs font-mono text-accent-cyan font-semibold">{cert.score}</p>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              {cert.details}
            </p>
          </div>

          {/* Instruction to flip back */}
          <span className="text-[8px] font-mono text-slate-600 uppercase text-center mt-auto font-bold tracking-wider">
            {isFlipped ? "Tap to Flip Front" : "Hover out to restore"}
          </span>
        </div>

      </div>
    </motion.div>
  );
}

export default function AchievementVault() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="certifications" className="py-20 relative overflow-hidden bg-dark-deep bg-grid border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-sky/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Spin slow animation helper style */}
      <style>{`
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 12s infinite linear;
        }
      `}</style>

      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h3 className="text-xs font-mono tracking-widest text-accent-cyan uppercase mb-2">
            Vault
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Achievement Credentials
          </h2>
          <div className="h-1 w-20 bg-accent-cyan mt-4 rounded-full" />
        </div>

        {/* 4 Digital Badges Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert, index) => (
            <VaultCard
              key={cert.id}
              cert={cert}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
