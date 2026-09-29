import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import Hero from './Hero';
import CladeAI from '../ui/CladeAI';
import { IntroSequence } from '../ui/IntroSequence';

import { LiveSignalSection, FingerprintSection, UnknownDetectionSection } from './landing/LandingStoryPart1';
import { AttackAncestrySection, CompositionSection } from './landing/LandingStoryPart2';
import { VerificationSection, IntelligenceLoopSection } from './landing/LandingStoryPart3';
import { FinalCTASection } from './landing/FinalCTASection';
import { AudioOrchestrator } from '../../audio/AudioOrchestrator';

const Landing = () => {
  const [introDone, setIntroDone] = useState(false);
  const [robotVoicePlayed, setRobotVoicePlayed] = useState(false);

  React.useEffect(() => {
    if (introDone && !robotVoicePlayed) {
      setRobotVoicePlayed(true);
      setTimeout(() => {
        AudioOrchestrator.playRobotVoice();
      }, 1500); // Wait for landing page to reveal before speaking
    }
  }, [introDone, robotVoicePlayed]);

  return (
    <>
      {/* Intro Sequence Overlay */}
      {!introDone && <IntroSequence onComplete={() => setIntroDone(true)} />}
      
      <div className={`min-h-screen bg-[#010103] text-white transition-opacity duration-[2000ms] ${introDone ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <main>
          {/* Main 3D Hero Viewport (Always 100vh) */}
          <Hero />
          
          {/* Visual Storytelling Flow */}
          <LiveSignalSection />
          <FingerprintSection />
          <UnknownDetectionSection />
          <AttackAncestrySection />
          <CompositionSection />
          <VerificationSection />
          <IntelligenceLoopSection />
          <FinalCTASection />
        </main>
        
        <CladeAI />

        {/* Audio Controls */}
        <div className="fixed bottom-6 left-6 z-[90] flex flex-col gap-2 font-mono text-[9px] uppercase tracking-widest pointer-events-auto">
           <button onClick={() => AudioOrchestrator.toggleMute()} className="text-left text-gray-500 hover:text-white transition-colors">
              TOGGLE MUTE
           </button>
           <button onClick={() => { setRobotVoicePlayed(false); setIntroDone(false); }} className="text-left text-gray-500 hover:text-white transition-colors">
              REPLAY INTRO
           </button>
           <button onClick={() => { AudioOrchestrator.playRobotVoice(); }} className="text-left text-gray-500 hover:text-white transition-colors">
              REPLAY CLADE VOICE
           </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
