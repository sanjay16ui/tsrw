import React from 'react';
import { motion } from 'framer-motion';

const Problem = () => {
  return (
    <section id="problem" className="py-40 relative bg-[#010103]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
        >
          {/* Visual Diagram */}
          <div className="flex flex-col items-center gap-8 mb-20">
            <div className="text-sm font-mono tracking-widest text-gray-500 uppercase">KNOWN</div>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
            
            <div className="text-sm font-mono tracking-widest text-gray-400 uppercase">VARIANT</div>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg font-mono tracking-widest text-primary uppercase text-glow"
            >
              UNKNOWN
            </motion.div>
          </div>

          {/* Core Statement */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl md:text-4xl font-light text-white tracking-tight"
          >
            CLADE traces the relationship.
          </motion.h3>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
