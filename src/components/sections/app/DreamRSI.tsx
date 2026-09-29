import React from 'react';
import { motion } from 'framer-motion';

const DreamRSI = () => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-light tracking-widest text-white uppercase">DREAM-RSI Replay System</h1>
      </div>

      <div className="flex-1 glass-panel border border-white/5 bg-[#030406]/50 p-8 flex flex-col items-center justify-center text-center">
         
         <motion.div 
           initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 1 }}
           className="w-48 h-48 border border-white/10 rounded-full flex items-center justify-center relative mb-12"
         >
           {/* Inner rotating rings */}
           <div className="absolute inset-4 border border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
           <div className="absolute inset-8 border border-b-secondary border-r-transparent border-t-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
           
           <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">REPLAYING<br/>CASES</div>
         </motion.div>

         <div className="max-w-xl text-xs font-mono text-gray-400 leading-loose">
           DREAM-RSI is currently replaying past investigations in the background to discover optimized verification strategies and reduce evidence-gathering latency for future anomalies.
         </div>

      </div>
    </div>
  );
};

export default DreamRSI;
