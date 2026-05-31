import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, DollarSign, Truck, AlertCircle, MapPin, TrendingUp } from 'lucide-react';

/**
 * Global Price Intelligence Component
 * Shows country-wise currency conversions and state-wise price cards
 */
export default function PriceIntelligence({ basePrice, currency = 'INR' }) {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedState, setSelectedState] = useState('Maharashtra');

  // Currency conversion rates (mock data)
  const exchangeRates = {
    INR: 1,
    USD: 0.012,
    GBP: 0.0095,
    AED: 0.044
  };

  // Country-wise prices
  const countryPrices = {
    USA: {
      currency: 'USD',
      symbol: '$',
      price: (basePrice * exchangeRates.USD).toFixed(2),
      taxRate: '8.25%',
      shipping: '$15.99',
      total: ((basePrice * exchangeRates.USD) + 15.99).toFixed(2)
    },
    UK: {
      currency: 'GBP',
      symbol: '£',
      price: (basePrice * exchangeRates.GBP).toFixed(2),
      taxRate: '20%',
      shipping: '£12.99',
      total: ((basePrice * exchangeRates.GBP) + 12.99).toFixed(2)
    },
    UAE: {
      currency: 'AED',
      symbol: 'د.إ',
      price: (basePrice * exchangeRates.AED).toFixed(2),
      taxRate: '5%',
      shipping: 'د.إ45.00',
      total: ((basePrice * exchangeRates.AED) + 45).toFixed(2)
    }
  };

  // State-wise prices (India)
  const statePrices = {
    Maharashtra: {
      taxRate: '18% GST',
      price: basePrice,
      total: (basePrice * 1.18).toFixed(2),
      shipping: '₹99'
    },
    Delhi: {
      taxRate: '18% GST',
      price: basePrice,
      total: (basePrice * 1.18).toFixed(2),
      shipping: '₹79'
    },
    Karnataka: {
      taxRate: '18% GST',
      price: basePrice,
      total: (basePrice * 1.18).toFixed(2),
      shipping: '₹89'
    },
    TamilNadu: {
      taxRate: '18% GST',
      price: basePrice,
      total: (basePrice * 1.18).toFixed(2),
      shipping: '₹95'
    }
  };

  const currentCountry = countryPrices[selectedCountry];
  const currentState = statePrices[selectedState];

  return (
    <div className="space-y-6">
      {/* Country-wise Price Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-stone-200 shadow-sm hover:shadow-md rounded-2xl p-6"
      >
        <h3 className={`text-xl font-serif tracking-wide font-light antialiased capitalize text-orange-700 mb-6 flex items-center gap-2`}>
          <Globe className="w-6 h-6" />
          Global Price Intelligence
        </h3>
        
        {/* Country Selector */}
        <div className="flex gap-2 mb-6">
          {Object.keys(countryPrices).map((country, index) => (
            <motion.button
              key={country}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCountry === country
                  ? 'bg-slate-800 text-white'
                  : 'bg-stone-50 text-slate-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {country}
            </motion.button>
          ))}
        </div>

        {/* Price Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl p-6 border border-orange-300 backdrop-blur-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-slate-600 mb-1 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price in {selectedCountry}
              </div>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {currentCountry.symbol}{currentCountry.price}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-1">Tax Rate</div>
              <div className="text-2xl font-bold text-slate-800">
                {currentCountry.taxRate}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-stone-200">
            <div>
              <div className="text-sm text-slate-600 mb-1 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Shipping
              </div>
              <div className="text-lg font-semibold text-slate-800">
                {currentCountry.shipping}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-1">Total</div>
              <div className="text-2xl font-extrabold text-slate-800 flex items-center gap-2 justify-end">
                <TrendingUp className="w-5 h-5" />
                {currentCountry.symbol}{currentCountry.total}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Comparison Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left py-3 text-slate-600 font-semibold">Country</th>
                <th className="text-right py-3 text-slate-600 font-semibold">Price</th>
                <th className="text-right py-3 text-slate-600 font-semibold">Tax</th>
                <th className="text-right py-3 text-slate-600 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(countryPrices).map(([country, data], index) => (
                <motion.tr 
                  key={country}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className={`border-b border-stone-200 cursor-pointer ${
                    selectedCountry === country ? 'bg-slate-100' : 'hover:bg-stone-50'
                  }`}
                  onClick={() => setSelectedCountry(country)}
                >
                  <td className="py-3 text-slate-800 font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {country}
                  </td>
                  <td className="text-right text-slate-600">{data.symbol}{data.price}</td>
                  <td className="text-right text-slate-600">{data.taxRate}</td>
                  <td className="text-right font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {data.symbol}{data.total}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* State-wise Price Cards (India) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-stone-200 shadow-sm hover:shadow-md rounded-2xl p-6"
      >
        <h3 className="text-xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          State-wise Pricing (India)
        </h3>
        
        {/* State Selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {Object.keys(statePrices).map((state, index) => (
            <motion.button
              key={state}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedState(state)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedState === state
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white'
                  : 'bg-stone-50 text-slate-600 hover:bg-slate-700/50 border border-stone-200'
              }`}
            >
              {state.replace(/([A-Z])/g, ' $1').trim()}
            </motion.button>
          ))}
        </div>

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(statePrices).map(([state, data], index) => (
            <motion.div
              key={state}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-2xl border-2 transition cursor-pointer ${
                selectedState === state
                  ? 'border-slate-800 bg-slate-100 backdrop-blur-sm'
                  : 'border-stone-200 bg-white hover:border-slate-800 hover:bg-stone-50'
              }`}
              onClick={() => setSelectedState(state)}
            >
              <div className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {state.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-2xl font-extrabold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent">
                ₹{data.total}
              </div>
              <div className="text-xs text-slate-400 mt-2">
                {data.taxRate} + ₹{data.shipping} shipping
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected State Details */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-6 p-6 bg-gradient-to-r from-stone-100 to-stone-200 rounded-2xl border border-stone-300 backdrop-blur-sm"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-slate-600 mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Selected: {selectedState.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent">
                ₹{currentState.total}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-1">Base Price</div>
              <div className="text-2xl font-bold text-slate-800">
                ₹{currentState.price}
              </div>
              <div className="text-sm text-slate-400 mt-2 flex items-center gap-2 justify-end">
                <AlertCircle className="w-4 h-4" />
                {currentState.taxRate}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
