import React from 'react';
import { motion } from 'framer-motion';

const InvestigationSOC = () => {
  return (
    <section id="soc" className="py-32 relative bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold mb-16 text-center text-white">INVESTIGATION EXPERIENCE</h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-panel border border-surface-border rounded-lg overflow-hidden shadow-2xl shadow-primary/10"
        >
          {/* Header */}
          <div className="bg-surface-border/30 px-6 py-4 flex justify-between items-center border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
              <span className="font-mono text-accent text-sm font-bold tracking-widest">⚠ UNKNOWN BEHAVIOR</span>
            </div>
            <div className="font-mono text-xs text-gray-500">ID: EVT-992-ALPHA</div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h4 className="text-xs text-gray-500 mb-2 font-mono uppercase">Novelty Score</h4>
                <div className="text-4xl font-light text-primary">94%</div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs text-gray-500 mb-4 font-mono uppercase">Candidate Ancestry</h4>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between border-b border-surface-border pb-1">
                    <span className="text-gray-300">Scanning</span>
                    <span className="text-primary">87%</span>
                  </div>
                  <div className="flex justify-between border-b border-surface-border pb-1">
                    <span className="text-gray-300">Exploitation</span>
                    <span className="text-secondary">81%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 mb-2 font-mono uppercase">Composition</h4>
                <div className="text-white bg-surface-border/20 px-3 py-2 text-sm font-mono inline-block rounded-sm">
                  Scanning + Exploitation
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-xs text-gray-500 mb-2 font-mono uppercase">Verification Status</h4>
                <div className="glass-panel px-4 py-3 border-l-4 border-green-500 text-green-400 font-mono text-sm">
                  SUPPORTED
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xs text-gray-500 mb-4 font-mono uppercase">Action Required</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-surface border border-surface-border hover:border-primary px-4 py-2 text-xs font-mono text-gray-300 hover:text-primary transition-colors">MONITOR</button>
                  <button className="bg-surface border border-surface-border hover:border-accent px-4 py-2 text-xs font-mono text-gray-300 hover:text-accent transition-colors">RESTRICT</button>
                  <button className="bg-surface border border-surface-border hover:border-accent px-4 py-2 text-xs font-mono text-gray-300 hover:text-accent transition-colors">ISOLATE</button>
                  <button className="bg-primary/20 border border-primary px-4 py-2 text-xs font-mono text-primary hover:bg-primary hover:text-black transition-colors">ESCALATE</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestigationSOC;
