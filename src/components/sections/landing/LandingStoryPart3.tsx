import React from 'react';
import { motion } from 'framer-motion';

// Section 6: Verification
export const VerificationSection = () => (
  <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#010103] py-20 border-t border-white/5">
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2 uppercase">Scientific Verification</h2>
      </div>
      
      <div className="max-w-4xl mx-auto flex justify-between items-center relative font-mono text-xs">
         <motion.div initial={{ scale: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 2 }} className="absolute top-1/2 left-0 h-[1px] bg-white/10 -z-10 origin-left"></motion.div>
         
         {[
           { label: 'HYPOTHESIS', color: 'border-gray-500 text-gray-400' },
           { label: 'EXPECTED', color: 'border-gray-400 text-gray-300' },
           { label: 'OBSERVED', color: 'border-white text-white' },
           { label: 'COMPARISON', color: 'border-primary text-primary' },
           { label: 'VERIFIED', color: 'border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' }
         ].map((step, i) => (
           <motion.div key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.4 }} className="flex flex-col items-center gap-4">
             <div className={`w-16 h-16 rounded-full border flex items-center justify-center bg-[#010103] ${step.color}`}>
               {i + 1}
             </div>
             <div className={`uppercase tracking-widest ${step.color.split(' ')[1]}`}>{step.label}</div>
           </motion.div>
         ))}
      </div>
    </div>
  </section>
);

// Section 7: Threat Memory & Dream RSI
export const IntelligenceLoopSection = () => (
  <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#010103] py-20 border-t border-white/5">
    <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20">
      
      <div className="flex flex-col items-center text-center">
         <h2 className="text-2xl font-light tracking-tight text-white mb-16 uppercase">Threat Shadow</h2>
         <div className="flex flex-col gap-8 font-mono text-[10px] text-gray-400 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 -z-10"></div>
            
            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="bg-[#030406] border border-white/10 p-4 w-48 self-start">FIRST OBSERVED</motion.div>
            <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#030406] border border-white/10 p-4 w-48 self-end text-right">DORMANT (6 MONTHS)</motion.div>
            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-accent/10 border border-accent text-accent p-4 w-48 self-start shadow-[0_0_15px_rgba(255,0,170,0.2)]">REAPPEARS</motion.div>
            <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="bg-[#030406] border border-primary text-primary p-4 w-48 self-end text-right">RELATED BEHAVIOR</motion.div>
         </div>
      </div>

      <div className="flex flex-col items-center text-center">
         <h2 className="text-2xl font-light tracking-tight text-white mb-16 uppercase">DREAM-RSI</h2>
         <motion.div 
           initial={{ rotate: -90, opacity: 0 }} whileInView={{ rotate: 0, opacity: 1 }} transition={{ duration: 1.5 }}
           className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center relative"
         >
           <div className="absolute inset-4 border border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
           <div className="absolute inset-8 border border-b-secondary border-r-transparent border-t-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
           
           <div className="flex flex-col gap-2 font-mono text-[9px] uppercase tracking-widest text-gray-400">
              <div>PAST INVESTIGATION</div>
              <div className="my-2 h-4 w-[1px] bg-white/20 mx-auto"></div>
              <div className="text-primary">REPLAY & EVALUATE</div>
              <div className="my-2 h-4 w-[1px] bg-white/20 mx-auto"></div>
              <div>IMPROVED STRATEGY</div>
           </div>
         </motion.div>
      </div>

    </div>
  </section>
);
