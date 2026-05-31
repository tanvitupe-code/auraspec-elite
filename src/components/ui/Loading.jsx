import React from 'react';

/**
 * Loading Component
 * Reusable loading spinner component
 */
export default function Loading({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]}`}></div>
      {text && <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
}

export function LoadingSkeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
  );
}
