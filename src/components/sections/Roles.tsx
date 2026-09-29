import React from 'react';

const Roles = () => (
  <section className="py-32 bg-background border-y border-surface-border">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">BUILT FOR THE PEOPLE WHO INVESTIGATE ATTACKS.</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        <div className="glass-panel p-4">SOC ANALYST</div>
        <div className="glass-panel p-4">SECURITY RESEARCHER</div>
        <div className="glass-panel p-4">THREAT INTELLIGENCE ANALYST</div>
        <div className="glass-panel p-4">INCIDENT RESPONDER</div>
      </div>
    </div>
  </section>
);
export default Roles;
