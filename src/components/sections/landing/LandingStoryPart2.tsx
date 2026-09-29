import React from 'react';
import { motion } from 'framer-motion';

// Section 4: Attack Ancestry
export const AttackAncestrySection = () => (
  <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#010103] py-20 border-t border-white/5">
    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
    <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2 uppercase">Attack Ancestry</h2>
      </div>
      
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
        {/* Center Node */}
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute z-20 w-32 h-32 rounded-full border border-accent bg-[#030406] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(255,0,170,0.3)]">
           <div className="text-[10px] font-mono text-gray-400">UNKNOWN</div>
           <div className="text-xs font-mono text-white mt-1">ATTACK</div>
        </motion.div>
        
        {/* Candidate Nodes */}
        {[
          { name: 'SCANNING', pos: '-translate-x-48 -translate-y-32', val: '87%' },
          { name: 'EXPLOITATION', pos: 'translate-x-48 -translate-y-32', val: '81%' },
          { name: 'CREDENTIAL ABUSE', pos: 'translate-y-48', val: '42%' }
        ].map((node, i) => (
          <React.Fragment key={i}>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }} transition={{ delay: 0.5 }} className={`absolute z-0 w-[1px] bg-primary h-48 origin-bottom transform ${i === 0 ? '-rotate-45 -translate-x-16 -translate-y-16' : i === 1 ? 'rotate-45 translate-x-16 -translate-y-16' : 'translate-y-16'}`}></motion.div>
            <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 + i * 0.2 }} className={`absolute z-10 w-24 h-24 rounded-full border border-primary/50 bg-[#030406] flex flex-col items-center justify-center ${node.pos} hover:scale-110 hover:border-primary hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer transition-all`}>
               <div className="text-[9px] font-mono text-gray-400 text-center">{node.name}</div>
               <div className="text-xs font-mono text-primary mt-1">{node.val}</div>
               <div className="absolute -bottom-6 text-[8px] font-mono text-gray-500 w-32 text-center opacity-0 hover:opacity-100 transition-opacity">CANDIDATE RELATIONSHIP</div>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

// Section 5: Composition
export const CompositionSection = () => (
  <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#010103] py-20 border-t border-white/5">
    <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2 uppercase">Multi-Parent Composition</h2>
      </div>
      
      <div className="flex flex-col items-center gap-12 w-full max-w-2xl">
         <div className="flex justify-between w-full">
            <motion.div initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="w-32 h-32 border border-gray-600 flex items-center justify-center font-mono text-xs text-gray-300">MECHANISM A</motion.div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center self-center text-white">+</motion.div>
            <motion.div initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-32 h-32 border border-gray-600 flex items-center justify-center font-mono text-xs text-gray-300">MECHANISM B</motion.div>
         </div>
         
         <div className="relative w-full flex justify-center">
            <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1, delay: 0.5 }} className="absolute top-0 h-[1px] bg-primary"></motion.div>
            <motion.div initial={{ height: 0 }} whileInView={{ height: 48 }} transition={{ duration: 0.5, delay: 1.5 }} className="w-[1px] bg-primary relative"></motion.div>
         </div>
         
         <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 2, type: 'spring' }} className="w-48 h-48 border border-primary bg-primary/10 flex items-center justify-center font-mono text-sm text-primary shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            NEW BEHAVIOR
         </motion.div>
      </div>
    </div>
  </section>
);
