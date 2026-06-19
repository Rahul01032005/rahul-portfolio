import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CodeRunnerLoader from './components/CodeRunnerLoader';
import CursorGlow from './components/CursorGlow';
import SideDock from './components/SideDock';
import HeroCommandCenter from './components/HeroCommandCenter';
import ProfileSystem from './components/ProfileSystem';
import SkillMatrix from './components/SkillMatrix';
import ProjectArchitecture from './components/ProjectArchitecture';
import EducationTimeline from './components/EducationTimeline';
import AchievementVault from './components/AchievementVault';
import ContactTerminal from './components/ContactTerminal';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <CodeRunnerLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-dark-deep text-slate-100 min-h-screen selection:bg-accent-cyan/25 selection:text-white overflow-x-hidden font-sans"
        >
          {/* Global Cursor Glow Parallax */}
          <CursorGlow />

          {/* Side Dock Navigation Menu */}
          <SideDock />

          {/* Command Center Workspace Sections */}
          <main>
            <HeroCommandCenter />
            <ProfileSystem />
            <SkillMatrix />
            <ProjectArchitecture />
            <EducationTimeline />
            <AchievementVault />
            <ContactTerminal />
          </main>

          {/* Footer Branding */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
