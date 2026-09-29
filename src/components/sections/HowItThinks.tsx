import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  "TELEMETRY",
  "BEHAVIOR",
  "NOVELTY",
  "ANCESTRY",
  "VERIFICATION"
];

const HowItThinks = () => {
  return (
    <section id="how-it-works" className="py-40 relative bg-[#010103]">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col items-center gap-6 relative max-w-sm mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center font-mono text-sm tracking-widest text-gray-300 uppercase py-2"
              >
                {step}
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: 24 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.1, duration: 0.5 }}
                  className="w-[1px] bg-primary/30"
                ></motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItThinks;
