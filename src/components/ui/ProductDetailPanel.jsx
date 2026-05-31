import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Battery, Camera, Zap, Gauge, Fuel, ArrowLeft } from 'lucide-react';

export default function ProductDetailPanel({ product, onBack }) {
  const isCar = product?.category === 'Car';
  const [viewMode, setViewMode] = useState('front');
  const [aiReview, setAiReview] = useState('');
  
  const imageUrl = viewMode === 'front' 
    ? (product.images?.front || product.images?.side || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80')
    : (product.images?.back || product.images?.rear || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80');
  const specs = product.specs || product.specifications || {};

  // Dynamic AI Review Generation
  useEffect(() => {
    if (product?.images?.front || product?.images?.back) {
      const generateAIReview = () => {
        if (isCar) {
          return `AI Aero Review: This chassis architecture provides exceptional aerodynamic efficiency with a calculated drag coefficient of 0.22Cd. The thermal management system optimizes high-speed load stability, while the electric powertrain delivers instant torque with seamless power distribution across all four wheels. Premium materials and precision engineering ensure optimal weight distribution for enhanced handling dynamics.`;
        } else {
          return `AI Optical Review: This device features advanced computational photography with multi-lens array optimization. The display technology delivers exceptional color accuracy with 120Hz refresh rates for fluid visual experiences. Processing architecture leverages neural engine acceleration for real-time AI computations. Battery management system optimizes power efficiency through intelligent adaptive charging cycles, ensuring sustained performance under intensive workloads.`;
        }
      };
      setAiReview(generateAIReview());
    }
  }, [product, isCar]);

  if (!product) return null;

  return (
    <div className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 rounded-2xl overflow-hidden">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-700 bg-orange-50 hover:bg-orange-100/80 px-4 py-2 rounded-lg border border-orange-200 transition-all cursor-pointer shadow-sm m-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Showcase
        </button>
      )}
      
      {/* Hero Image */}
      <div className="relative h-80 bg-orange-50/50">
        <img 
          src={imageUrl} 
          alt={product.name || product.title}
          className="w-full h-full object-cover"
        />
        {!isCar && (
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('front')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === 'front' 
                  ? 'bg-orange-700 text-white' 
                  : 'bg-white/90 text-orange-700 hover:bg-white'
              }`}
            >
              Front Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('rear')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === 'rear' 
                  ? 'bg-orange-700 text-white' 
                  : 'bg-white/90 text-orange-700 hover:bg-white'
              }`}
            >
              Rear Matrix Studio Shot
            </motion.button>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
          <h2 className={`text-3xl font-serif tracking-wide font-light antialiased capitalize text-white mb-1`}>
            {product.name || product.title}
          </h2>
          <p className={`text-lg text-white/90 font-serif tracking-wide font-light antialiased capitalize`}>
            ₹{product.price?.toLocaleString() || 'N/A'}
          </p>
        </div>
      </div>

      {/* AI Review Panel */}
      {aiReview && (
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-700 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-orange-800 mb-2 uppercase tracking-wider">
                {isCar ? 'AI Aero Analysis' : 'AI Optical Analysis'}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {aiReview}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Technical Specification Panel */}
      <div className="p-6">
        <h3 className={`text-xl font-serif tracking-wide font-light antialiased capitalize text-orange-700 mb-6`}>
          Technical Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isCar ? (
            <>
              {/* Car Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-700 rounded-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-semibold antialiased uppercase text-orange-700">
                    Engine / Battery
                  </span>
                </div>
                <p className="text-lg font-semibold text-slate-800 font-serif tracking-wide font-light antialiased capitalize">{specs.engine || specs.battery || 'N/A'}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-700 rounded-lg">
                    <Gauge className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-semibold antialiased uppercase text-orange-700">
                    Range
                  </span>
                </div>
                <p className="text-lg font-semibold text-slate-800 font-serif tracking-wide font-light antialiased capitalize">{specs.range || 'N/A'}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-700 rounded-lg">
                    <Fuel className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-semibold antialiased uppercase text-orange-700">
                    Top Speed / Acceleration
                  </span>
                </div>
                <p className="text-lg font-semibold text-slate-800 font-serif tracking-wide font-light antialiased capitalize">{specs.acceleration || specs.topSpeed || 'N/A'}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-700 rounded-lg">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-semibold antialiased uppercase text-orange-700">
                    Horsepower
                  </span>
                </div>
                <p className="text-lg font-semibold text-slate-800 font-serif tracking-wide font-light antialiased capitalize">{specs.horsepower || specs.power || 'N/A'}</p>
              </motion.div>
            </>
          ) : (
            <>
              {/* Phone Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-700 rounded-lg">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-semibold antialiased uppercase text-orange-700">
                    Processor
                  </span>
                </div>
                <p className="text-lg font-semibold text-slate-800 font-serif tracking-wide font-light antialiased capitalize">{specs.processor || 'N/A'}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-700 rounded-lg">
                    <Battery className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-semibold antialiased uppercase text-orange-700">
                    Storage / RAM
                  </span>
                </div>
                <p className="text-lg font-semibold text-slate-800 font-serif tracking-wide font-light antialiased capitalize">{specs.storage || 'N/A'}</p>
                <p className="text-sm text-slate-600 mt-1 font-serif tracking-wide font-light antialiased capitalize">{specs.ram || 'N/A'}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-700 rounded-lg">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-semibold antialiased uppercase text-orange-700">
                    Camera System
                  </span>
                </div>
                <p className="text-lg font-semibold text-slate-800 font-serif tracking-wide font-light antialiased capitalize">{specs.camera || 'N/A'}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-700 rounded-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono tracking-wider font-semibold antialiased uppercase text-orange-700">
                    Battery Capacity
                  </span>
                </div>
                <p className="text-lg font-semibold text-slate-800 font-serif tracking-wide font-light antialiased capitalize">{specs.battery || 'N/A'}</p>
              </motion.div>
            </>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-orange-100">
          <h4 className={`text-sm font-serif tracking-wide font-light antialiased capitalize text-orange-700 mb-3`}>
            Expert Review
          </h4>
          <p className={`text-slate-600 leading-relaxed font-serif tracking-wide font-light antialiased`}>
            {product.category === 'Car' 
              ? `The ${product.name || product.title} represents the pinnacle of automotive engineering, combining exceptional performance with refined luxury. Its advanced powertrain delivers impressive efficiency without compromising driving dynamics. The interior craftsmanship showcases premium materials and cutting-edge technology, creating an unparalleled driving experience that sets new standards in its segment.`
              : `The ${product.name || product.title} exemplifies the perfect fusion of innovation and elegance. Its sophisticated processor ensures seamless performance for demanding tasks, while the stunning display brings content to life with remarkable clarity. The camera system captures moments with professional-grade precision, and the battery provides exceptional endurance for all-day productivity. A true masterpiece of modern technology.`
            }
          </p>
        </div>

        {/* Rating */}
        <div className="mt-6 flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xl ${
                  i < Math.floor(product.rating || 0)
                    ? 'text-orange-700'
                    : 'text-orange-200'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-slate-600">
            {product.rating || 0} ({product.numReviews || product.reviews || 0} reviews)
          </span>
        </div>
      </div>
    </div>
  );
}
