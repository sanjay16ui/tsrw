import React from 'react';
import { motion } from 'framer-motion';

const ThreatShadow = () => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-light tracking-widest text-white uppercase">Threat Shadow Memory</h1>
      </div>

      <div className="flex-1 glass-panel border border-white/5 bg-[#030406]/50 p-8 flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col h-full justify-center">
          
          <div className="text-center mb-16">
             <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-2">PERSISTENT MEMORY</div>
             <div className="text-2xl font-light text-white">THR-00231</div>
          </div>

          {/* Timeline visualization */}
          <div className="relative flex justify-between items-center w-full">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2"></div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-gray-600 border-2 border-[#030406]"></div>
              <div className="text-center">
                <div className="text-[10px] font-mono text-gray-500 uppercase">FIRST OBSERVED</div>
                <div className="text-xs font-mono text-white mt-1">OCT 2025</div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-[#111] border-2 border-gray-600"></div>
              <div className="text-center">
                <div className="text-[10px] font-mono text-gray-500 uppercase">DORMANT</div>
                <div className="text-xs font-mono text-gray-500 mt-1">6 MONTHS</div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-accent border-4 border-[#030406] shadow-[0_0_15px_rgba(255,0,170,0.5)] animate-pulse"></div>
              <div className="text-center">
                <div className="text-[10px] font-mono text-accent uppercase font-bold">REACTIVATION</div>
                <div className="text-xs font-mono text-white mt-1">TODAY (CLD-2026-0142)</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ThreatShadow;
