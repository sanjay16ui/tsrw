import React from 'react';
import { MOCK_CASE } from '../../../data/mockData';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldAlert } from 'lucide-react';

const Verification = () => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-light tracking-widest text-white uppercase">Verification Engine</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Step 1: Hypothesis */}
        <div className="glass-panel border border-white/5 bg-[#030406]/50 p-6 flex flex-col relative">
           <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-gray-600">STEP 01</div>
           <div className="text-xs font-mono text-gray-400 mb-8 uppercase">Generated Hypothesis</div>
           
           <div className="flex-1 flex flex-col justify-center">
             <div className="text-sm font-mono text-gray-500 mb-2">TARGET CANDIDATE</div>
             <div className="text-2xl font-light text-primary mb-8">{MOCK_CASE.verification.hypothesis}</div>
             
             <div className="text-sm font-mono text-gray-500 mb-2">EXPECTED BEHAVIOR</div>
             <div className="p-4 border border-white/5 bg-[#111] text-xs font-mono text-gray-400 leading-relaxed">
               If {MOCK_CASE.verification.hypothesis} is the true ancestor, we expect to see sequential port scanning followed immediately by payload delivery on open ports, matching cluster signatures.
             </div>
           </div>
        </div>

        {/* Step 2: Evidence */}
        <div className="glass-panel border border-white/5 bg-[#030406]/50 p-6 flex flex-col relative">
           <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-gray-600">STEP 02</div>
           <div className="text-xs font-mono text-gray-400 mb-8 uppercase">Observed Evidence</div>
           
           <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
              {[
                { time: '21:43:08', text: 'Sequential scan detected on ports 80, 443, 8080.', match: true },
                { time: '21:43:09', text: 'Payload delivery signature matches Exploitation profile.', match: true },
                { time: '21:43:10', text: 'Temporal gap aligns with expected automated script delay (1.2s).', match: true },
                { time: '21:43:11', text: 'Exfiltration pattern (Not expected in base hypothesis).', match: false },
              ].map((ev, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                  key={i} className="flex gap-3 items-start border-b border-white/5 pb-3"
                >
                  <div className="mt-0.5">
                    {ev.match ? <CheckCircle className="w-4 h-4 text-green-500" /> : <ShieldAlert className="w-4 h-4 text-accent" />}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500">[{ev.time}]</div>
                    <div className={`text-xs font-mono mt-1 ${ev.match ? 'text-gray-300' : 'text-gray-500'}`}>{ev.text}</div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Step 3: Result & Response */}
        <div className="glass-panel border border-white/5 bg-[#030406]/50 p-6 flex flex-col relative">
           <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-gray-600">STEP 03</div>
           <div className="text-xs font-mono text-gray-400 mb-8 uppercase">Verification Result</div>
           
           <div className="flex-1 flex flex-col items-center justify-center border-b border-white/5 pb-8 mb-8">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 }}
                className="w-32 h-32 rounded-full border border-green-500/30 bg-green-500/5 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.1)] mb-6"
              >
                <div className="text-xl font-mono text-green-400 font-bold">{MOCK_CASE.verification.result}</div>
              </motion.div>
              <div className="text-[10px] font-mono text-gray-400 text-center uppercase">
                Hypothesis meets confidence threshold.<br/>{MOCK_CASE.verification.evidenceCount} evidence points aligned.
              </div>
           </div>

           <div>
              <div className="text-xs font-mono text-gray-400 mb-4 uppercase">Recommended Action</div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-2 px-4 border border-white/10 bg-transparent text-xs font-mono text-gray-300 hover:bg-white/5 transition-colors">MONITOR</button>
                <button className="py-2 px-4 border border-accent bg-accent/10 text-xs font-mono text-accent hover:bg-accent/20 transition-colors">ISOLATE HOST</button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Verification;
