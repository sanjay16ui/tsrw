import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const temporalData = [
  { time: '21:00', known: 40, unknown: 5, critical: 0 },
  { time: '21:10', known: 45, unknown: 8, critical: 1 },
  { time: '21:20', known: 35, unknown: 12, critical: 2 },
  { time: '21:30', known: 50, unknown: 25, critical: 5 },
  { time: '21:40', known: 60, unknown: 80, critical: 15 },
  { time: '21:50', known: 40, unknown: 30, critical: 8 },
];

const familyData = [
  { name: 'Scanning', value: 85 },
  { name: 'Exploitation', value: 65 },
  { name: 'Credential Abuse', value: 45 },
  { name: 'Persistence', value: 30 },
];

const Overview = () => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {[
          { label: 'ACTIVE THREATS', value: '14', color: 'text-accent' },
          { label: 'UNKNOWN BEHAVIORS', value: '8', color: 'text-primary' },
          { label: 'OPEN INVESTIGATIONS', value: '23', color: 'text-white' },
          { label: 'THREAT SHADOWS', value: '1,492', color: 'text-gray-400' },
          { label: 'VERIFIED HYPOTHESES', value: '87%', color: 'text-green-400' },
          { label: 'REACTIVATED THREATS', value: '3', color: 'text-secondary' }
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 border border-white/5 bg-[#030406]/50">
            <div className="text-[9px] font-mono text-gray-500 mb-2 uppercase">{stat.label}</div>
            <div className={`text-2xl font-light ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Threat Activity */}
        <div className="lg:col-span-2 glass-panel p-6 border border-white/5 bg-[#030406]/50">
          <div className="text-xs font-mono text-gray-400 mb-6 flex justify-between">
            <span>LIVE THREAT ACTIVITY</span>
            <span className="text-primary animate-pulse">● LIVE</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={temporalData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorKnown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#333" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#333" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUnknown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff00aa" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff00aa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#030406', borderColor: '#333', fontSize: '10px', fontFamily: 'monospace' }} />
                <Area type="monotone" dataKey="known" stroke="#555" fillOpacity={1} fill="url(#colorKnown)" />
                <Area type="monotone" dataKey="unknown" stroke="#00f0ff" fillOpacity={1} fill="url(#colorUnknown)" />
                <Area type="monotone" dataKey="critical" stroke="#ff00aa" fillOpacity={1} fill="url(#colorCritical)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attack Family Landscape (Simplified Bar for now) */}
        <div className="glass-panel p-6 border border-white/5 bg-[#030406]/50 flex flex-col">
          <div className="text-xs font-mono text-gray-400 mb-6">ATTACK FAMILY FREQUENCY</div>
          <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={familyData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#888" fontSize={10} tickLine={false} axisLine={false} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#030406', borderColor: '#333', fontSize: '10px', fontFamily: 'monospace' }} />
                <Bar dataKey="value" fill="#00f0ff" radius={[0, 2, 2, 0]}>
                  {familyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#00f0ff' : index === 1 ? '#a300ff' : '#444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Model Agreement & Investigation Latency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border border-white/5 bg-[#030406]/50">
           <div className="text-xs font-mono text-gray-400 mb-6">MODEL SIGNAL AGREEMENT</div>
           <div className="space-y-4 font-mono text-[10px]">
             <div className="flex justify-between items-center"><span className="text-gray-500 w-24">XGBOOST</span> <div className="flex-1 bg-[#111] h-1 mx-4"><div className="bg-primary h-full" style={{width: '91%'}}></div></div> <span className="text-primary">91%</span></div>
             <div className="flex justify-between items-center"><span className="text-gray-500 w-24">MLP</span> <div className="flex-1 bg-[#111] h-1 mx-4"><div className="bg-secondary h-full" style={{width: '88%'}}></div></div> <span className="text-secondary">88%</span></div>
             <div className="flex justify-between items-center"><span className="text-gray-500 w-24">TEMPORAL</span> <div className="flex-1 bg-[#111] h-1 mx-4"><div className="bg-white h-full" style={{width: '86%'}}></div></div> <span className="text-white">86%</span></div>
             <div className="flex justify-between items-center"><span className="text-gray-500 w-24">GRAPH</span> <div className="flex-1 bg-[#111] h-1 mx-4"><div className="bg-gray-400 h-full" style={{width: '81%'}}></div></div> <span className="text-gray-400">81%</span></div>
           </div>
        </div>
        
        <div className="glass-panel p-6 border border-white/5 bg-[#030406]/50">
           <div className="text-xs font-mono text-gray-400 mb-6">VERIFICATION OUTCOMES</div>
           <div className="flex h-full items-center justify-around pb-4">
              <div className="text-center"><div className="text-3xl font-light text-green-400 mb-2">42</div><div className="text-[10px] font-mono text-gray-500 uppercase">Supported</div></div>
              <div className="w-[1px] h-12 bg-white/5"></div>
              <div className="text-center"><div className="text-3xl font-light text-gray-400 mb-2">18</div><div className="text-[10px] font-mono text-gray-500 uppercase">Not Supported</div></div>
              <div className="w-[1px] h-12 bg-white/5"></div>
              <div className="text-center"><div className="text-3xl font-light text-accent mb-2">5</div><div className="text-[10px] font-mono text-gray-500 uppercase">Insufficient Evidence</div></div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Overview;
