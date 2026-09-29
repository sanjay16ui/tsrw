import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CladeAI = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-10 right-10 z-50 w-12 h-12 rounded-full border border-primary/30 bg-[#010103]/80 backdrop-blur-md text-primary flex items-center justify-center transition-all hover:bg-primary/10 hover:border-primary"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      </motion.button>

      {/* Compact Assistant Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-10 z-50 w-[320px] bg-[#010103]/90 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="font-mono text-[10px] tracking-widest text-white uppercase">CLADE AI <span className="text-gray-600">| ONLINE</span></span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors text-xs font-mono">
                [X]
              </button>
            </div>

            {/* Content */}
            <div className="p-5 font-mono text-xs text-gray-400 font-light flex flex-col gap-4">
              <div className="text-primary border-l-2 border-primary/30 pl-3">
                System online. Monitoring open-world network.
              </div>
              
              <div className="pt-2">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-1 h-3 bg-gray-600 animate-pulse"></div>
                  <div className="w-1 h-2 bg-gray-600 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-4 bg-gray-600 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-2 bg-gray-600 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-black/40 flex items-center gap-3">
              <input 
                type="text" 
                placeholder="Ask CLADE..." 
                className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-white placeholder-gray-600"
              />
              <button className="text-[10px] font-mono text-gray-500 hover:text-primary transition-colors uppercase">
                SEND
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CladeAI;
