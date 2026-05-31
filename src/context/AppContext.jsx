import React, { createContext, useContext, useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedModels, setSelectedModels] = useLocalStorage('smartai_models', []);
  const [darkMode, setDarkMode] = useLocalStorage('smartai_darkmode', false);
  const [wishlist, setWishlist] = useLocalStorage('smartai_wishlist', []);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    productService.getAllProducts()
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleCompare = (product) => {
    const id = product.id || product._id;
    setSelectedModels(prev => 
      prev.find(p => (p.id || p._id) === id)
        ? prev.filter(p => (p.id || p._id) !== id)
        : prev.length < 3 ? [...prev, product] : prev
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleWishlist = (product) => {
    const id = product.id || product._id;
    setWishlist(prev => 
      prev.find(p => (p.id || p._id) === id)
        ? prev.filter(p => (p.id || p._id) !== id)
        : [...prev, product]
    );
  };

  const addToInventory = (product) => {
    setProducts(prev => [...prev, product]);
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <AppContext.Provider value={{ 
      products, 
      loading, 
      selectedModels, 
      toggleCompare, 
      darkMode, 
      toggleDarkMode,
      wishlist,
      toggleWishlist,
      addToInventory,
      selectedProduct,
      selectProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);