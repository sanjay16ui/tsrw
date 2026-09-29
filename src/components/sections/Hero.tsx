import React from 'react';
import HeroScene from '../3d/HeroScene';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="overview" className="relative h-[100vh] w-full flex items-center overflow-hidden bg-[#010103]">
      {/* 3D Robot Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 h-full items-center pointer-events-none">
        
        {/* Left Side: 40% Text Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 pointer-events-auto mt-20 lg:mt-0"
        >
          <p className="text-primary font-mono tracking-widest text-[10px] mb-6 uppercase border-l-2 border-primary pl-3">
            Open-World Cyber Defense
          </p>
          
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-bold mb-4 tracking-tighter text-white leading-none">
            CLADE
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8 tracking-tight">
            Trace the unknown.
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base font-light max-w-sm mb-12">
            AI-powered attack ancestry for open-world cyber defense.
          </p>
          
          <div className="flex flex-wrap gap-4 pointer-events-auto">
            <button onClick={() => window.location.href = '/app'} className="px-8 py-3 bg-primary text-black font-semibold text-sm tracking-wide rounded-none hover:bg-white transition-colors">
              ENTER CLADE
            </button>
            <button onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-transparent border border-surface-border text-gray-300 hover:border-primary hover:text-primary transition-colors text-sm font-medium rounded-none">
              EXPLORE
            </button>
          </div>
        </motion.div>

        {/* Right Side: 60% Area for the Robot and HUD */}
        <div className="hidden lg:block lg:col-span-7 relative h-full pointer-events-none">
          {/* Subtle HUD elements placed around the large robot area */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="absolute top-[25%] right-[5%] flex items-center gap-2"
          >
            <div className="w-1 h-1 bg-primary"></div>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">CLADE CORE</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="absolute top-[50%] left-[10%] flex items-center gap-2"
          >
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">ANCESTRY ENGINE</div>
            <div className="w-8 h-[1px] bg-primary/30"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="absolute bottom-[20%] right-[10%] flex items-center gap-2"
          >
            <div className="w-1 h-1 bg-secondary"></div>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">OPEN-WORLD MODE</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="absolute bottom-[35%] left-[20%] flex items-center gap-2"
          >
            <div className="w-1 h-1 bg-white/20"></div>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">DREAM-RSI</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
