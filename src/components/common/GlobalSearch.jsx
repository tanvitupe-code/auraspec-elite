import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, Sparkles } from 'lucide-react';

/**
 * Global Search Component
 * Premium glass overlay search with suggestions and history
 */
export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const mockSuggestions = [
    { type: 'product', text: 'iPhone 16 Pro', icon: '📱' },
    { type: 'product', text: 'Samsung Galaxy S25 Ultra', icon: '📱' },
    { type: 'product', text: 'Tesla Model 3', icon: '🚗' },
    { type: 'category', text: 'Smartphones', icon: '📱' },
    { type: 'category', text: 'Electric Vehicles', icon: '⚡' },
    { type: 'recent', text: 'iPhone vs Samsung comparison', icon: '📊' },
    { type: 'recent', text: 'Best phones under ₹30000', icon: '🔍' }
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(item => 
        item.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 transition"
      >
        <Search className="w-5 h-5" />
      </motion.button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Search Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50"
            >
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                {/* Search Header */}
                <div className="p-6 border-b border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <Search className="w-6 h-6 text-slate-400" />
                    <input
                      type="text"
                      value={query}
                      onChange={handleSearch}
                      placeholder="Search products, categories, comparisons..."
                      className="flex-1 bg-transparent text-slate-100 text-lg placeholder-slate-500 focus:outline-none"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-slate-800/50 rounded-lg transition text-slate-400 hover:text-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Search Suggestions */}
                <div className="max-h-96 overflow-y-auto">
                  {query.length === 0 ? (
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-400">Recent Searches</span>
                      </div>
                      <div className="space-y-2">
                        {mockSuggestions.filter(s => s.type === 'recent').map((item, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition text-left"
                          >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-slate-300">{item.text}</span>
                          </motion.button>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-6 mb-4">
                        <TrendingUp className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-400">Trending</span>
                      </div>
                      <div className="space-y-2">
                        {mockSuggestions.filter(s => s.type === 'product').slice(0, 3).map((item, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                            whileHover={{ x: 4 }}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition text-left"
                          >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-slate-300">{item.text}</span>
                            <Sparkles className="w-4 h-4 text-violet-400 ml-auto" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="p-4">
                      {suggestions.map((item, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800/50 transition text-left mb-2"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1">
                            <span className="text-slate-100 font-medium">{item.text}</span>
                            <span className="text-xs text-slate-500 ml-2 capitalize">{item.type}</span>
                          </div>
                          <Search className="w-4 h-4 text-slate-400" />
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">No results found for "{query}"</p>
                    </div>
                  )}
                </div>

                {/* Search Footer */}
                <div className="p-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                  <span>Press <kbd className="px-2 py-1 bg-slate-800 rounded">Esc</kbd> to close</span>
                  <span>Press <kbd className="px-2 py-1 bg-slate-800 rounded">Enter</kbd> to search</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
