import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import AIChatAssistant from './AIChatAssistant';
import AdminDashboard from '../dashboard/AdminDashboard';
import AnalyticsDashboard from '../dashboard/AnalyticsDashboard';
import EMICalculator from '../ui/EMICalculator';
import NewsDealers from '../ui/NewsDealers';
import Dealers from '../ui/Dealers';
import ProductCard from '../dashboard/ProductCard';
import ProductDetailPanel from '../ui/ProductDetailPanel';
import ComparePanel from '../dashboard/ComparePanel';
import mockProducts from '../../data/mockProducts';
import { 
  Globe, Mic, Menu, X, Sun, Moon, Home, 
  Smartphone, BarChart3, Star, Heart, 
  Calculator, Newspaper, Store, TrendingUp, Settings, ChevronDown
} from 'lucide-react';

/**
 * Main Layout Component
 * Multi-tab navigation layout with sidebar navigation and content area
 */
export default function MainLayout() {
  const { darkMode, toggleDarkMode, wishlist, toggleWishlist, selectedProduct, selectProduct, selectedModels, toggleCompare, products, addToInventory } = useApp();
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState('English');
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subCategoryFilter, setSubCategoryFilter] = useState('all');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'products', label: 'Products', icon: '📱' },
    { id: 'compare', label: 'Compare', icon: '📊' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'emi', label: 'EMI Calculator', icon: '💰' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'dealers', label: 'Dealers', icon: '🏪' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'admin', label: 'Admin', icon: '⚙️' }
  ];

  const getIconForNavItem = (id) => {
    const iconMap = {
      home: Home,
      products: Smartphone,
      compare: BarChart3,
      reviews: Star,
      wishlist: Heart,
      emi: Calculator,
      news: Newspaper,
      dealers: Store,
      analytics: TrendingUp,
      admin: Settings
    };
    return iconMap[id] || Home;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Split Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative bg-white border border-stone-200 shadow-sm rounded-3xl p-12 overflow-hidden"
            >
              {/* Geometric Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-stone-100 to-orange-50 rounded-full opacity-50 translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-stone-900 font-serif font-extralight tracking-widest text-5xl text-center capitalize mb-6"
                >
                  AuraSpec Elite
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-slate-600 text-center mb-8 max-w-2xl mx-auto font-serif tracking-wide"
                >
                  Luxury Product Intelligence
                </motion.p>
                
                {/* Floating Editorial Stats */}
                <div className="flex justify-center gap-8 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-serif font-semibold text-orange-800">0.1s</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Real-time Compare Latency</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-serif font-semibold text-orange-800">15+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Premium Masterpieces</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-serif font-semibold text-orange-800">2026</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Verified Dealership Matrix</div>
                  </motion.div>
                </div>
                
                {/* Split Wing Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Car Wing */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative bg-stone-50 border border-stone-200 rounded-2xl p-6 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img 
                      src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=600&q=80" 
                      alt="Sports Car" 
                      className="w-full h-48 object-cover rounded-xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Premium Vehicles</h3>
                    <p className="text-slate-600 text-sm">Explore luxury cars with detailed analytics</p>
                  </motion.div>
                  
                  {/* Phone Wing */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative bg-stone-50 border border-stone-200 rounded-2xl p-6 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img 
                      src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80" 
                      alt="Smartphone" 
                      className="w-full h-48 object-cover rounded-xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Elite Smartphones</h3>
                    <p className="text-slate-600 text-sm">Discover cutting-edge mobile technology</p>
                  </motion.div>
                </div>

                {/* Filter Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-4 flex-wrap"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('products')}
                    className={`px-6 py-3 ${darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-orange-700 text-white hover:bg-orange-800'} rounded-xl font-serif tracking-wide font-light antialiased capitalize transition-all flex items-center gap-2`}
                  >
                    🚗 Browse Premium Vehicles
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('products')}
                    className={`px-6 py-3 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-700' : 'bg-white border-orange-200 text-slate-800 hover:bg-orange-50'} rounded-xl font-serif tracking-wide font-light antialiased capitalize transition-all flex items-center gap-2`}
                  >
                    📱 Explore Elite Smartphones
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Feature Cards */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { icon: '🤖', title: 'AI-Powered Analysis', desc: 'Advanced sentiment analysis and buy score calculations' },
                { icon: '📊', title: 'Smart Comparisons', desc: 'Compare products side-by-side with detailed insights' },
                { icon: '💰', title: 'Price Tracking', desc: 'Track prices and get alerts when products go on sale' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all rounded-2xl p-6"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent'}`}>
                Product Catalog
              </h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setCategoryFilter('all'); setSubCategoryFilter('all'); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    categoryFilter === 'all' 
                      ? 'bg-orange-700 text-white' 
                      : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                  All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategoryFilter('Car')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    categoryFilter === 'Car' 
                      ? 'bg-orange-700 text-white' 
                      : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                  🚗 Cars Only
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setCategoryFilter('Phone'); setSubCategoryFilter('all'); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    categoryFilter === 'Phone' 
                      ? 'bg-orange-700 text-white' 
                      : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                  📱 Phones Only
                </motion.button>
              </div>

              {/* Car Sub-Category Navigation */}
              {categoryFilter === 'Car' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 mt-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubCategoryFilter('all')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      subCategoryFilter === 'all' 
                        ? 'bg-orange-700 text-white' 
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    All Cars
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubCategoryFilter('Hyper Performance')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      subCategoryFilter === 'Hyper Performance' 
                        ? 'bg-orange-700 text-white' 
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    🏎️ Hyper Performance
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubCategoryFilter('Daily Premium')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      subCategoryFilter === 'Daily Premium' 
                        ? 'bg-orange-700 text-white' 
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    🚗 Daily Premium
                  </motion.button>
                </motion.div>
              )}
            </div>
            {selectedProduct ? (
              <ProductDetailPanel product={selectedProduct} onBack={() => selectProduct(null)} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockProducts
                  .filter(product => {
                    if (categoryFilter === 'all') return true;
                    if (categoryFilter === 'Phone') return product.category === 'Phone';
                    if (categoryFilter === 'Car') {
                      if (subCategoryFilter === 'all') return product.category === 'Car';
                      return product.category === 'Car' && product.subCategory === subCategoryFilter;
                    }
                    return true;
                  })
                  .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isCompared={selectedModels.some(m => m.id === product.id)}
                    onCompareToggle={(product) => {
                      toggleCompare(product);
                      setActiveTab('compare');
                    }}
                    onWishlistToggle={toggleWishlist}
                    isWishlisted={wishlist.some(w => (w.id || w._id) === product.id)}
                    onClick={() => selectProduct(product)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      case 'compare':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent'}`}>
              Product Comparison
            </h2>
            <ComparePanel 
              selectedModels={selectedModels} 
              onRemove={(model) => toggleCompare(model)}
              onBack={() => setActiveTab('products')}
            />
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent'}`}>
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={product.images?.front || product.images?.side} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-serif tracking-wide font-light antialiased capitalize text-slate-800">{product.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(product.rating) ? 'text-orange-700' : 'text-orange-200'}>&#9733;</span>
                        ))}
                        <span className="text-sm text-slate-600 ml-1">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{product.description}</p>
                  <p className="text-xs text-slate-500 mt-2">{product.numReviews} verified reviews</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent'}`}>
                My Wishlist
              </h2>
              <span className="text-sm text-slate-600">{wishlist.length} items</span>
            </div>
            {wishlist.length === 0 ? (
              <div className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 rounded-2xl p-12 text-center">
                <Heart className="w-16 h-16 text-orange-200 mx-auto mb-4" />
                <p className="text-slate-600">Your wishlist is empty</p>
                <p className="text-sm text-slate-500 mt-2">Click the heart icon on products to add them here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isCompared={false}
                    onCompareToggle={() => {}}
                    onWishlistToggle={toggleWishlist}
                    isWishlisted={true}
                    onClick={() => selectProduct(product)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      case 'emi':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent'}`}>
              EMI Calculator
            </h2>
            <EMICalculator productPrice={1000000} />
          </div>
        );
      case 'news':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent'}`}>
              Market News
            </h2>
            <NewsDealers />
          </div>
        );
      case 'dealers':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent'}`}>
              Verified Dealers
            </h2>
            <Dealers />
          </div>
        );
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'admin':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent'}`}>
                Admin Dashboard
              </h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowHelpModal(true)}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-700 bg-orange-50 hover:bg-orange-100/80 px-4 py-2 rounded-lg border border-orange-200 transition-all cursor-pointer shadow-sm"
                >
                  System Help
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddProductModal(true)}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-orange-700 to-orange-900 hover:from-orange-800 hover:to-orange-950 px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  Add Product
                </motion.button>
              </div>
            </div>
            <AdminDashboard />
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#FBF9F6] text-slate-800'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-stone-200'} backdrop-blur-md border-b px-6 py-4 shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-stone-100 rounded-lg transition text-slate-600 hover:text-slate-900"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className={`text-2xl font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-100' : 'bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent'}`}>
              AuraSpec Elite
            </h1>
            <span className={`text-xs font-serif tracking-wide font-light antialiased capitalize ${darkMode ? 'text-slate-400' : 'text-orange-600'}`}>
              Luxury Product Intelligence
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-2 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-700' : 'bg-white border-stone-200 text-slate-600 hover:bg-stone-50'} rounded-lg transition`}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{language}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {languageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-stone-200'} rounded-lg shadow-xl z-50`}
                  >
                    <div className="py-1">
                      {['English', 'Hindi', 'Marathi'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setLanguageDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition ${
                            language === lang
                              ? 'bg-slate-100 text-slate-900 border-l-2 border-slate-800'
                              : 'text-slate-600 hover:bg-stone-50'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Voice Search Button */}
            <motion.button
              onClick={() => setVoiceSearchActive(!voiceSearchActive)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition ${
                voiceSearchActive
                  ? 'bg-red-50 text-red-600 border border-red-300 animate-pulse'
                  : darkMode 
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    : 'bg-white text-slate-600 hover:bg-stone-50 border border-stone-200'
              }`}
              title="Voice Search"
            >
              <Mic className={`w-6 h-6 ${voiceSearchActive ? 'animate-pulse' : ''}`} />
            </motion.button>

            {/* Wishlist Counter Badge */}
            <motion.button
              onClick={() => setActiveTab('wishlist')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-2 ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-stone-100 text-slate-600 hover:text-slate-900'} rounded-lg transition`}
              title="Wishlist"
            >
              <Heart className={`w-6 h-6 ${wishlist.length > 0 ? 'text-red-600 fill-current' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-stone-100 rounded-lg transition text-slate-600 hover:text-slate-900"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6" />}
            </motion.button>
            
            {/* User Profile */}
            <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-64 bg-white/90 backdrop-blur-md border-r border-stone-200 min-h-screen"
            >
              <nav className="p-4 space-y-2">
                {navigationItems.map((item, index) => {
                  const Icon = getIconForNavItem(item.id);
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        activeTab === item.id
                          ? 'bg-orange-100 text-orange-800'
                          : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-orange-700" />
                      <span className="font-serif text-sm tracking-widest font-medium uppercase">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddProductModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl shadow-orange-900/20 w-full max-w-lg p-6 border border-orange-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif tracking-wide font-light antialiased capitalize text-orange-800">
                  Add New Product
                </h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-orange-700 mb-2 font-serif">
                    Product Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name..."
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-700/50 font-serif"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-orange-700 mb-2 font-serif">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price..."
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-700/50 font-serif"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-orange-700 mb-2 font-serif">
                    Category
                  </label>
                  <select className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-700/50 font-serif">
                    <option value="">Select category...</option>
                    <option value="Phone">Phone</option>
                    <option value="Car">Car</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-orange-700 mb-2 font-serif">
                    Specifications (JSON format)
                  </label>
                  <textarea
                    rows="4"
                    placeholder='{"processor": "A18 Pro", "display": "6.7\" OLED"}'
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-700/50 font-serif font-mono text-sm"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-700 to-orange-900 text-white rounded-lg font-semibold uppercase tracking-wider hover:from-orange-800 hover:to-orange-950 transition-all shadow-lg shadow-orange-900/20"
                >
                  Save Product
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHelpModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl shadow-orange-900/20 w-full max-w-2xl p-6 border border-orange-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif tracking-wide font-light antialiased capitalize text-orange-800">
                  System Help Guide
                </h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2 font-serif">1. Filter Products</h4>
                  <p className="text-sm text-slate-600">Use the "Cars Only" and "Phones Only" buttons to filter the product catalog by category.</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2 font-serif">2. Compare Models</h4>
                  <p className="text-sm text-slate-600">Navigate to the Compare tab and use the dropdown menus to select two models for side-by-side technical comparison.</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2 font-serif">3. Calculate EMI</h4>
                  <p className="text-sm text-slate-600">Use the EMI Calculator to adjust sliders for loan amount, interest rate, and tenure to calculate monthly payments.</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2 font-serif">4. View Analytics</h4>
                  <p className="text-sm text-slate-600">Access the Analytics Dashboard to view price trends, market insights, and performance metrics.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
}
