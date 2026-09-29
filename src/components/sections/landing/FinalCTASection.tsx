import React from 'react';
import { motion } from 'framer-motion';

export const FinalCTASection = () => {
  return (
    <section className="h-[100vh] relative flex flex-col items-center justify-center overflow-hidden bg-black text-center border-t border-white/5">
      {/* Background Particles that slowly expand */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 3 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.05)_0%,_rgba(0,0,0,0)_70%)]"
      ></motion.div>
      
      <div className="relative z-10 flex flex-col items-center">
         <motion.h2 
           initial={{ opacity: 0, filter: 'blur(10px)' }}
           whileInView={{ opacity: 1, filter: 'blur(0px)' }}
           transition={{ duration: 2 }}
           className="text-6xl md:text-8xl font-bold tracking-[0.2em] text-white mb-6 uppercase"
         >
           CLADE
         </motion.h2>
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 1, duration: 1 }}
           className="text-xl md:text-2xl font-light text-gray-400 mb-12 tracking-widest uppercase"
         >
           Trace the unknown.
         </motion.div>
         
         <motion.button 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ delay: 2 }}
           onClick={() => window.location.href = '/app'}
           className="px-10 py-4 border border-primary bg-primary/10 text-primary font-mono tracking-widest text-sm hover:bg-primary hover:text-black transition-all shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)]"
         >
           ENTER CLADE
         </motion.button>
      </div>
    </section>
  );
};
