import React, { useState } from 'react';
import { MOCK_CASE } from '../../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const Ancestry = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(MOCK_CASE.ancestryCandidates[0]);

  return (
    <div className="flex h-full gap-6">
      
      {/* Node Graph Area */}
      <div className="flex-[2] glass-panel border border-white/5 bg-[#030406]/50 relative overflow-hidden flex items-center justify-center">
         <div className="absolute top-6 left-6 text-xs font-mono text-gray-400">ATTACK ANCESTRY GRAPH</div>
         
         <div className="relative w-full h-[500px] flex items-center justify-center">
            
            {/* Center Unknown Node */}
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}
              className="absolute z-20 w-32 h-32 rounded-full border border-accent bg-[#030406] flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,0,170,0.2)]"
            >
              <div className="text-[10px] text-gray-400 font-mono">UNKNOWN</div>
              <div className="text-sm text-white font-mono text-center leading-tight mt-1">{MOCK_CASE.id}</div>
              <div className="text-accent text-[10px] font-mono mt-2 animate-pulse">NOVELTY {MOCK_CASE.novelty}%</div>
            </motion.div>

            {/* Candidate Nodes & Lines */}
            {MOCK_CASE.ancestryCandidates.map((cand, i) => {
              const angle = (i * (Math.PI * 2)) / MOCK_CASE.ancestryCandidates.length;
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              const isSelected = selectedCandidate.name === cand.name;

              return (
                <React.Fragment key={cand.name}>
                  {/* SVG Connecting Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                    <motion.line 
                      initial={{ pathLength: 0, opacity: 0 }} 
                      animate={{ pathLength: 1, opacity: isSelected ? 0.8 : 0.2 }} 
                      transition={{ duration: 1, delay: i * 0.2 }}
                      x1="50%" y1="50%" 
                      x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} 
                      stroke={cand.color} strokeWidth={isSelected ? 2 : 1} strokeDasharray={isSelected ? "none" : "4 4"}
                    />
                  </svg>

                  {/* Node */}
                  <motion.div
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x, y }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    onClick={() => setSelectedCandidate(cand)}
                    className={`absolute z-10 w-24 h-24 rounded-full border flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 
                      ${isSelected ? 'bg-[#030406] shadow-lg' : 'bg-[#030406]/80'}
                    `}
                    style={{ borderColor: cand.color, boxShadow: isSelected ? `0 0 20px ${cand.color}40` : 'none' }}
                  >
                    <div className="text-[9px] text-gray-400 font-mono text-center px-2">{cand.name}</div>
                    <div className="text-xs font-mono mt-1" style={{ color: cand.color }}>{cand.probability}%</div>
                  </motion.div>
                </React.Fragment>
              );
            })}
         </div>
      </div>

      {/* Explanation Panel */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="glass-panel p-6 border border-white/5 bg-[#030406]/50 h-full">
           <div className="text-xs font-mono text-gray-400 mb-6">WHY THIS RELATIONSHIP?</div>
           
           <AnimatePresence mode="wait">
             <motion.div
               key={selectedCandidate.name}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex flex-col gap-6"
             >
               <div>
                 <div className="text-[10px] font-mono text-gray-500 uppercase">CANDIDATE RELATIONSHIP</div>
                 <div className="text-2xl font-light text-white" style={{ color: selectedCandidate.color }}>{selectedCandidate.name}</div>
               </div>

               <div>
                 <div className="text-[10px] font-mono text-gray-500 uppercase mb-2">EVIDENCE STRENGTH</div>
                 <div className="flex items-center gap-4">
                   <div className="text-3xl font-light text-white">{selectedCandidate.probability}%</div>
                   <div className="flex-1 h-1 bg-[#111] rounded overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }} animate={{ width: `${selectedCandidate.probability}%` }} transition={{ duration: 0.5 }}
                       className="h-full" style={{ backgroundColor: selectedCandidate.color }}
                     ></motion.div>
                   </div>
                 </div>
               </div>

               <div className="border-t border-white/5 pt-6 mt-2 space-y-4 font-mono text-[10px] text-gray-400">
                  <div className="flex justify-between"><span>BEHAVIOR SIMILARITY</span> <span className="text-white">{(selectedCandidate.probability * 0.95).toFixed(1)}%</span></div>
                  <div className="flex justify-between"><span>TEMPORAL EVIDENCE</span> <span className="text-white">{(selectedCandidate.probability * 0.82).toFixed(1)}%</span></div>
                  <div className="flex justify-between"><span>GRAPH EVIDENCE</span> <span className="text-white">{(selectedCandidate.probability * 1.1).toFixed(1)}%</span></div>
               </div>
               
               <div className="mt-8 p-4 border border-white/5 bg-white/5 rounded-sm">
                 <div className="text-[10px] font-mono text-primary mb-2">HYPOTHESIS</div>
                 <p className="text-xs text-gray-300 font-sans leading-relaxed">
                   The unknown behavior exhibits strong structural and temporal similarities to known {selectedCandidate.name} mechanisms. CLADE suggests this is a candidate ancestor.
                 </p>
               </div>

             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Ancestry;
