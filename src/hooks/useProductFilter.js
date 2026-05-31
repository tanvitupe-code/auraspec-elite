import { useState, useMemo } from 'react';

export function useProductFilter(products) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => {
      const title = p.title || p.name || '';
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    if (!Array.isArray(products)) return ['All'];
    return ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
  }, [products]);

  return { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filteredProducts, categories };
}