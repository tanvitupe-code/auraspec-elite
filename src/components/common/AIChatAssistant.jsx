import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap } from 'lucide-react';

/**
 * AI Chat Assistant Component
 * Floating drawer/bubble for AI-powered product recommendations and queries
 */
export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: 'Welcome to AuraSpec Elite. I am your dedicated luxury product intelligence assistant, ready to guide you through our curated collection of premium vehicles and smartphones.' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateAIResponse(userMessage.text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Product recommendations
    if (lowerQuery.includes('best phone') || lowerQuery.includes('best mobile')) {
      const priceMatch = lowerQuery.match(/under\s*₹?\s*(\d+)/);
      const price = priceMatch ? parseInt(priceMatch[1]) : null;
      
      if (price && price <= 30000) {
        return {
          id: Date.now(),
          type: 'bot',
          text: `Based on your budget of ₹${price.toLocaleString()}, I recommend:\n\n📱 **Realme GT Neo 3T** - ₹28,999\n• 120Hz AMOLED display\n• Snapdragon 870 processor\n• 50MP camera system\n\n📱 **Poco F4 5G** - ₹27,999\n• Snapdragon 870 processor\n• 64MP main camera\n• 4500mAh battery\n\n📱 **Samsung Galaxy M33 5G** - ₹26,999\n• Exynos 1280 processor\n• 50MP triple camera\n• 6000mAh battery\n\nWould you like a detailed comparison?`,
          isStructured: true
        };
      }
      
      return {
        id: Date.now(),
        type: 'bot',
        text: `For the best phones, I recommend:\n\n📱 **iPhone 16 Pro Max** - ₹1,59,900\n• A18 Pro chip\n• 48MP camera system\n• All-day battery life\n\n📱 **Samsung Galaxy S25 Ultra** - ₹1,34,999\n• Snapdragon 8 Gen 4\n• 200MP camera\n• S Pen included\n\n📱 **Google Pixel 9 Pro** - ₹1,06,999\n• Tensor G4 chip\n• AI-powered photography\n• Clean Android experience\n\nWhat's your budget range?`,
        isStructured: true
      };
    }

    // Car recommendations
    if (lowerQuery.includes('best car') || lowerQuery.includes('best vehicle') || lowerQuery.includes('ev')) {
      return {
        id: Date.now(),
        type: 'bot',
        text: `For the best cars, I recommend:\n\n🚗 **Tesla Model 3** - ₹38,99,000\n• 300+ miles range\n• Autopilot included\n• 0-60 in 3.1s\n\n🚗 **Hyundai Ioniq 6** - ₹42,45,000\n• 361 miles range\n• Aerodynamic design\n• Premium interior\n\n🚗 **BMW i5** - ₹66,50,000\n• Luxury EV sedan\n• 300 miles range\n• Advanced driver assistance\n\nWhat type of vehicle are you looking for?`,
        isStructured: true
      };
    }

    // Comparison queries
    if (lowerQuery.includes('compare') || lowerQuery.includes('vs') || lowerQuery.includes('difference')) {
      return {
        id: Date.now(),
        type: 'bot',
        text: `I can help you compare products! Here's a quick comparison:\n\n**iPhone 16 Pro Max vs Samsung Galaxy S25 Ultra**\n\n| Feature | iPhone | Samsung |\n|---------|--------|---------|\n| Display | 6.7\" OLED | 6.8\" QHD+ |\n| Processor | A18 Pro | Snapdragon 8 Gen 4 |\n| Camera | 48MP | 200MP |\n| Battery | 4422mAh | 5000mAh |\n| Price | ₹1,59,900 | ₹1,34,999 |\n\nSamsung offers better value with higher specs, while iPhone provides better ecosystem integration. Which aspect matters most to you?`,
        isStructured: true
      };
    }

    // EMI queries
    if (lowerQuery.includes('emi') || lowerQuery.includes('loan') || lowerQuery.includes('finance')) {
      return {
        id: Date.now(),
        type: 'bot',
        text: `I can help you calculate EMI! Here's an example:\n\n**iPhone 16 Pro Max EMI Calculation**\n• Price: ₹1,59,900\n• Down Payment: ₹30,000\n• Interest Rate: 12%\n• Duration: 12 months\n\n**Monthly EMI: ₹11,847**\n• Total Interest: ₹13,164\n• Total Amount: ₹1,43,064\n\nUse our EMI Calculator tool in the Finance section for personalized calculations!`,
        isStructured: true
      };
    }

    // General queries
    if (lowerQuery.includes('help') || lowerQuery.includes('what can you do')) {
      return {
        id: Date.now(),
        type: 'bot',
        text: `I can help you with:\n\n🔍 **Product Recommendations** - Best phones, cars, electronics\n📊 **Comparisons** - Compare features and prices\n💰 **EMI Calculator** - Calculate loan payments\n📰 **Latest News** - Recent launches and updates\n🏪 **Dealer Locator** - Find nearby stores\n⭐ **Reviews** - Analyze product reviews\n\nJust ask me anything! Try "Best phone under ₹30000" or "Compare iPhone vs Samsung"`,
        isStructured: true
      };
    }

    // Default response
    return {
      id: Date.now(),
      type: 'bot',
      text: `I understand you're asking about "${query}". Let me help you with that!\n\nBased on our product database, I can provide recommendations, comparisons, and detailed analysis. Could you provide more details about:\n\n• Your budget range?\n• Specific features you're looking for?\n• Any brands you prefer?\n\nI'll give you a personalized recommendation!`,
      isStructured: true
    };
  };

  const formatMessage = (message) => {
    if (!message.isStructured) {
      return <p className="whitespace-pre-wrap">{message.text}</p>;
    }

    // Format structured messages with markdown-like syntax
    const lines = message.text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('###')) {
        return <h3 key={index} className="font-bold text-lg mt-4 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold mt-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('|')) {
        return null; // Skip table lines for now
      }
      if (line.startsWith('•') || line.startsWith('-')) {
        return <li key={index} className="ml-4">{line.replace(/^[•-]\s*/, '')}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-1">{line}</p>;
    });
  };

  return (
    <>
      {/* Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-orange-700 to-orange-900 rounded-full shadow-2xl shadow-orange-900/25 flex items-center justify-center text-white z-50 border border-orange-200"
          >
            <MessageCircle className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-orange-900/20 flex flex-col z-50 border border-orange-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-700 to-orange-900 p-4 rounded-t-2xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">● ONLINE</span>
                    </div>
                    <h3 className="font-serif bg-gradient-to-r from-orange-800 via-amber-900 to-stone-900 bg-clip-text text-transparent font-medium">
                      AuraSpec AI
                    </h3>
                    <p className="text-xs text-white/90 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Luxury Product Intelligence
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition p-1"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-orange-700 to-orange-900 text-white rounded-br-none shadow-lg shadow-orange-900/20'
                      : 'bg-orange-50 text-slate-800 rounded-bl-none border border-orange-200'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-1">
                    {message.type === 'bot' && <Bot className="w-4 h-4 text-orange-700" />}
                    {message.type === 'user' && <User className="w-4 h-4 text-orange-900" />}
                  </div>
                  {formatMessage(message)}
                </div>
              </motion.div>
            ))}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start"
                >
                  <div className="bg-orange-50 p-4 rounded-2xl rounded-bl-none border border-orange-200">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-orange-700" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-orange-700 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-orange-700 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-orange-700 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!inputValue.trim()}
                className="px-4 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
              <Zap className="w-3 h-3" />
              Try: "Best phone under ₹30000" or "Compare iPhone vs Samsung"
            </div>
          </form>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
