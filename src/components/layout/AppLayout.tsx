import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Activity, Search, Bell, User, Terminal } from 'lucide-react';
import CladeAI from '../ui/CladeAI';
import { SYSTEM_STREAM_LOGS } from '../../data/mockData';

const NAV_ITEMS = [
  { path: "/app", label: "OVERVIEW" },
  { path: "/app/events", label: "LIVE EVENTS" },
  { path: "/app/investigations", label: "INVESTIGATIONS" },
  { path: "/app/ancestry", label: "ANCESTRY" },
  { path: "/app/composition", label: "COMPOSITION" },
  { path: "/app/verification", label: "VERIFICATION" },
  { path: "/app/threat-shadow", label: "THREAT SHADOW" },
  { path: "/app/dream-rsi", label: "DREAM-RSI" },
  { path: "/app/system", label: "SYSTEM" },
];

const AppLayout = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Simulate streaming logs
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < SYSTEM_STREAM_LOGS.length) {
        setLogs(prev => [...prev, SYSTEM_STREAM_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-screen bg-[#05070a] text-white font-sans overflow-hidden">
      
      {/* LEFT NAVIGATION */}
      <nav className="w-64 border-r border-white/5 bg-[#030406] flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold tracking-widest uppercase">Clade</span>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              end={item.path === "/app"}
              className={({ isActive }) => 
                `px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-sm transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-l-2 border-transparent'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mini Status */}
        <div className="p-4 border-t border-white/5 font-mono text-[10px] text-gray-500">
          <div className="flex justify-between mb-2"><span>SYSTEM</span><span className="text-primary">ONLINE</span></div>
          <div className="flex justify-between"><span>MODELS</span><span className="text-primary">ACTIVE</span></div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative h-full">
        
        {/* Subtle grid and noise background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #00f0ff 0%, transparent 80%)', backgroundSize: '100px 100px', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        {/* TOP BAR */}
        <header className="h-16 border-b border-white/5 bg-[#030406]/80 backdrop-blur-md flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4 text-gray-500">
            <Search className="w-4 h-4 hover:text-white cursor-pointer" />
            <input type="text" placeholder="Search cases, IPs, threats..." className="bg-transparent border-none outline-none text-xs font-mono text-white placeholder-gray-600 w-64" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[10px] font-mono text-gray-400">SOC-01</span>
            </div>
            <Bell className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer" />
            <User className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer" />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto relative z-10 p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>

        {/* BOTTOM LINUX-STYLE SYSTEM STREAM */}
        <footer className="h-32 border-t border-white/5 bg-[#010102] p-4 font-mono text-[10px] overflow-hidden flex flex-col z-20">
          <div className="flex items-center gap-2 mb-2 text-gray-600 border-b border-white/5 pb-1">
            <Terminal className="w-3 h-3" />
            <span>SYSTEM STREAM</span>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col justify-end">
            {logs.map((log, i) => (
              <div key={i} className="text-gray-400">
                <span className="text-gray-600">{log.split('] ')[0]}]</span> 
                <span className={log.includes('DETECTED') ? 'text-accent' : 'text-primary'}> {log.split('] ')[1]}</span>
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-primary mr-2">&gt;</span>
              <span className="w-1.5 h-3 bg-primary animate-pulse"></span>
            </div>
          </div>
        </footer>

        {/* FLOATING AI ASSISTANT */}
        <CladeAI />
      </div>
    </div>
  );
};

export default AppLayout;
