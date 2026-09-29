import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#010103]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary"></div>
          <span className="text-xl font-bold tracking-widest uppercase text-white">Clade</span>
        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-12 text-[11px] font-mono tracking-widest text-gray-400 uppercase">
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a>
          <a href="#ancestry" className="hover:text-primary transition-colors">Ancestry</a>
          <a href="#verification" className="hover:text-primary transition-colors">Verification</a>
        </nav>

        {/* CTA */}
        <div className="pointer-events-auto">
          <button onClick={() => window.location.href = '/app'} className="text-[11px] font-mono tracking-widest text-white hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
            LAUNCH CLADE
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
