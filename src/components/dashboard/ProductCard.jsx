import React from 'react';
import { Heart, Lock, Check } from 'lucide-react';
import Button from '../ui/Button';

export default function ProductCard({ product, isCompared, onCompareToggle, onWishlistToggle, isWishlisted, onClick }) {
  const name = product.title || product.name || 'Unknown Item';
  const price = product.globalPricing?.[0] ? `$${product.globalPricing[0].basePrice} USD` : `₹${product.price?.toLocaleString() || 'N/A'}`;
  const imageUrl = product.images?.front || product.images?.side || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80';

  const handleCompareClick = (e) => {
    e.stopPropagation();
    onCompareToggle(product);
    // Navigate to compare tab and auto-populate model 1
    if (typeof onCompareToggle === 'function' && onCompareToggle.length > 0) {
      onCompareToggle(product);
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl bg-white/95 border p-6 flex flex-col justify-between transition-all hover:shadow-lg cursor-pointer ${
        isCompared ? 'border-orange-300 shadow-md shadow-orange-900/5' : 'border-orange-100/70'
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-mono uppercase bg-orange-50 px-2 py-1 rounded text-orange-700 font-semibold">
            {product.category}
          </span>
          {onWishlistToggle && (
            <button
              onClick={(e) => { e.stopPropagation(); onWishlistToggle(product); }}
              className={`p-2 rounded-lg transition ${
                isWishlisted
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-orange-50 text-orange-400 hover:text-orange-700 hover:bg-orange-100'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        
        {/* Product Image */}
        <div className="mb-3 rounded-xl overflow-hidden bg-orange-50/50">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-40 object-cover"
          />
        </div>
        
        <h3 className={`text-lg font-serif tracking-wide font-light antialiased capitalize text-slate-800 mb-1`}>{name}</h3>
        <p className={`text-sm font-semibold text-orange-700 mb-2 font-serif tracking-wide font-light antialiased capitalize`}>{price}</p>
        <p className="text-xs text-slate-500 font-mono tracking-wider font-semibold antialiased uppercase">
          {product.specifications?.processor || product.specifications?.engine || product.specs?.processor || product.specs?.engine}
        </p>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          variant={isCompared ? 'primary' : 'secondary'}
          className="flex-1"
          onClick={handleCompareClick}
        >
          {isCompared ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Selected
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Compare
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}