import React from 'react';

export default function Navbar({ activeCount }) {
  return (
    <nav className="border-b border-slate-900 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40 px-8 py-4 flex justify-between items-center">
      <h1 className="text-sm font-black tracking-widest text-white uppercase">SmartAI <span className="text-cyan-400">Intelligence</span></h1>
      <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-3 py-1 border border-cyan-900/50 rounded-full font-bold">
        Staged Units: {activeCount} / 3
      </span>
    </nav>
  );
}