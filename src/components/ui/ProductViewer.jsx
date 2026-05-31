import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, ZoomIn, ZoomOut, RefreshCw, Smartphone, Car } from 'lucide-react';

/**
 * Product Viewer Component
 * 360° View & Zoom functionality for product images
 */
export default function ProductViewer({ product = null }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState('front'); // front, back, side, interior
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Use product images if available, otherwise use fallback
  const productImages = product?.images ? Object.values(product.images) : [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80'
  ];

  const isCar = product?.category === 'Car';
  const viewLabels = isCar 
    ? ['front', 'back', 'side', 'interior']
    : ['front', 'back', 'side'];

  // Get current image based on view mode
  const getCurrentImage = () => {
    if (product?.images) {
      return product.images[viewMode] || product.images.front;
    }
    return productImages[currentImageIndex];
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    setZoomLevel(isZoomed ? 1 : 2);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    if (zoomLevel < 4) {
      setZoomLevel(zoomLevel + 0.5);
      setIsZoomed(true);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.5);
      if (zoomLevel - 0.5 <= 1) {
        setIsZoomed(false);
      }
    }
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setIsZoomed(false);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    const startX = e.clientX - panPosition.x;
    const startY = e.clientY - panPosition.y;

    const handleMouseMove = (e) => {
      setPanPosition({
        x: e.clientX - startX,
        y: e.clientY - startY
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const startRotation = () => {
    setIsRotating(true);
    let angle = 0;
    const interval = setInterval(() => {
      angle = (angle + 15) % 360;
      setRotation(angle);
      setCurrentImageIndex(Math.floor(angle / 45) % productImages.length);
    }, 100);

    return () => {
      clearInterval(interval);
      setIsRotating(false);
    };
  };

  const stopRotation = () => {
    setIsRotating(false);
  };

  const handleRotationChange = (e) => {
    const angle = parseInt(e.target.value);
    setRotation(angle);
    setCurrentImageIndex(Math.floor(angle / 45) % productImages.length);
  };

  return (
    <div className="space-y-6">
      {/* 360° View Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
className="bg-white border border-stone-200 shadow-sm hover:shadow-md rounded-2xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center gap-2">
            <RotateCw className="w-6 h-6" />
            360° Product View
          </h3>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseDown={startRotation}
              onMouseUp={stopRotation}
              onMouseLeave={stopRotation}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                isRotating 
                  ? 'bg-red-600/20 text-red-400 border border-red-500/50'
                  : 'bg-slate-800 text-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
              {isRotating ? 'Stop' : 'Rotate'}
            </motion.button>
          </div>
        </div>

        {/* 360° View Container */}
        <div className="relative bg-stone-100 rounded-2xl overflow-hidden aspect-square flex items-center justify-center border border-stone-200">
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isRotating ? 'none' : 'transform 0.3s ease'
            }}
          >
            <img
              src={getCurrentImage()}
              alt={`Product ${viewMode} view`}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>

          {/* Rotation Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-full text-sm border border-stone-200">
            {rotation}°
          </div>

          {/* View Mode Indicator */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-sm border border-stone-200 flex items-center gap-2">
            {isCar ? <Car className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
          </div>
        </div>

        {/* Rotation Slider */}
        <div className="mt-6">
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={handleRotationChange}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>0°</span>
            <span>90°</span>
            <span>180°</span>
            <span>270°</span>
            <span>360°</span>
          </div>
        </div>

        {/* View Mode Toggle */}
        {product?.images && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {viewLabels.map((view) => (
              <motion.button
                key={view}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(view)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === view
                    ? 'bg-slate-800 text-white'
                    : 'bg-stone-50 text-slate-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Image Zoom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
className="bg-white border border-stone-200 shadow-sm hover:shadow-md rounded-2xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center gap-2">
            <ZoomIn className="w-6 h-6" />
            Image Zoom
          </h3>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-2 bg-stone-50 text-slate-600 rounded-lg hover:bg-stone-100 transition disabled:opacity-50 disabled:cursor-not-allowed border border-stone-200"
            >
              <ZoomOut className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetZoom}
              className="p-2 bg-stone-50 text-slate-600 rounded-lg hover:bg-slate-700/50 transition border border-slate-700/50"
            >
              <RefreshCw className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleZoomIn}
              disabled={zoomLevel >= 4}
              className="p-2 bg-stone-50 text-slate-600 rounded-lg hover:bg-stone-100 transition disabled:opacity-50 disabled:cursor-not-allowed border border-stone-200"
            >
              <ZoomIn className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleZoomToggle}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isZoomed
                  ? 'bg-red-600/20 text-red-400 border border-red-500/50'
                  : 'bg-slate-800 text-white'
              }`}
            >
              {isZoomed ? 'Exit Zoom' : 'Zoom'}
            </motion.button>
          </div>
        </div>

        {/* Zoom Container */}
        <div
          ref={containerRef}
          className="relative bg-stone-100 rounded-2xl overflow-hidden cursor-crosshair border border-stone-200"
          style={{ height: '400px' }}
          onMouseDown={handleMouseDown}
        >
          <motion.div
            ref={imageRef}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            style={{
              transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={getCurrentImage()}
              alt="Product zoom view"
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />
          </motion.div>

          {/* Zoom Level Indicator */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-sm border border-stone-200">
            {Math.round(zoomLevel * 100)}%
          </div>

          {/* Zoom Instructions */}
          <AnimatePresence>
            {!isZoomed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-full text-sm border border-stone-200"
              >
                Click Zoom to enable, then drag to pan
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-full text-sm border border-stone-200"
              >
                Drag to pan • Use +/- buttons to zoom
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Zoom Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Zoom Level: {Math.round(zoomLevel * 100)}%
          </div>
          <div className="flex gap-2">
            {[1.5, 2, 3, 4].map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setZoomLevel(level)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  zoomLevel === level
                    ? 'bg-slate-800 text-white'
                    : 'bg-stone-50 text-slate-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {level}x
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
