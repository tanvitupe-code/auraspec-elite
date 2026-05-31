import React from 'react';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/common/MainLayout';
import { useApp } from './context/AppContext';

function AppContent() {
  const { darkMode } = useApp();

  return (
    <div className={darkMode ? "bg-slate-950 min-h-screen text-slate-100" : "bg-[#FAF5F0] min-h-screen text-slate-800"}>
      <MainLayout />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}