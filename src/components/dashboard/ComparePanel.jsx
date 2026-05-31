import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PriceTrendChart from './PriceTrendChart';
import mockProducts from '../../data/mockProducts';

export default function ComparePanel({ selectedModels, onRemove, onBack }) {
  const [model1Id, setModel1Id] = useState('');
  const [model2Id, setModel2Id] = useState('');
  
  // Auto-populate model1 if selectedModels has items
  React.useEffect(() => {
    if (selectedModels.length > 0 && !model1Id) {
      setModel1Id(selectedModels[0].id.toString());
    }
  }, [selectedModels, model1Id]);
  
  const model1 = mockProducts.find(p => p.id === parseInt(model1Id));
  const model2 = mockProducts.find(p => p.id === parseInt(model2Id));
  const comparisonModels = selectedModels.length > 0 ? selectedModels : [model1, model2].filter(Boolean);

  const getSpecValue = (product, key) => {
    if (product.specs?.[key]) return product.specs[key];
    if (product.specifications?.[key]) return product.specifications[key];
    return 'N/A';
  };

  const specKeys = comparisonModels.length > 0 && comparisonModels[0]?.category === 'Car' 
    ? ['engine', 'range', 'acceleration', 'seating', 'fuel']
    : ['processor', 'display', 'camera', 'storage', 'battery'];

  return (
    <div className="bg-white/95 border border-orange-100/70 shadow-lg shadow-orange-900/10 rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-700 bg-orange-50 hover:bg-orange-100/80 px-4 py-2 rounded-lg border border-orange-200 transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Showcase
            </button>
          )}
          <h4 className={`text-sm font-mono tracking-wider font-semibold antialiased uppercase text-orange-700 ${onBack ? '' : 'ml-auto'}`}>
            Product Comparison
          </h4>
        </div>

        {/* Dropdown Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-700 mb-2 font-serif">
              Select Model 1
            </label>
            <select
              value={model1Id}
              onChange={(e) => setModel1Id(e.target.value)}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-700/50 font-serif"
            >
              <option value="">Choose a product...</option>
              {mockProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ₹{product.price?.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-700 mb-2 font-serif">
              Select Model 2
            </label>
            <select
              value={model2Id}
              onChange={(e) => setModel2Id(e.target.value)}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-700/50 font-serif"
            >
              <option value="">Choose a product...</option>
              {mockProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ₹{product.price?.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        {comparisonModels.length === 2 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-100">
                  <th className="text-left py-3 px-4 font-serif tracking-wide font-light antialiased capitalize text-slate-800 w-32">Specification</th>
                  {comparisonModels.map((model, idx) => (
                    <th key={idx} className="text-left py-3 px-4 font-serif tracking-wide font-light antialiased capitalize text-slate-800">
                      <div className="flex items-center gap-2">
                        <span>{model.title || model.name}</span>
                      </div>
                      <div className="text-xs font-normal text-slate-600 mt-1">
                        ₹{(model.price || model.globalPricing?.[0]?.basePrice)?.toLocaleString()}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specKeys.map((key) => (
                  <tr key={key} className="border-b border-orange-50">
                    <td className="py-3 px-4 font-medium text-[#E2A182] capitalize text-xs font-mono tracking-wider font-semibold antialiased uppercase">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </td>
                    {comparisonModels.map((model, idx) => (
                      <td key={idx} className="py-3 px-4 text-slate-600">
                        {getSpecValue(model, key)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-orange-50">
                  <td className="py-3 px-4 font-medium text-orange-700 text-xs font-mono tracking-wider font-semibold antialiased uppercase">Rating</td>
                  {comparisonModels.map((model, idx) => (
                    <td key={idx} className="py-3 px-4 text-slate-600">
                      {model.rating || 'N/A'} ⭐
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-orange-700 text-xs font-mono tracking-wider font-semibold antialiased uppercase">Expert Review</td>
                  {comparisonModels.map((model, idx) => (
                    <td key={idx} className="py-3 px-4 text-slate-600 text-xs">
                      {model.description || 'Premium flagship with exceptional performance and luxury design.'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Price Trend Chart */}
        {comparisonModels.length > 0 && comparisonModels[0]?.priceHistory && (
          <div className="mt-6 pt-4 border-t border-orange-100">
            <PriceTrendChart 
              productTitle={comparisonModels[0].title || comparisonModels[0].name} 
              historyData={comparisonModels[0].priceHistory} 
            />
          </div>
        )}
      </div>
    </div>
  );
}