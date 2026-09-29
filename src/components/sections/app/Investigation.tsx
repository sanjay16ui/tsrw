import React from 'react';
import { MOCK_CASE } from '../../../data/mockData';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const fingerprintData = [
  { subject: 'Numerical', A: MOCK_CASE.fingerprint.numerical, fullMark: 100 },
  { subject: 'Temporal', A: MOCK_CASE.fingerprint.temporal, fullMark: 100 },
  { subject: 'Graph', A: MOCK_CASE.fingerprint.graph, fullMark: 100 },
  { subject: 'Novelty', A: MOCK_CASE.novelty, fullMark: 100 },
  { subject: 'Severity', A: 95, fullMark: 100 },
];

const Investigation = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="glass-panel p-6 border border-primary/20 bg-primary/5 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono text-primary tracking-widest uppercase mb-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></div>
            UNKNOWN BEHAVIOR DETECTED
          </div>
          <h1 className="text-2xl font-mono text-white tracking-tight uppercase">CASE: {MOCK_CASE.id}</h1>
        </div>
        <div className="flex gap-8 text-right font-mono text-sm">
          <div><div className="text-[9px] text-gray-500 uppercase">Status</div><div className="text-primary">{MOCK_CASE.status}</div></div>
          <div><div className="text-[9px] text-gray-500 uppercase">Novelty</div><div className="text-accent">{MOCK_CASE.novelty}%</div></div>
          <div><div className="text-[9px] text-gray-500 uppercase">Confidence</div><div className="text-white">{MOCK_CASE.confidence}%</div></div>
          <div><div className="text-[9px] text-gray-500 uppercase">Severity</div><div className="text-red-500">{MOCK_CASE.severity}</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Attack Timeline */}
        <div className="glass-panel p-6 border border-white/5 bg-[#030406]/50 flex flex-col">
          <div className="text-xs font-mono text-gray-400 mb-8">ATTACK TIMELINE</div>
          <div className="flex-1 overflow-y-auto relative pl-4">
            <div className="absolute top-0 bottom-0 left-[11px] w-[1px] bg-white/10"></div>
            
            {MOCK_CASE.timeline.map((stage, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                key={i} 
                className="relative mb-6 cursor-pointer group"
              >
                <div className={`absolute -left-[16px] top-1.5 w-3 h-3 rounded-full border-2 border-[#030406] z-10 
                  ${stage.status === 'Verified' ? 'bg-primary' : stage.status === 'Investigating' ? 'bg-accent animate-pulse' : 'bg-gray-600'}
                `}></div>
                
                <div className="pl-6 group-hover:pl-8 transition-all">
                  <div className={`text-sm font-mono uppercase ${stage.status === 'Verified' ? 'text-gray-300' : stage.status === 'Investigating' ? 'text-white' : 'text-gray-600'}`}>
                    {stage.stage}
                  </div>
                  <div className="text-[10px] font-mono text-gray-500">{stage.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Behavior Fingerprint */}
        <div className="glass-panel p-6 border border-white/5 bg-[#030406]/50 flex flex-col items-center justify-center relative">
          <div className="text-xs font-mono text-gray-400 absolute top-6 left-6">BEHAVIOR FINGERPRINT</div>
          <div className="w-full h-[300px] mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={fingerprintData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontFamily: 'monospace' }} />
                <Radar name="Case" dataKey="A" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-6 text-[10px] font-mono text-gray-400">
             <div>NUMERICAL: <span className="text-primary">{MOCK_CASE.fingerprint.numerical}%</span></div>
             <div>TEMPORAL: <span className="text-primary">{MOCK_CASE.fingerprint.temporal}%</span></div>
             <div>GRAPH: <span className="text-primary">{MOCK_CASE.fingerprint.graph}%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investigation;
