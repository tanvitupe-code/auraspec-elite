import api from './api';

/**
 * Dealer Service - Frontend service for dealer operations
 * Handles all dealer-related API calls including location-based searches
 */

class DealerService {
  /**
   * Get all dealers with pagination and filters
   * @param {Object} filters - Filter options (page, limit, type, city, sortBy)
   * @returns {Promise<Object>} Dealers list with pagination
   */
  static async getAllDealers(filters = {}) {
    try {
      const response = await api.get('/dealers', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error getting dealers:', error);
      throw error;
    }
  }

  /**
   * Get dealer by ID
   * @param {string} dealerId - Dealer ID
   * @returns {Promise<Object>} Dealer details
   */
  static async getDealerById(dealerId) {
    try {
      const response = await api.get(`/dealers/${dealerId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting dealer by ID:', error);
      throw error;
    }
  }

  /**
   * Find nearby dealers using geospatial query
   * @param {number} latitude - User's latitude
   * @param {number} longitude - User's longitude
   * @param {Object} options - Additional options (maxDistance, type)
   * @returns {Promise<Object>} Nearby dealers with distance
   */
  static async findNearbyDealers(latitude, longitude, options = {}) {
    try {
      const response = await api.get('/dealers/nearby', {
        params: {
          latitude,
          longitude,
          ...options
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error finding nearby dealers:', error);
      throw error;
    }
  }

  /**
   * Get dealers by type
   * @param {string} type - Dealer type (Car Showroom, Mobile Store, etc.)
   * @returns {Promise<Object>} Dealers of specified type
   */
  static async getDealersByType(type) {
    try {
      const response = await api.get(`/dealers/type/${type}`);
      return response.data;
    } catch (error) {
      console.error('Error getting dealers by type:', error);
      throw error;
    }
  }

  /**
   * Get dealers by city
   * @param {string} city - City name
   * @returns {Promise<Object>} Dealers in specified city
   */
  static async getDealersByCity(city) {
    try {
      const response = await api.get(`/dealers/location/${city}`);
      return response.data;
    } catch (error) {
      console.error('Error getting dealers by city:', error);
      throw error;
    }
  }

  /**
   * Get products by dealer
   * @param {string} dealerId - Dealer ID
   * @returns {Promise<Object>} Products from dealer
   */
  static async getDealerProducts(dealerId) {
    try {
      const response = await api.get(`/dealers/${dealerId}/products`);
      return response.data;
    } catch (error) {
      console.error('Error getting dealer products:', error);
      throw error;
    }
  }

  /**
   * Get dealer reviews
   * @param {string} dealerId - Dealer ID
   * @returns {Promise<Object>} Dealer reviews
   */
  static async getDealerReviews(dealerId) {
    try {
      const response = await api.get(`/dealers/${dealerId}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error getting dealer reviews:', error);
      throw error;
    }
  }

  /**
   * Get user's current location
   * @returns {Promise<Object>} User's coordinates
   */
  static async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error('Unable to retrieve your location'));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   * @param {number} lat1 - First latitude
   * @param {number} lon1 - First longitude
   * @param {number} lat2 - Second latitude
   * @param {number} lon2 - Second longitude
   * @returns {number} Distance in kilometers
   */
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
  }

