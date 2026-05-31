import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Percent } from 'lucide-react';

export default function EMICalculator({ productPrice = 1000000 }) {
  const [principal, setPrincipal] = useState(productPrice);
  const [downPayment, setDownPayment] = useState(productPrice * 0.2);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(60);
  const [emi, setEMI] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const loanAmount = principal - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const calculatedEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const calculatedTotal = calculatedEMI * tenure;
    const calculatedInterest = calculatedTotal - loanAmount;

    setEMI(calculatedEMI);
    setTotalAmount(calculatedTotal);
    setTotalInterest(calculatedInterest);
  }, [principal, downPayment, interestRate, tenure]);

  return (
    <div className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-700 rounded-lg">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h3 className={`text-xl font-serif tracking-wide font-light antialiased capitalize text-orange-700`}>
          EMI Calculator
        </h3>
      </div>

      {/* Product Price Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-orange-700 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Product Price
          </label>
          <span className="text-sm font-bold text-slate-800">₹{principal.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="100000"
          max="50000000"
          step="100000"
          value={principal}
          onChange={(e) => setPrincipal(parseInt(e.target.value))}
          className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-700"
        />
      </div>

      {/* Down Payment Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-orange-700">Down Payment</label>
          <span className="text-sm font-bold text-slate-800">₹{downPayment.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={principal * 0.1}
          max={principal * 0.5}
          step="10000"
          value={downPayment}
          onChange={(e) => setDownPayment(parseInt(e.target.value))}
          className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-700"
        />
      </div>

      {/* Interest Rate Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-orange-700 flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Interest Rate
          </label>
          <span className="text-sm font-bold text-slate-800">{interestRate}% p.a.</span>
        </div>
        <input
          type="range"
          min="5"
          max="15"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-700"
        />
      </div>

      {/* Tenure Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-orange-700">Loan Tenure</label>
          <span className="text-sm font-bold text-slate-800">{tenure} months ({Math.floor(tenure / 12)} years)</span>
        </div>
        <input
          type="range"
          min="12"
          max="84"
          step="12"
          value={tenure}
          onChange={(e) => setTenure(parseInt(e.target.value))}
          className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-700"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-orange-100">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100"
        >
          <div className="text-xs text-orange-700 mb-1">Monthly EMI</div>
          <div className="text-2xl font-extrabold text-orange-700">
            ₹{Math.round(emi).toLocaleString()}
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100"
        >
          <div className="text-xs text-orange-700 mb-1">Total Interest</div>
          <div className="text-2xl font-extrabold text-slate-800">
            ₹{Math.round(totalInterest).toLocaleString()}
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100"
        >
          <div className="text-xs text-orange-700 mb-1">Total Amount</div>
          <div className="text-2xl font-extrabold text-slate-800">
            ₹{Math.round(totalAmount).toLocaleString()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
