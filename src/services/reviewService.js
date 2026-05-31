import api from './api';

/**
 * Review Service - Frontend service for review operations
 * Handles all review-related API calls including submission, management, and interaction
 */

class ReviewService {
  /**
   * Submit a new review for a product
   * @param {Object} reviewData - Review data (productId, rating, title, comment, images)
   * @returns {Promise<Object>} Created review
   */
  static async submitReview(reviewData) {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  }

  /**
   * Get all reviews with pagination and filters
   * @param {Object} filters - Filter options (page, limit, productId, userId, sentiment, minRating, maxRating)
   * @returns {Promise<Object>} Reviews list with pagination
   */
  static async getAllReviews(filters = {}) {
    try {
      const response = await api.get('/reviews', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error getting reviews:', error);
      throw error;
    }
  }

  /**
   * Get review by ID
   * @param {string} reviewId - Review ID
   * @returns {Promise<Object>} Review details
   */
  static async getReviewById(reviewId) {
    try {
      const response = await api.get(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting review by ID:', error);
      throw error;
    }
  }

  /**
   * Get reviews for a specific product
   * @param {string} productId - Product ID
   * @param {Object} filters - Filter options (page, limit, sentiment, sortBy)
   * @returns {Promise<Object>} Product reviews with pagination
   */
  static async getProductReviews(productId, filters = {}) {
    try {
      const response = await api.get(`/reviews/product/${productId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error getting product reviews:', error);
      throw error;
    }
  }

  /**
   * Get reviews by user
   * @param {string} userId - User ID
   * @param {Object} filters - Filter options (page, limit)
   * @returns {Promise<Object>} User reviews with pagination
   */
  static async getUserReviews(userId, filters = {}) {
    try {
      const response = await api.get(`/reviews/user/${userId}`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error getting user reviews:', error);
      throw error;
    }
  }

  /**
   * Update a review
   * @param {string} reviewId - Review ID
   * @param {Object} updateData - Data to update (rating, title, comment, images)
   * @returns {Promise<Object>} Updated review
   */
  static async updateReview(reviewId, updateData) {
    try {
      const response = await api.put(`/reviews/${reviewId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  }

  /**
   * Delete a review
   * @param {string} reviewId - Review ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  static async deleteReview(reviewId) {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }

  /**
   * Like a review
   * @param {string} reviewId - Review ID
   * @returns {Promise<Object>} Updated review
   */
  static async likeReview(reviewId) {
    try {
      const response = await api.post(`/reviews/${reviewId}/like`);
      return response.data;
    } catch (error) {
      console.error('Error liking review:', error);
      throw error;
    }
  }

  /**
   * Dislike a review
   * @param {string} reviewId - Review ID
   * @returns {Promise<Object>} Updated review
   */
  static async dislikeReview(reviewId) {
    try {
      const response = await api.post(`/reviews/${reviewId}/dislike`);
      return response.data;
    } catch (error) {
      console.error('Error disliking review:', error);
      throw error;
    }
  }

  /**
   * Reply to a review
   * @param {string} reviewId - Review ID
   * @param {string} comment - Reply comment
   * @returns {Promise<Object>} Updated review with reply
   */
  static async replyToReview(reviewId, comment) {
    try {
      const response = await api.post(`/reviews/${reviewId}/reply`, { comment });
      return response.data;
    } catch (error) {
      console.error('Error replying to review:', error);
      throw error;
    }
  }

  /**
   * Flag a review for moderation
   * @param {string} reviewId - Review ID
   * @param {string} reason - Flag reason
   * @returns {Promise<Object>} Updated review
   */
  static async flagReview(reviewId, reason) {
    try {
      const response = await api.post(`/reviews/${reviewId}/flag`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error flagging review:', error);
      throw error;
    }
  }

  /**
   * Format rating for display
   * @param {number} rating - Rating value (0-5)
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
   * Get sentiment color class
   * @param {string} sentiment - Sentiment type (Positive, Negative, Neutral)
   * @returns {string} CSS color class
   */
  static getSentimentColor(sentiment) {
    const colors = {
      'Positive': 'text-green-600',
      'Negative': 'text-red-600',
      'Neutral': 'text-gray-600'
    };
    return colors[sentiment] || 'text-gray-600';
  }

  /**
   * Get sentiment background color class
   * @param {string} sentiment - Sentiment type
   * @returns {string} CSS background color class
   */
  static getSentimentBgColor(sentiment) {
    const colors = {
      'Positive': 'bg-green-100',
      'Negative': 'bg-red-100',
      'Neutral': 'bg-gray-100'
    };
    return colors[sentiment] || 'bg-gray-100';
  }

  /**
   * Validate review data
   * @param {Object} reviewData - Review data to validate
   * @returns {Object} Validation result with errors
   */
  static validateReviewData(reviewData) {
    const errors = [];
    const { productId, rating, title, comment } = reviewData;

    if (!productId) {
      errors.push('Product ID is required');
    }

    if (!rating || rating < 1 || rating > 5) {
      errors.push('Rating must be between 1 and 5');
    }

    if (!comment || comment.trim() === '') {
      errors.push('Review comment is required');
    }

    if (comment && comment.length > 2000) {
      errors.push('Comment cannot exceed 2000 characters');
    }

    if (title && title.length > 100) {
      errors.push('Title cannot exceed 100 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Sort reviews by different criteria
   * @param {Array} reviews - Array of reviews
   * @param {string} sortBy - Sort criteria (newest, oldest, highest, lowest, helpful)
   * @returns {Array} Sorted reviews
   */
  static sortReviews(reviews, sortBy = 'newest') {
    const sorted = [...reviews];
    
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'helpful':
        return sorted.sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0));
      default:
        return sorted;
    }
  }

  /**
   * Filter reviews by sentiment
   * @param {Array} reviews - Array of reviews
   * @param {string} sentiment - Sentiment to filter by
   * @returns {Array} Filtered reviews
   */
  static filterBySentiment(reviews, sentiment) {
    if (!sentiment) return reviews;
    return reviews.filter(review => review.sentiment === sentiment);
  }

  /**
   * Filter reviews by rating range
   * @param {Array} reviews - Array of reviews
   * @param {number} minRating - Minimum rating
   * @param {number} maxRating - Maximum rating
   * @returns {Array} Filtered reviews
   */
  static filterByRatingRange(reviews, minRating, maxRating) {
    return reviews.filter(review => {
      if (minRating && review.rating < minRating) return false;
      if (maxRating && review.rating > maxRating) return false;
      return true;
    });
  }

  /**
   * Calculate average rating from reviews
   * @param {Array} reviews - Array of reviews
   * @returns {number} Average rating
   */
  static calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }

  /**
   * Get rating distribution
   * @param {Array} reviews - Array of reviews
   * @returns {Object} Rating distribution (5 stars, 4 stars, etc.)
   */
  static getRatingDistribution(reviews) {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    reviews.forEach(review => {
      const rating = Math.round(review.rating);
      if (distribution[rating] !== undefined) {
        distribution[rating]++;
      }
    });

    return distribution;
  }

  /**
   * Get sentiment distribution
   * @param {Array} reviews - Array of reviews
   * @returns {Object} Sentiment distribution
   */
  static getSentimentDistribution(reviews) {
    const distribution = { Positive: 0, Negative: 0, Neutral: 0 };
    
    reviews.forEach(review => {
      if (distribution[review.sentiment] !== undefined) {
        distribution[review.sentiment]++;
      }
    });

    return distribution;
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
   * Truncate comment for preview
   * @param {string} comment - Full comment
   * @param {number} maxLength - Maximum length (default: 150)
   * @returns {string} Truncated comment
   */
  static truncateComment(comment, maxLength = 150) {
    if (!comment || comment.length <= maxLength) return comment;
    return comment.substring(0, maxLength).trim() + '...';
  }
}

export default ReviewService;
