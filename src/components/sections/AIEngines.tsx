import React from 'react';
import { motion } from 'framer-motion';

const engines = [
  { name: "XGBoost", desc: "Understands structured numerical behavior.", color: "border-primary" },
  { name: "MLP", desc: "Learn complex non-linear relationships between extracted features.", color: "border-secondary" },
  { name: "Transformer / TCN", desc: "Understands attack behavior across time.", color: "border-accent" },
  { name: "GNN", desc: "Understands relationships between hosts, users, processes, IPs and other entities.", color: "border-blue-500" },
  { name: "Novelty Detection", desc: "Recognizes behavior that falls outside the known behavioral distribution.", color: "border-primary" },
  { name: "Attack Ancestry Engine", desc: "Finds candidate relationships between unseen behavior and known mechanisms.", color: "border-secondary" },
  { name: "Composition Engine", desc: "Tests whether multiple known mechanisms may explain a new attack.", color: "border-accent" },
  { name: "LLM Reasoning", desc: "Reasons over structured evidence and produces investigation hypotheses.", color: "border-white/30" },
];

const AIEngines = () => {
  return (
    <section id="ai-engines" className="py-32 relative bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold mb-16 text-center">THE AI ENGINES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engines.map((engine, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel p-8 border-t-2 ${engine.color} hover:bg-surface-border/50 transition-colors group`}
            >
              <h3 className="text-xl font-mono text-white mb-4 group-hover:text-glow transition-all">{engine.name}</h3>
              <p className="text-sm text-gray-400">{engine.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIEngines;
