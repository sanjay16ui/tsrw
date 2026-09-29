import React from 'react';
import { motion } from 'framer-motion';

// Section 1: Live Cyber Signal (Telemetry)
export const LiveSignalSection = () => (
  <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#010103] py-20 border-t border-white/5">
    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4 uppercase">The Unknown Is A Signal</h2>
        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Continuous telemetry ingestion</p>
      </motion.div>
      
      <div className="w-full max-w-3xl flex flex-col items-center gap-12 font-mono text-xs">
        {['HOST-042', 'PROCESS-17', 'UNKNOWN CONNECTION', 'BEHAVIOR SHIFT'].map((step, i) => (
          <React.Fragment key={i}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.2 }}
              className={`px-6 py-3 border ${i === 3 ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(255,0,170,0.2)]' : 'border-white/10 bg-[#030406] text-gray-300'}`}
            >
              {step}
            </motion.div>
            {i < 3 && (
              <motion.div initial={{ height: 0 }} whileInView={{ height: 48 }} transition={{ delay: i * 0.2 + 0.1, duration: 0.5 }} className="w-[1px] bg-primary relative">
                <motion.div animate={{ y: [0, 48, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-3 bg-primary absolute -left-[2px] shadow-[0_0_10px_#00f0ff]"></motion.div>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

// Section 2: Behavior Fingerprint
export const FingerprintSection = () => (
  <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#010103] py-20 border-t border-white/5">
    <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-20">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="flex-1 text-right">
        <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">Multi-dimensional analysis</div>
        <h2 className="text-4xl md:text-5xl font-light text-white mb-6 uppercase">Behavior<br/>Fingerprint</h2>
        <div className="space-y-4 font-mono text-xs text-gray-400">
           <div>NUMERICAL SIGNAL <span className="text-primary ml-4">91%</span></div>
           <div>TEMPORAL SIGNAL <span className="text-primary ml-4">86%</span></div>
           <div>RELATIONSHIP SIGNAL <span className="text-primary ml-4">81%</span></div>
           <div>CONTEXT SIGNAL <span className="text-primary ml-4">78%</span></div>
        </div>
      </motion.div>
      
      <div className="flex-1 flex justify-start relative">
         {/* Animated Polygon SVG */}
         <motion.div initial={{ rotate: -45, scale: 0.8, opacity: 0 }} whileInView={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative w-64 h-64 md:w-96 md:h-96">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#333" strokeWidth="0.5" />
              <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="#333" strokeWidth="0.5" />
              <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="none" stroke="#333" strokeWidth="0.5" />
              {/* Data Polygon */}
              <motion.polygon 
                initial={{ strokeDasharray: "0 1000" }} whileInView={{ strokeDasharray: "1000 0" }} transition={{ duration: 2 }}
                points="50,15 85,38 75,68 50,85 25,60 20,25" fill="rgba(0,240,255,0.1)" stroke="#00f0ff" strokeWidth="1" 
              />
              {/* Nodes */}
              {[[50,15], [85,38], [75,68], [50,85], [25,60], [20,25]].map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="2" fill="#00f0ff" className="animate-pulse" />
              ))}
            </svg>
         </motion.div>
      </div>
    </div>
  </section>
);

// Section 3: Unknown Detection
export const UnknownDetectionSection = () => (
  <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#010103] py-20 border-t border-white/5">
    <div className="absolute top-20 text-center z-20">
       <h2 className="text-3xl md:text-5xl font-light text-white mb-2 uppercase">Boundary Detection</h2>
    </div>
    
    <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
       {/* Known Clusters */}
       <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="absolute left-[20%] top-[30%] w-48 h-48 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
         <span className="font-mono text-[10px] text-gray-500">SCANNING</span>
       </motion.div>
       <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="absolute right-[25%] top-[20%] w-40 h-40 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
         <span className="font-mono text-[10px] text-gray-500">EXPLOITATION</span>
       </motion.div>
       <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="absolute left-[40%] bottom-[20%] w-56 h-56 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
         <span className="font-mono text-[10px] text-gray-500">CREDENTIAL ABUSE</span>
       </motion.div>
       
       {/* Unknown Point appearing outside */}
       <motion.div 
         initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 1, type: 'spring' }}
         className="absolute right-[15%] bottom-[30%] flex flex-col items-center gap-2 z-30"
       >
         <div className="w-4 h-4 bg-accent rounded-full shadow-[0_0_30px_rgba(255,0,170,0.8)] animate-pulse"></div>
         <div className="font-mono text-xs text-accent uppercase font-bold bg-black/50 px-2 py-1 rounded">NOVELTY DETECTED</div>
       </motion.div>
    </div>
  </section>
);
