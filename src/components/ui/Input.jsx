import React from 'react';

export default function Input({ value, onChange, placeholder }) {
  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      className="w-full bg-slate-950 text-slate-200 placeholder-slate-600 border border-slate-900 rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-cyan-500/50 transition-colors"
    />
  );
}