import api from './api';

/**
 * News Service - Frontend service for news content delivery
 * Handles all news-related API calls including tech and auto news, launches, and price updates
 */

class NewsService {
  /**
   * Get all news with pagination and filters
   * @param {Object} filters - Filter options (page, limit, category, subcategory, tag, search, isFeatured)
   * @returns {Promise<Object>} News list with pagination
   */
  static async getAllNews(filters = {}) {
    try {
      const response = await api.get('/news', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error getting news:', error);
      throw error;
    }
  }

  /**
   * Get news by ID
   * @param {string} newsId - News article ID
   * @returns {Promise<Object>} News article details
   */
  static async getNewsById(newsId) {
    try {
      const response = await api.get(`/news/${newsId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting news by ID:', error);
      throw error;
    }
  }

  /**
   * Get featured news
   * @param {number} limit - Number of featured articles to retrieve
   * @returns {Promise<Object>} Featured news articles
   */
  static async getFeaturedNews(limit = 5) {
    try {
      const response = await api.get('/news/featured', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error getting featured news:', error);
      throw error;
    }
  }

  /**
   * Get news by category
   * @param {string} category - Category name (Mobile, Auto)
   * @param {Object} filters - Filter options (page, limit)
   * @returns {Promise<Object>} News articles by category
   */
  static async getNewsByCategory(category, filters = {}) {
    try {
      const response = await api.get(`/news/category/${category}`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error getting news by category:', error);
      throw error;
    }
  }

  /**
   * Get latest phone launches
   * @param {number} limit - Number of launches to retrieve
   * @returns {Promise<Object>} Phone launch news
   */
  static async getPhoneLaunches(limit = 10) {
    try {
      const response = await api.get('/news/launches/phones', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error getting phone launches:', error);
      throw error;
    }
  }

  /**
   * Get latest car launches
   * @param {number} limit - Number of launches to retrieve
   * @returns {Promise<Object>} Car launch news
   */
  static async getCarLaunches(limit = 10) {
    try {
      const response = await api.get('/news/launches/cars', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error getting car launches:', error);
      throw error;
    }
  }

  /**
   * Get price updates
   * @param {number} limit - Number of updates to retrieve
   * @returns {Promise<Object>} Price update news
   */
  static async getPriceUpdates(limit = 10) {
    try {
      const response = await api.get('/news/price-updates', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error getting price updates:', error);
      throw error;
    }
  }

  /**
   * Search news
   * @param {string} query - Search query
   * @param {Object} filters - Filter options (page, limit)
   * @returns {Promise<Object>} Search results
   */
  static async searchNews(query, filters = {}) {
    try {
      const response = await api.get('/news/search', { 
        params: { q: query, ...filters } 
      });
      return response.data;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  }

  /**
   * Get available categories, subcategories, and tags
   * @returns {Promise<Object>} Available categories and tags
   */
  static async getCategories() {
    try {
      const response = await api.get('/news/categories');
      return response.data;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  }

  /**
   * Format date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  static formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  /**
   * Format full date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted full date string
   */
  static formatFullDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Get category icon
   * @param {string} category - Category name
   * @returns {string} Icon emoji
   */
  static getCategoryIcon(category) {
    const icons = {
      'Mobile': '📱',
      'Auto': '🚗',
      'Tech': '💻',
      'Industry': '📊'
    };
    return icons[category] || '📰';
  }

  /**
   * Get category color
   * @param {string} category - Category name
   * @returns {string} CSS color class
   */
  static getCategoryColor(category) {
    const colors = {
      'Mobile': 'text-blue-600',
      'Auto': 'text-green-600',
      'Tech': 'text-purple-600',
      'Industry': 'text-orange-600'
    };
    return colors[category] || 'text-gray-600';
  }

  /**
   * Get category background color
   * @param {string} category - Category name
   * @returns {string} CSS background color class
   */
  static getCategoryBgColor(category) {
    const colors = {
      'Mobile': 'bg-blue-100',
      'Auto': 'bg-green-100',
      'Tech': 'bg-purple-100',
      'Industry': 'bg-orange-100'
    };
    return colors[category] || 'bg-gray-100';
  }

  /**
   * Truncate summary for preview
   * @param {string} summary - Full summary
   * @param {number} maxLength - Maximum length (default: 150)
   * @returns {string} Truncated summary
   */
  static truncateSummary(summary, maxLength = 150) {
    if (!summary || summary.length <= maxLength) return summary;
    return summary.substring(0, maxLength).trim() + '...';
  }

  /**
   * Get subcategory badge color
   * @param {string} subcategory - Subcategory name
   * @returns {string} CSS color class
   */
  static getSubcategoryColor(subcategory) {
    const colors = {
      'Launch': 'bg-green-500',
      'Price Update': 'bg-red-500',
      'Review': 'bg-blue-500',
      'Rumor': 'bg-yellow-500',
      'Industry News': 'bg-purple-500'
    };
    return colors[subcategory] || 'bg-gray-500';
  }

  /**
   * Filter news by category
   * @param {Array} news - Array of news articles
   * @param {string} category - Category to filter by
   * @returns {Array} Filtered news
   */
  static filterByCategory(news, category) {
    if (!category) return news;
    return news.filter(article => article.category === category);
  }

  /**
   * Filter news by tag
   * @param {Array} news - Array of news articles
   * @param {string} tag - Tag to filter by
   * @returns {Array} Filtered news
   */
  static filterByTag(news, tag) {
    if (!tag) return news;
    return news.filter(article => 
      article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  /**
   * Sort news by date (newest first)
   * @param {Array} news - Array of news articles
   * @returns {Array} Sorted news
   */
  static sortByDateNewest(news) {
    return [...news].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }

  /**
   * Sort news by date (oldest first)
   * @param {Array} news - Array of news articles
   * @returns {Array} Sorted news
   */
  static sortByDateOldest(news) {
    return [...news].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
  }

  /**
   * Get featured news from array
   * @param {Array} news - Array of news articles
   * @param {number} limit - Number of featured articles to return
   * @returns {Array} Featured news
   */
  static getFeaturedFromArray(news, limit = 5) {
    return news
      .filter(article => article.isFeatured)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
  }

  /**
   * Get unique categories from news array
   * @param {Array} news - Array of news articles
   * @returns {Array} Unique categories
   */
  static getUniqueCategories(news) {
    return [...new Set(news.map(article => article.category))];
  }

  /**
   * Get unique tags from news array
   * @param {Array} news - Array of news articles
   * @returns {Array} Unique tags
   */
  static getUniqueTags(news) {
    const allTags = news.flatMap(article => article.tags);
    return [...new Set(allTags)];
  }

  /**
   * Get news count by category
   * @param {Array} news - Array of news articles
   * @returns {Object} Category counts
   */
  static getCategoryCounts(news) {
    const counts = {};
    news.forEach(article => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    return counts;
  }

  /**
   * Validate search query
   * @param {string} query - Search query
   * @returns {Object} Validation result
   */
  static validateSearchQuery(query) {
    if (!query || query.trim() === '') {
      return {
        isValid: false,
        error: 'Search query is required'
      };
    }

    if (query.length < 2) {
      return {
        isValid: false,
        error: 'Search query must be at least 2 characters'
      };
    }

    if (query.length > 100) {
      return {
        isValid: false,
        error: 'Search query is too long'
      };
    }

    return {
      isValid: true
    };
  }

  /**
   * Highlight search terms in text
   * @param {string} text - Text to highlight
   * @param {string} query - Search query
   * @returns {string} Text with highlighted terms
   */
  static highlightSearchTerms(text, query) {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Get related news based on tags and category
   * @param {Object} currentArticle - Current news article
   * @param {Array} allNews - All news articles
   * @param {number} limit - Number of related articles to return
   * @returns {Array} Related news articles
   */
  static getRelatedNews(currentArticle, allNews, limit = 4) {
    const related = allNews
      .filter(article => 
        article.id !== currentArticle.id &&
        (article.category === currentArticle.category ||
         article.tags.some(tag => currentArticle.tags.includes(tag)))
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);

    return related;
  }
}

export default NewsService;
