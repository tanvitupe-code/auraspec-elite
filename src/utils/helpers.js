// Utility function to easily clean and display currencies
export const formatCurrency = (value) => {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
  return value;
};

// Utility function to cleanly handle long description caps safely
export const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};