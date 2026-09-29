import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioOrchestrator } from '../../audio/AudioOrchestrator';

export const IntroSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0); 
  const [isReady, setIsReady] = useState(AudioOrchestrator.isReady());

  useEffect(() => {
    AudioOrchestrator.preload();
    AudioOrchestrator.onReadyChange = () => setIsReady(AudioOrchestrator.isReady());
    
    // Safety fallback just in case canplaythrough never fires
    const timeout = setTimeout(() => setIsReady(true), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const startIntro = () => {
    AudioOrchestrator.init();
    
    // START VISUAL AND AUDIO AT EXACT SAME MOMENT
    AudioOrchestrator.playIntro();
    setStep(1);

    setTimeout(() => setStep(2), 1500);
    setTimeout(() => setStep(3), 3500);
    setTimeout(() => setStep(4), 5000); // Visual ends, wait for audio 'ended'
  };

  useEffect(() => {
    if (step >= 1) {
      const handleEnded = () => {
        AudioOrchestrator.stopIntro();
        setStep(5);
        setTimeout(() => onComplete(), 1000); 
      };
      
      AudioOrchestrator.introAudio.addEventListener('ended', handleEnded);
      
      return () => {
        AudioOrchestrator.introAudio.removeEventListener('ended', handleEnded);
      };
    }
  }, [step, onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${step === 5 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
      
      <AnimatePresence mode="wait">
        {step === 0 && !isReady && (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            className="text-white font-mono text-xs tracking-widest uppercase animate-pulse"
          >
            PREPARING CLADE...
          </motion.div>
        )}

        {step === 0 && isReady && (
          <motion.button
            key="btn"
            exit={{ opacity: 0 }}
            onClick={startIntro}
            className="px-8 py-3 border border-white/20 text-white font-mono text-xs tracking-widest uppercase hover:bg-white/10 hover:border-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.1)]"
          >
            INITIALIZE CLADE
          </motion.button>
        )}

        {step === 1 && (
          <motion.div
            key="point"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_#00f0ff]"
          />
        )}

        {step === 2 && (
          <motion.div
            key="pulse"
            className="relative flex items-center justify-center w-full h-full"
          >
            {/* The Pulse */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 30, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-4 h-4 rounded-full border border-primary absolute"
            />
            
            {/* Data Field / Fragments */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 opacity-50 font-mono text-[10px] text-primary tracking-[0.3em]">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>INITIALIZING CORE</motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>BEHAVIOR ENGINE</motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>OPEN-WORLD MODE</motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>ANCESTRY ENGINE</motion.div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-white font-bold tracking-[0.5em] text-4xl md:text-8xl relative z-10"
          >
            CLADE
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent mix-blend-overlay animate-[scan_2s_linear_infinite]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 4: The audio is playing, the overlay becomes transparent so the 3D scene shows, 
          but we keep a black background behind the scene if needed. 
          Actually, we just fade out the black bg slightly to reveal the robot. */}
      {step === 4 && (
        <motion.div 
          initial={{ opacity: 1 }} animate={{ opacity: 0.4 }} transition={{ duration: 3 }}
          className="absolute inset-0 bg-black pointer-events-none" 
        />
      )}
      
      {/* Skip button available during entire sequence */}
      {step >= 1 && step < 5 && (
        <button 
          onClick={() => { AudioOrchestrator.stopIntro(); setStep(5); setTimeout(() => onComplete(), 1000); }} 
          className="absolute bottom-10 right-10 text-[10px] font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest z-[110]"
        >
          SKIP SEQUENCE
        </button>
      )}
    </div>
  );
};
