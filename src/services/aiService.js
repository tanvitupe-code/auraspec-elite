import api from './api';

/**
 * AI Service - Frontend service for AI-powered review analysis
 * Handles all AI-related API calls for sentiment analysis, insights, and recommendations
 */

class AIService {
  /**
   * Analyze a single review text for sentiment, pros, and cons
   * @param {string} text - Review text to analyze
   * @returns {Promise<Object>} Analysis result with sentiment, pros, cons
   */
  static async analyzeReview(text) {
    try {
      const response = await api.post('/ai/analyze-review', { text });
      return response.data;
    } catch (error) {
      console.error('Error analyzing review:', error);
      throw error;
    }
  }

  /**
   * Analyze all reviews for a specific product
   * @param {string} productId - Product ID to analyze
   * @returns {Promise<Object>} Complete analysis with sentiment, pros, cons, buy score
   */
  static async analyzeProduct(productId) {
    try {
      const response = await api.post('/ai/analyze-product', { productId });
      return response.data;
    } catch (error) {
      console.error('Error analyzing product:', error);
      throw error;
    }
  }

  /**
   * Get AI insights for a product
   * @param {string} productId - Product ID
   * @returns {Promise<Object>} AI insights including sentiment score, pros, cons, summary
   */
  static async getProductInsights(productId) {
    try {
      const response = await api.get(`/ai/insights/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting product insights:', error);
      throw error;
    }
  }

  /**
   * Get sentiment trends for a product over time
   * @param {string} productId - Product ID
   * @param {number} days - Number of days to analyze (default: 30)
   * @returns {Promise<Object>} Sentiment trends data
   */
  static async getSentimentTrends(productId, days = 30) {
    try {
      const response = await api.get(`/ai/sentiment-trends/${productId}`, {
        params: { days }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting sentiment trends:', error);
      throw error;
    }
  }

  /**
   * Extract key features from product reviews
   * @param {string} productId - Product ID
   * @returns {Promise<Object>} Key features with mention counts
   */
  static async getKeyFeatures(productId) {
    try {
      const response = await api.get(`/ai/key-features/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error extracting key features:', error);
      throw error;
    }
  }

  /**
   * Generate review summary for a product
   * @param {string} productId - Product ID
   * @returns {Promise<Object>} Review summary with sentiment, pros, cons, buy score
   */
  static async summarizeReviews(productId) {
    try {
      const response = await api.post('/ai/summarize-reviews', { productId });
      return response.data;
    } catch (error) {
      console.error('Error summarizing reviews:', error);
      throw error;
    }
  }

  /**
   * Compare multiple products with AI
   * @param {Array<string>} productIds - Array of product IDs to compare
   * @returns {Promise<Object>} Comparison results with buy scores
   */
  static async compareProducts(productIds) {
    try {
      const response = await api.post('/ai/compare-products', { productIds });
      return response.data;
    } catch (error) {
      console.error('Error comparing products:', error);
      throw error;
    }
  }

  /**
   * Get personalized product recommendations for a user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Personalized recommendations
   */
  static async getRecommendations(userId) {
    try {
      const response = await api.get(`/ai/recommendations/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }

  /**
   * Generate AI-powered comparison
   * @param {Array<string>} productIds - Array of product IDs
   * @returns {Promise<Object>} AI comparison with category winners
   */
  static async generateComparison(productIds) {
    try {
      const response = await api.post('/ai/generate-comparison', { productIds });
      return response.data;
    } catch (error) {
      console.error('Error generating comparison:', error);
      throw error;
    }
  }

  /**
   * Format sentiment percentage for display
   * @param {number} percentage - Sentiment percentage
   * @returns {string} Formatted percentage string
   */
  static formatSentiment(percentage) {
    return `${Math.round(percentage)}%`;
  }

  /**
   * Get sentiment color based on type
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
   * Get sentiment background color based on type
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
   * Format buy score for display
   * @param {number} score - Buy score (0-10)
   * @returns {string} Formatted score string
   */
  static formatBuyScore(score) {
    return score.toFixed(1);
  }

  /**
   * Get buy score rating label
   * @param {number} score - Buy score (0-10)
   * @returns {string} Rating label
   */
  static getBuyScoreRating(score) {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Very Good';
    if (score >= 5.5) return 'Good';
    if (score >= 4.0) return 'Average';
    if (score >= 2.5) return 'Below Average';
    return 'Poor';
  }

  /**
   * Get buy score color based on score
   * @param {number} score - Buy score (0-10)
   * @returns {string} CSS color class
   */
  static getBuyScoreColor(score) {
    if (score >= 8.5) return 'text-green-600';
    if (score >= 7.0) return 'text-blue-600';
    if (score >= 5.5) return 'text-yellow-600';
    if (score >= 4.0) return 'text-orange-600';
    return 'text-red-600';
  }
}

export default AIService;
