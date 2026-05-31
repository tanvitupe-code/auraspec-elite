import React from 'react';
import { useApp } from '../context/AppContext';
import { useProductFilter } from '../hooks/useProductFilter';
import Navbar from '../components/common/Navbar';
import Input from '../components/ui/Input';
import ProductCard from '../components/dashboard/ProductCard';
import ComparePanel from '../components/dashboard/ComparePanel';

export default function DashboardLayout() {
  const { products, loading, selectedModels, toggleCompare } = useApp();
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filteredProducts, categories } = useProductFilter(products);

  if (loading) return <div className="text-white p-12 text-center text-xs font-mono">LOADING CENTRAL SYSTEM ROUTERS...</div>;

  return (
    <div className="min-h-screen bg-slate-950 pb-96">
      <Navbar activeCount={selectedModels.length} />
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <div className="w-full md:w-80"><Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search specifications..." /></div>
          <div className="flex gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 text-[9px] font-black uppercase rounded-lg tracking-widest border ${selectedCategory === cat ? 'bg-white text-slate-950 border-white' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <ProductCard key={p.id || p._id} product={p} isCompared={selectedModels.some(sm => (sm.id || sm._id) === (p.id || p._id))} onCompareToggle={() => toggleCompare(p)} />
          ))}
        </div>
      </div>
      <ComparePanel selectedModels={selectedModels} onRemove={toggleCompare} />
    </div>
  );
}