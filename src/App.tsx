import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/sections/Landing';

// App Routes
import AppLayout from './components/layout/AppLayout';
import Overview from './components/sections/app/Overview';
import LiveEvents from './components/sections/app/LiveEvents';
import Investigation from './components/sections/app/Investigation';
import Ancestry from './components/sections/app/Ancestry';
import Composition from './components/sections/app/Composition';
import Verification from './components/sections/app/Verification';
import ThreatShadow from './components/sections/app/ThreatShadow';
import DreamRSI from './components/sections/app/DreamRSI';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="events" element={<LiveEvents />} />
          <Route path="investigations" element={<Navigate to="/app/investigations/CLD-2026-0142" replace />} />
          <Route path="investigations/:id" element={<Investigation />} />
          <Route path="ancestry" element={<Ancestry />} />
          <Route path="composition" element={<Composition />} />
          <Route path="verification" element={<Verification />} />
          <Route path="threat-shadow" element={<ThreatShadow />} />
          <Route path="dream-rsi" element={<DreamRSI />} />
          <Route path="system" element={<div className="text-white p-6 font-mono text-xs">SYSTEM CONFIGURATION - ALL SYSTEMS NOMINAL</div>} />
          {/* Catch all to overview */}
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
