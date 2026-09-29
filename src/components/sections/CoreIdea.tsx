import React from 'react';
import { motion } from 'framer-motion';

const CoreIdea = () => {
  return (
    <section id="ancestry" className="py-40 relative bg-[#010103]">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left: Known */}
          <div className="flex flex-col gap-8 text-right w-full md:w-1/3">
            <div className="border-r-2 border-surface-border pr-6">
              <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-1">KNOWN</div>
              <div className="text-xl text-gray-300 font-light tracking-tight">Scanning</div>
            </div>
            <div className="border-r-2 border-surface-border pr-6">
              <div className="text-xl text-gray-300 font-light tracking-tight">Exploitation</div>
            </div>
          </div>
          
          {/* Center: Connection */}
          <div className="flex-1 hidden md:flex items-center justify-center relative h-[100px]">
             {/* Lines */}
             <div className="absolute top-[25%] left-0 w-1/2 h-[1px] bg-gradient-to-r from-surface-border to-primary/30 transform rotate-12"></div>
             <div className="absolute bottom-[25%] left-0 w-1/2 h-[1px] bg-gradient-to-r from-surface-border to-secondary/30 transform -rotate-12"></div>
             
             {/* Center Node */}
             <div className="absolute right-0 w-4 h-4 rounded-full bg-primary/20 border border-primary flex items-center justify-center animate-pulse">
               <div className="w-1 h-1 bg-primary rounded-full"></div>
             </div>
          </div>

          {/* Right: Unknown */}
          <div className="w-full md:w-1/3 text-left pl-6 border-l-2 border-primary/50 relative">
             <div className="text-[10px] font-mono text-primary tracking-widest uppercase mb-1">UNKNOWN EVENT</div>
             <div className="text-2xl text-white font-medium tracking-tight">New Behavior</div>
             <div className="mt-4 text-[10px] font-mono text-gray-500 uppercase">
                Scanning: 87%<br/>
                Exploitation: 81%
             </div>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default CoreIdea;
