import React from 'react';

/**
 * Card Component
 * Reusable card component with various styling options
 */
export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>;
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>;
};
