import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_LIVE_EVENTS } from '../../../data/mockData';
import { motion } from 'framer-motion';

const LiveEvents = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-light tracking-widest text-white uppercase">Live Events</h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-[10px] font-mono text-gray-500 uppercase">Streaming...</span>
        </div>
      </div>

      <div className="flex-1 glass-panel border border-white/5 bg-[#030406]/50 overflow-y-auto">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-white/5 text-[10px] font-mono text-gray-500 uppercase sticky top-0 bg-[#030406]/90 backdrop-blur-md">
          <div className="col-span-1">Time</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-1">Source</div>
          <div className="col-span-1">Target</div>
          <div className="col-span-1 text-right">Novelty</div>
        </div>

        {/* Event Rows */}
        <div>
          {MOCK_LIVE_EVENTS.map((evt, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                if (evt.caseId) {
                  navigate(`/app/investigations/${evt.caseId}`);
                }
              }}
              className={`grid grid-cols-6 gap-4 p-4 border-b border-white/5 text-xs font-mono items-center cursor-pointer hover:bg-white/5 transition-colors ${evt.alert ? 'bg-primary/5 border-l-2 border-l-primary' : ''}`}
            >
              <div className="col-span-1 text-gray-500">[{evt.time}]</div>
              <div className={`col-span-2 ${evt.alert ? 'text-primary font-bold' : 'text-gray-400'}`}>{evt.type}</div>
              <div className="col-span-1 text-gray-300">{evt.source}</div>
              <div className="col-span-1 text-gray-300">{evt.target}</div>
              <div className={`col-span-1 text-right ${evt.novelty && evt.novelty > 90 ? 'text-accent' : 'text-gray-500'}`}>
                {evt.novelty ? `${evt.novelty}%` : '-'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveEvents;
