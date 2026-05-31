import api from './api';

/**
 * Price Service - Frontend service for price tracking and alerts
 * Handles all price-related API calls including history, trends, and alerts
 */

class PriceService {
  /**
   * Get price history for a product
   * @param {string} productId - Product ID
   * @param {number} limit - Number of entries to retrieve (default: 30)
   * @returns {Promise<Object>} Price history data
   */
  static async getProductPriceHistory(productId, limit = 30) {
    try {
      const response = await api.get(`/prices/product/${productId}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting price history:', error);
      throw error;
    }
  }

  /**
   * Add price entry (admin/scraper)
   * @param {Object} priceData - Price entry data
   * @returns {Promise<Object>} Created price entry
   */
  static async addPriceEntry(priceData) {
    try {
      const response = await api.post('/prices', priceData);
      return response.data;
    } catch (error) {
      console.error('Error adding price entry:', error);
      throw error;
    }
  }

  /**
   * Compare prices across retailers
   * @param {string} productId - Product ID
   * @returns {Promise<Object>} Price comparison data
   */
  static async comparePrices(productId) {
    try {
      const response = await api.get(`/prices/${productId}/compare`);
      return response.data;
    } catch (error) {
      console.error('Error comparing prices:', error);
      throw error;
    }
  }

  /**
   * Get price trends and predictions
   * @param {string} productId - Product ID
   * @param {number} days - Number of days to analyze (default: 30)
   * @returns {Promise<Object>} Price trends and predictions
   */
  static async getPriceTrends(productId, days = 30) {
    try {
      const response = await api.get(`/prices/${productId}/trends`, {
        params: { days }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting price trends:', error);
      throw error;
    }
  }

  /**
   * Set price alert for a product
   * @param {string} productId - Product ID
   * @param {number} thresholdPrice - Price threshold
   * @param {string} alertType - Alert type ('below' or 'above')
   * @returns {Promise<Object>} Created price alert
   */
  static async setPriceAlert(productId, thresholdPrice, alertType = 'below') {
    try {
      const response = await api.post(`/prices/${productId}/alert`, {
        thresholdPrice,
        alertType
      });
      return response.data;
    } catch (error) {
      console.error('Error setting price alert:', error);
      throw error;
    }
  }

  /**
   * Remove price alert for a product
   * @param {string} productId - Product ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  static async removePriceAlert(productId) {
    try {
      const response = await api.delete(`/prices/${productId}/alert`);
      return response.data;
    } catch (error) {
      console.error('Error removing price alert:', error);
      throw error;
    }
  }

  /**
   * Update price alert threshold
   * @param {string} productId - Product ID
   * @param {number} thresholdPrice - New threshold price
   * @param {string} alertType - Alert type ('below' or 'above')
   * @returns {Promise<Object>} Updated price alert
   */
  static async updatePriceAlertThreshold(productId, thresholdPrice, alertType) {
    try {
      const response = await api.put(`/prices/${productId}/alert/threshold`, {
        thresholdPrice,
        alertType
      });
      return response.data;
    } catch (error) {
      console.error('Error updating price alert threshold:', error);
      throw error;
    }
  }

  /**
   * Get user's price alerts
   * @returns {Promise<Object>} User's price alerts
   */
  static async getUserPriceAlerts() {
    try {
      const response = await api.get('/prices/alerts');
      return response.data;
    } catch (error) {
      console.error('Error getting price alerts:', error);
      throw error;
    }
  }

  /**
   * Calculate price difference between old and new price
   * @param {number} oldPrice - Original price
   * @param {number} newPrice - New price
   * @returns {Object} Price difference data
   */
  static calculatePriceDifference(oldPrice, newPrice) {
    const difference = oldPrice - newPrice;
    const percentage = (difference / oldPrice) * 100;
    
    return {
      oldPrice,
      newPrice,
      difference: Math.round(difference * 100) / 100,
      percentage: Math.round(percentage * 100) / 100,
      isDrop: difference > 0,
      isRise: difference < 0
    };
  }

  /**
   * Format price for display
   * @param {number} price - Price value
   * @param {string} currency - Currency code (default: 'USD')
   * @returns {string} Formatted price string
   */
  static formatPrice(price, currency = 'USD') {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    });
    return formatter.format(price);
  }

  /**
   * Format price change for display
   * @param {number} percentage - Price change percentage
   * @returns {string} Formatted price change string
   */
  static formatPriceChange(percentage) {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(1)}%`;
  }

  /**
   * Get price change color class
   * @param {number} percentage - Price change percentage
   * @returns {string} CSS color class
   */
  static getPriceChangeColor(percentage) {
    if (percentage > 0) return 'text-green-600';
    if (percentage < 0) return 'text-red-600';
    return 'text-gray-600';
  }

  /**
   * Get price change background color class
   * @param {number} percentage - Price change percentage
   * @returns {string} CSS background color class
   */
  static getPriceChangeBgColor(percentage) {
    if (percentage > 0) return 'bg-green-100';
    if (percentage < 0) return 'bg-red-100';
    return 'bg-gray-100';
  }

  /**
   * Check if price is good deal based on history
   * @param {Array} priceHistory - Array of price history entries
   * @param {number} currentPrice - Current price
   * @returns {Object} Deal analysis
   */
  static analyzeDeal(priceHistory, currentPrice) {
    if (!priceHistory || priceHistory.length === 0) {
      return {
        isGoodDeal: false,
        dealRating: 'unknown',
        message: 'No price history available'
      };
    }

    const prices = priceHistory.map(entry => entry.price);
    const lowestPrice = Math.min(...prices);
    const highestPrice = Math.max(...prices);
    const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;

    const savingsFromHighest = highestPrice - currentPrice;
    const savingsPercentage = (savingsFromHighest / highestPrice) * 100;
    const differenceFromLowest = currentPrice - lowestPrice;

    let dealRating = 'fair';
    let isGoodDeal = false;
    let message = 'Price is average';

    if (currentPrice <= lowestPrice * 1.05) {
      dealRating = 'excellent';
      isGoodDeal = true;
      message = 'Best price in history!';
    } else if (currentPrice <= averagePrice) {
      dealRating = 'good';
      isGoodDeal = true;
      message = 'Below average price - good deal!';
    } else if (savingsPercentage > 10) {
      dealRating = 'good';
      isGoodDeal = true;
      message = `${savingsPercentage.toFixed(0)}% off highest price`;
    } else if (currentPrice > highestPrice) {
      dealRating = 'poor';
      message = 'Price is above historical high';
    }

    return {
      isGoodDeal,
      dealRating,
      message,
      lowestPrice,
      highestPrice,
      averagePrice: Math.round(averagePrice * 100) / 100,
      savingsFromHighest: Math.round(savingsFromHighest * 100) / 100,
      savingsPercentage: Math.round(savingsPercentage * 100) / 100,
      differenceFromLowest: Math.round(differenceFromLowest * 100) / 100
    };
  }

  /**
   * Get deal rating color class
   * @param {string} rating - Deal rating
   * @returns {string} CSS color class
   */
  static getDealRatingColor(rating) {
    const colors = {
      'excellent': 'text-green-600',
      'good': 'text-blue-600',
      'fair': 'text-yellow-600',
      'poor': 'text-red-600',
      'unknown': 'text-gray-600'
    };
    return colors[rating] || 'text-gray-600';
  }

  /**
   * Get deal rating background color class
   * @param {string} rating - Deal rating
   * @returns {string} CSS background color class
   */
  static getDealRatingBgColor(rating) {
    const colors = {
      'excellent': 'bg-green-100',
      'good': 'bg-blue-100',
      'fair': 'bg-yellow-100',
      'poor': 'bg-red-100',
      'unknown': 'bg-gray-100'
    };
    return colors[rating] || 'bg-gray-100';
  }

  /**
   * Prepare price history data for charts
   * @param {Array} priceHistory - Array of price history entries
   * @returns {Object} Chart-ready data
   */
  static prepareChartData(priceHistory) {
    if (!priceHistory || priceHistory.length === 0) {
      return {
        labels: [],
        prices: [],
        dates: []
      };
    }

    const sortedHistory = [...priceHistory].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    return {
      labels: sortedHistory.map(entry => 
        new Date(entry.date).toLocaleDateString()
      ),
      prices: sortedHistory.map(entry => entry.price),
      dates: sortedHistory.map(entry => entry.date)
    };
  }

  /**
   * Simulate price drop notification
   * @param {Object} product - Product object
   * @param {number} oldPrice - Old price
   * @param {number} newPrice - New price
   * @returns {Object} Notification object
   */
  static createPriceDropNotification(product, oldPrice, newPrice) {
    const difference = this.calculatePriceDifference(oldPrice, newPrice);
    
    return {
      type: 'PriceAlert',
      title: 'Price Drop Alert!',
      message: `${product.name} price dropped from ${this.formatPrice(oldPrice)} to ${this.formatPrice(newPrice)} (${this.formatPriceChange(difference.percentage)} off)`,
      priority: difference.percentage > 15 ? 'Urgent' : 'High',
      actionUrl: `/products/${product._id}`,
      actionLabel: 'View Product',
      metadata: {
        productId: product._id,
        oldPrice,
        newPrice,
        dropPercentage: difference.percentage
      },
      createdAt: new Date()
    };
  }
}

export default PriceService;
