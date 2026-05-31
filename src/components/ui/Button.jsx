import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className }) {
  const base = "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 focus:outline-none";
  const styles = variant === 'primary' 
    ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/10" 
    : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800";
  
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}