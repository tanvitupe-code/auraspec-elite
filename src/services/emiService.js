import api from './api';

/**
 * EMI Calculator Service - Frontend service for EMI calculations
 * Handles all EMI-related API calls and utility functions
 */

class EMIService {
  /**
   * Calculate EMI for a loan
   * @param {number} price - Total price of the product
   * @param {number} downPayment - Initial down payment amount
   * @param {number} interestRate - Annual interest rate in percentage
   * @param {number} durationMonths - Loan duration in months
   * @returns {Promise<Object>} EMI calculation result
   */
  static async calculateEMI(price, downPayment, interestRate, durationMonths) {
    try {
      const response = await api.post('/emi/calculate', {
        price,
        downPayment,
        interestRate,
        durationMonths
      });
      return response.data;
    } catch (error) {
      console.error('Error calculating EMI:', error);
      throw error;
    }
  }

  /**
   * Compare EMI for different durations
   * @param {number} price - Total price
   * @param {number} downPayment - Down payment
   * @param {number} interestRate - Interest rate
   * @param {Array<number>} durations - Array of durations in months
   * @returns {Promise<Object>} Comparison results
   */
  static async compareDurations(price, downPayment, interestRate, durations) {
    try {
      const response = await api.post('/emi/compare', {
        price,
        downPayment,
        interestRate,
        durations
      });
      return response.data;
    } catch (error) {
      console.error('Error comparing durations:', error);
      throw error;
    }
  }

  /**
   * Check affordability based on monthly income
   * @param {number} monthlyIncome - User's monthly income
   * @param {number} price - Product price
   * @param {number} downPayment - Down payment
   * @param {number} interestRate - Interest rate
   * @returns {Promise<Object>} Affordability analysis
   */
  static async checkAffordability(monthlyIncome, price, downPayment, interestRate) {
    try {
      const response = await api.post('/emi/check-affordability', {
        monthlyIncome,
        price,
        downPayment,
        interestRate
      });
      return response.data;
    } catch (error) {
      console.error('Error checking affordability:', error);
      throw error;
    }
  }

  /**
   * Format currency for display
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code (default: 'USD')
   * @returns {string} Formatted currency string
   */
  static formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Format percentage for display
   * @param {number} value - Percentage value
   * @param {number} decimals - Number of decimal places (default: 2)
   * @returns {string} Formatted percentage string
   */
  static formatPercentage(value, decimals = 2) {
    return `${value.toFixed(decimals)}%`;
  }

  /**
   * Get standard loan durations in months
   * @returns {Array<number>} Array of standard durations
   */
  static getStandardDurations() {
    return [12, 24, 36, 48, 60, 72, 84, 96];
  }

  /**
   * Get standard interest rates
   * @returns {Array<number>} Array of standard interest rates
   */
  static getStandardInterestRates() {
    return [5.0, 6.5, 8.0, 9.5, 11.0, 12.5];
  }

  /**
   * Calculate down payment percentage
   * @param {number} price - Total price
   * @param {number} downPayment - Down payment amount
   * @returns {number} Down payment percentage
   */
  static calculateDownPaymentPercentage(price, downPayment) {
    if (price === 0) return 0;
    return (downPayment / price) * 100;
  }

  /**
   * Calculate down payment amount from percentage
   * @param {number} price - Total price
   * @param {number} percentage - Down payment percentage
   * @returns {number} Down payment amount
   */
  static calculateDownPaymentFromPercentage(price, percentage) {
    return (price * percentage) / 100;
  }

  /**
   * Get recommended down payment percentages
   * @returns {Array<number>} Array of recommended percentages
   */
  static getRecommendedDownPaymentPercentages() {
    return [10, 20, 30, 40, 50];
  }

  /**
   * Validate EMI inputs
   * @param {Object} inputs - EMI calculation inputs
   * @returns {Object} Validation result with errors
   */
  static validateInputs(inputs) {
    const errors = [];
    const { price, downPayment, interestRate, durationMonths } = inputs;

    if (!price || price <= 0) {
      errors.push('Price must be greater than 0');
    }

    if (downPayment === undefined || downPayment === null) {
      errors.push('Down payment is required');
    } else if (downPayment < 0) {
      errors.push('Down payment cannot be negative');
    } else if (downPayment >= price) {
      errors.push('Down payment cannot be greater than or equal to price');
    }

    if (interestRate === undefined || interestRate === null) {
      errors.push('Interest rate is required');
    } else if (interestRate < 0) {
      errors.push('Interest rate cannot be negative');
    } else if (interestRate > 30) {
      errors.push('Interest rate seems too high');
    }

    if (!durationMonths || durationMonths <= 0) {
      errors.push('Duration must be greater than 0');
    } else if (durationMonths > 360) {
      errors.push('Duration cannot exceed 360 months (30 years)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get affordability status color
   * @param {number} emiPercentage - EMI as percentage of income
   * @returns {string} CSS color class
   */
  static getAffordabilityColor(emiPercentage) {
    if (emiPercentage <= 30) return 'text-green-600';
    if (emiPercentage <= 40) return 'text-yellow-600';
    return 'text-red-600';
  }

  /**
   * Get affordability status background color
   * @param {number} emiPercentage - EMI as percentage of income
   * @returns {string} CSS background color class
   */
  static getAffordabilityBgColor(emiPercentage) {
    if (emiPercentage <= 30) return 'bg-green-100';
    if (emiPercentage <= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  }

  /**
   * Get affordability status label
   * @param {number} emiPercentage - EMI as percentage of income
   * @returns {string} Status label
   */
  static getAffordabilityLabel(emiPercentage) {
    if (emiPercentage <= 30) return 'Excellent';
    if (emiPercentage <= 40) return 'Good';
    if (emiPercentage <= 50) return 'Moderate';
    return 'Risky';
  }

  /**
   * Prepare amortization schedule data for charts
   * @param {Array} schedule - Amortization schedule from API
   * @returns {Object} Chart-ready data
   */
  static prepareAmortizationChartData(schedule) {
    if (!schedule || schedule.length === 0) {
      return {
        labels: [],
        principal: [],
        interest: [],
        total: []
      };
    }

    return {
      labels: schedule.map(item => `Year ${item.year}`),
      principal: schedule.map(item => item.principalPayment),
      interest: schedule.map(item => item.interestPayment),
      total: schedule.map(item => item.totalPayment)
    };
  }

  /**
   * Calculate total cost breakdown
   * @param {Object} emiData - EMI calculation result
   * @returns {Object} Cost breakdown
   */
  static getCostBreakdown(emiData) {
    const { price, downPayment, totalInterest, totalAmount } = emiData;
    
    return {
      downPayment: downPayment,
      principalAmount: price - downPayment,
      interestAmount: totalInterest,
      totalAmount: totalAmount,
      downPaymentPercentage: this.calculateDownPaymentPercentage(price, downPayment),
      interestPercentage: (totalInterest / (price - downPayment)) * 100
    };
  }
}

export default EMIService;
