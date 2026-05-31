import api from './api';

/**
 * Wishlist Service - Frontend service for wishlist operations
 * Handles all wishlist-related API calls including add, remove, update, and sharing
 */

class WishlistService {
  /**
   * Get user's wishlist
   * @returns {Promise<Object>} User's wishlist with populated products
   */
  static async getWishlist() {
    try {
      const response = await api.get('/wishlist');
      return response.data;
    } catch (error) {
      console.error('Error getting wishlist:', error);
      throw error;
    }
  }

  /**
   * Create a new wishlist
   * @param {Object} wishlistData - Wishlist data (name, isPublic)
   * @returns {Promise<Object>} Created wishlist
   */
  static async createWishlist(wishlistData) {
    try {
      const response = await api.post('/wishlist', wishlistData);
      return response.data;
    } catch (error) {
      console.error('Error creating wishlist:', error);
      throw error;
    }
  }

  /**
   * Get wishlist by ID
   * @param {string} wishlistId - Wishlist ID
   * @returns {Promise<Object>} Wishlist details
   */
  static async getWishlistById(wishlistId) {
    try {
      const response = await api.get(`/wishlist/${wishlistId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting wishlist by ID:', error);
      throw error;
    }
  }

  /**
   * Update wishlist
   * @param {string} wishlistId - Wishlist ID
   * @param {Object} updateData - Data to update (name, isPublic, notificationEnabled)
   * @returns {Promise<Object>} Updated wishlist
   */
  static async updateWishlist(wishlistId, updateData) {
    try {
      const response = await api.put(`/wishlist/${wishlistId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating wishlist:', error);
      throw error;
    }
  }

  /**
   * Delete wishlist
   * @param {string} wishlistId - Wishlist ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  static async deleteWishlist(wishlistId) {
    try {
      const response = await api.delete(`/wishlist/${wishlistId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting wishlist:', error);
      throw error;
    }
  }

  /**
   * Add product to wishlist
   * @param {string} wishlistId - Wishlist ID
   * @param {string} productId - Product ID to add
   * @param {Object} itemData - Optional item data (notes, priority)
   * @returns {Promise<Object>} Updated wishlist
   */
  static async addToWishlist(wishlistId, productId, itemData = {}) {
    try {
      const response = await api.post(`/wishlist/${wishlistId}/products`, {
        productId,
        ...itemData
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  /**
   * Remove product from wishlist
   * @param {string} wishlistId - Wishlist ID
   * @param {string} productId - Product ID to remove
   * @returns {Promise<Object>} Updated wishlist
   */
  static async removeFromWishlist(wishlistId, productId) {
    try {
      const response = await api.delete(`/wishlist/${wishlistId}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }

  /**
   * Update wishlist item (notes/priority)
   * @param {string} wishlistId - Wishlist ID
   * @param {string} productId - Product ID
   * @param {Object} itemData - Item data to update (notes, priority)
   * @returns {Promise<Object>} Updated wishlist
   */
  static async updateWishlistItem(wishlistId, productId, itemData) {
    try {
      const response = await api.put(`/wishlist/${wishlistId}/products/${productId}`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error updating wishlist item:', error);
      throw error;
    }
  }

  /**
   * Generate share link for wishlist
   * @param {string} wishlistId - Wishlist ID
   * @returns {Promise<Object>} Share token and URL
   */
  static async shareWishlist(wishlistId) {
    try {
      const response = await api.post(`/wishlist/${wishlistId}/share`);
      return response.data;
    } catch (error) {
      console.error('Error sharing wishlist:', error);
      throw error;
    }
  }

  /**
   * Access shared wishlist
   * @param {string} shareToken - Share token
   * @returns {Promise<Object>} Shared wishlist
   */
  static async getSharedWishlist(shareToken) {
    try {
      const response = await api.get(`/wishlist/share/${shareToken}`);
      return response.data;
    } catch (error) {
      console.error('Error getting shared wishlist:', error);
      throw error;
    }
  }

  /**
   * Toggle wishlist notifications
   * @param {string} wishlistId - Wishlist ID
   * @param {boolean} enabled - Enable or disable notifications
   * @returns {Promise<Object>} Updated wishlist
   */
  static async toggleWishlistNotifications(wishlistId, enabled) {
    try {
      const response = await api.put(`/wishlist/${wishlistId}/notifications`, { enabled });
      return response.data;
    } catch (error) {
      console.error('Error toggling wishlist notifications:', error);
      throw error;
    }
  }

  /**
   * Check if product is in wishlist
   * @param {Object} wishlist - Wishlist object
   * @param {string} productId - Product ID to check
   * @returns {boolean} True if product is in wishlist
   */
  static isProductInWishlist(wishlist, productId) {
    if (!wishlist || !wishlist.products) return false;
    return wishlist.products.some(item => item.product._id === productId);
  }

  /**
   * Get wishlist item by product ID
   * @param {Object} wishlist - Wishlist object
   * @param {string} productId - Product ID
   * @returns {Object|null} Wishlist item or null
   */
  static getWishlistItem(wishlist, productId) {
    if (!wishlist || !wishlist.products) return null;
    return wishlist.products.find(item => item.product._id === productId) || null;
  }

  /**
   * Calculate price savings for wishlist items
   * @param {Object} wishlist - Wishlist object
   * @returns {Object} Savings information
   */
  static calculateSavings(wishlist) {
    if (!wishlist || !wishlist.products) {
      return { totalSavings: 0, itemsWithSavings: 0 };
    }

    let totalSavings = 0;
    let itemsWithSavings = 0;

    wishlist.products.forEach(item => {
      const currentPrice = item.product.price || 0;
      const priceAtAddition = item.priceAtAddition || 0;
      
      if (currentPrice < priceAtAddition) {
        const savings = priceAtAddition - currentPrice;
        totalSavings += savings;
        itemsWithSavings++;
      }
    });

    return {
      totalSavings: Math.round(totalSavings * 100) / 100,
      itemsWithSavings,
      totalItems: wishlist.products.length
    };
  }

  /**
   * Sort wishlist items by priority
   * @param {Array} items - Wishlist items
   * @returns {Array} Sorted items
   */
  static sortByPriority(items) {
    const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
    return [...items].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  /**
   * Sort wishlist items by price (low to high)
   * @param {Array} items - Wishlist items
   * @returns {Array} Sorted items
   */
  static sortByPriceLowToHigh(items) {
    return [...items].sort((a, b) => {
      return (a.product.price || 0) - (b.product.price || 0);
    });
  }

  /**
   * Sort wishlist items by price (high to low)
   * @param {Array} items - Wishlist items
   * @returns {Array} Sorted items
   */
  static sortByPriceHighToLow(items) {
    return [...items].sort((a, b) => {
      return (b.product.price || 0) - (a.product.price || 0);
    });
  }

  /**
   * Sort wishlist items by date added (newest first)
   * @param {Array} items - Wishlist items
   * @returns {Array} Sorted items
   */
  static sortByDateAdded(items) {
    return [...items].sort((a, b) => {
      return new Date(b.addedAt) - new Date(a.addedAt);
    });
  }

  /**
   * Format priority for display
   * @param {string} priority - Priority value
   * @returns {string} Formatted priority
   */
  static formatPriority(priority) {
    return priority || 'Medium';
  }

  /**
   * Get priority color class
   * @param {string} priority - Priority value
   * @returns {string} CSS color class
   */
  static getPriorityColor(priority) {
    const colors = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  }

  /**
   * Get priority background color class
   * @param {string} priority - Priority value
   * @returns {string} CSS background color class
   */
  static getPriorityBgColor(priority) {
    const colors = {
      'High': 'bg-red-100',
      'Medium': 'bg-yellow-100',
      'Low': 'bg-green-100'
    };
    return colors[priority] || 'bg-gray-100';
  }
}

export default WishlistService;
