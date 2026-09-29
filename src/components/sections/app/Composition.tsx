import React, { useState } from 'react';
import { MOCK_CASE } from '../../../data/mockData';
import { motion } from 'framer-motion';

const Composition = () => {
  const [selectedHypothesis, setSelectedHypothesis] = useState(MOCK_CASE.composition[2]); // Default to highest

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-light tracking-widest text-white uppercase">Multi-Parent Composition</h1>
        <div className="text-[10px] font-mono text-gray-500">TESTING HYPOTHESES FOR {MOCK_CASE.id}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Hypotheses List */}
        <div className="glass-panel border border-white/5 bg-[#030406]/50 flex flex-col p-4">
          <div className="text-xs font-mono text-gray-400 mb-6 px-2">CANDIDATE COMBINATIONS</div>
          <div className="flex flex-col gap-2">
            {MOCK_CASE.composition.map((comp, i) => (
              <div 
                key={i}
                onClick={() => setSelectedHypothesis(comp)}
                className={`p-4 border font-mono cursor-pointer transition-all ${selectedHypothesis.combination === comp.combination ? 'border-primary bg-primary/5' : 'border-white/5 bg-transparent hover:border-white/20'}`}
              >
                <div className={`text-[10px] mb-2 ${selectedHypothesis.combination === comp.combination ? 'text-primary' : 'text-gray-500'}`}>HYPOTHESIS {i + 1}</div>
                <div className="text-xs text-white mb-4">{comp.combination}</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-[#111]">
                    <div className={`h-full ${comp.score > 80 ? 'bg-primary' : 'bg-gray-500'}`} style={{ width: `${comp.score}%` }}></div>
                  </div>
                  <div className={`text-[10px] ${comp.score > 80 ? 'text-primary' : 'text-gray-500'}`}>{comp.score}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Combination Graph */}
        <div className="lg:col-span-2 glass-panel border border-white/5 bg-[#030406]/50 relative flex items-center justify-center p-8 overflow-hidden">
           
           {/* Decorative Background */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

           <div className="w-full max-w-2xl flex flex-col items-center gap-12 relative z-10">
              
              {/* Parents */}
              <div className="w-full flex justify-around">
                {selectedHypothesis.combination.split(' + ').map((parent, i) => (
                  <motion.div 
                    key={`${selectedHypothesis.combination}-${parent}-${i}`}
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className="w-32 h-32 rounded-sm border border-gray-600 bg-[#030406] flex items-center justify-center relative shadow-lg"
                  >
                    <div className="text-xs font-mono text-gray-300 text-center px-2">{parent}</div>
                    {/* Connecting line down */}
                    <div className="absolute -bottom-12 left-1/2 w-[1px] h-12 bg-gray-600"></div>
                  </motion.div>
                ))}
              </div>

              {/* Composition Node */}
              <div className="relative w-full flex justify-center">
                 {/* Horizontal connecting line if multiple parents */}
                 {selectedHypothesis.combination.includes('+') && (
                   <div className="absolute top-0 w-1/2 h-[1px] bg-gray-600"></div>
                 )}
                 {/* Vertical line down to result */}
                 <div className="w-[1px] h-8 bg-primary animate-pulse"></div>
              </div>

              {/* Resulting Unknown */}
              <motion.div 
                key={`${selectedHypothesis.combination}-result`}
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
                className="w-48 h-48 rounded-sm border border-primary bg-primary/5 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.15)] relative"
              >
                <div className="absolute top-2 left-2 right-2 flex justify-between text-[8px] font-mono text-primary opacity-50">
                  <span>CLD-2026-0142</span>
                  <span>{selectedHypothesis.score}% MATCH</span>
                </div>
                <div className="text-sm font-mono text-white text-center px-4 mt-2">OBSERVED BEHAVIOR</div>
                
                {/* Simulated fingerprint wave */}
                <div className="mt-6 flex items-end gap-1 h-8">
                   {[...Array(12)].map((_, i) => (
                     <motion.div 
                       key={i} 
                       animate={{ height: ['20%', '100%', '20%'] }} 
                       transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                       className="w-1 bg-primary/60"
                     ></motion.div>
                   ))}
                </div>
              </motion.div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default Composition;