  /**
   * Convert degrees to radians
   * @param {number} degrees - Degrees to convert
   * @returns {number} Radians
   */
  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Format distance for display
   * @param {number} distance - Distance in kilometers
   * @returns {string} Formatted distance string
   */
  static formatDistance(distance) {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    }
    return `${distance.toFixed(1)} km`;
  }

  /**
   * Get dealer type icon
   * @param {string} type - Dealer type
   * @returns {string} Icon name or emoji
   */
  static getDealerTypeIcon(type) {
    const icons = {
      'Car Showroom': '🚗',
      'Mobile Store': '📱',
      'Electronics Store': '📺',
      'General Retail': '🏪',
      'Online Retailer': '💻'
    };
    return icons[type] || '🏪';
  }

  /**
   * Get dealer type color
   * @param {string} type - Dealer type
   * @returns {string} CSS color class
   */
  static getDealerTypeColor(type) {
    const colors = {
      'Car Showroom': 'text-blue-600',
      'Mobile Store': 'text-purple-600',
      'Electronics Store': 'text-green-600',
      'General Retail': 'text-gray-600',
      'Online Retailer': 'text-orange-600'
    };
    return colors[type] || 'text-gray-600';
  }

  /**
   * Get dealer type background color
   * @param {string} type - Dealer type
   * @returns {string} CSS background color class
   */
  static getDealerTypeBgColor(type) {
    const colors = {
      'Car Showroom': 'bg-blue-100',
      'Mobile Store': 'bg-purple-100',
      'Electronics Store': 'bg-green-100',
      'General Retail': 'bg-gray-100',
      'Online Retailer': 'bg-orange-100'
    };
    return colors[type] || 'bg-gray-100';
  }

  /**
   * Format rating for display
   * @param {number} rating - Rating value
   * @returns {string} Formatted rating string
   */
  static formatRating(rating) {
    return rating.toFixed(1);
  }

  /**
   * Get rating stars
   * @param {number} rating - Rating value (0-5)
   * @returns {string} Star emoji string
   */
  static getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '⭐'.repeat(fullStars) + 
           (hasHalfStar ? '⭐' : '') + 
           '☆'.repeat(emptyStars);
  }

  /**
   * Format operating hours for display
   * @param {Object} operatingHours - Operating hours object
   * @returns {Object} Formatted operating hours
   */
  static formatOperatingHours(operatingHours) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const formatted = {};
    
    days.forEach(day => {
      const hours = operatingHours[day];
      if (hours && !hours.isClosed) {
        formatted[day.charAt(0).toUpperCase() + day.slice(1)] = 
          `${hours.open} - ${hours.close}`;
      } else {
        formatted[day.charAt(0).toUpperCase() + day.slice(1)] = 'Closed';
      }
    });
    
    return formatted;
  }

  /**
   * Check if dealer is currently open
   * @param {Object} operatingHours - Operating hours object
   * @returns {boolean} True if dealer is open
   */
  static isDealerOpen(operatingHours) {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = dayNames[day];
    
    const hours = operatingHours[currentDay];
    if (!hours || hours.isClosed) {
      return false;
    }
    
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openHour, openMin] = hours.open.split(':').map(Number);
    const [closeHour, closeMin] = hours.close.split(':').map(Number);
    
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    return currentTime >= openTime && currentTime <= closeTime;
  }

  /**
   * Get open status color
   * @param {boolean} isOpen - Whether dealer is open
   * @returns {string} CSS color class
   */
  static getOpenStatusColor(isOpen) {
    return isOpen ? 'text-green-600' : 'text-red-600';
  }

  /**
   * Get open status background color
   * @param {boolean} isOpen - Whether dealer is open
   * @returns {string} CSS background color class
   */
  static getOpenStatusBgColor(isOpen) {
    return isOpen ? 'bg-green-100' : 'bg-red-100';
  }

  /**
   * Sort dealers by distance
   * @param {Array} dealers - Array of dealers with distance property
   * @returns {Array} Sorted dealers
   */
  static sortByDistance(dealers) {
    return [...dealers].sort((a, b) => a.distance - b.distance);
  }

  /**
   * Sort dealers by rating
   * @param {Array} dealers - Array of dealers
   * @returns {Array} Sorted dealers
   */
  static sortByRating(dealers) {
    return [...dealers].sort((a, b) => b.rating - a.rating);
  }

  /**
   * Filter dealers by type
   * @param {Array} dealers - Array of dealers
   * @param {string} type - Dealer type to filter by
   * @returns {Array} Filtered dealers
   */
  static filterByType(dealers, type) {
    if (!type) return dealers;
    return dealers.filter(dealer => dealer.type === type);
  }

  /**
   * Filter dealers by maximum distance
   * @param {Array} dealers - Array of dealers with distance property
   * @param {number} maxDistance - Maximum distance in km
   * @returns {Array} Filtered dealers
   */
  static filterByMaxDistance(dealers, maxDistance) {
    if (!maxDistance) return dealers;
    return dealers.filter(dealer => dealer.distance <= maxDistance);
  }
}

export default DealerService;
