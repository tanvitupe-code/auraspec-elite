import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, MapPin, Star, Shield, Phone, Mail } from 'lucide-react';

export default function NewsDealers() {
  const newsItems = [
    {
      id: 1,
      title: "Electric Vehicle Sales Surge 45% in Q4 2025",
      summary: "Market analysis shows unprecedented growth in EV adoption across major metropolitan areas.",
      date: "2 hours ago",
      category: "Market Trends"
    },
    {
      id: 2,
      title: "Premium Smartphone Market Reaches New Heights",
      summary: "Flagship devices with advanced AI features driving consumer demand in luxury segment.",
      date: "5 hours ago",
      category: "Technology"
    }
  ];

  const verifiedDealers = [
    {
      id: 1,
      name: "Premium Motors Mumbai",
      location: "Bandra West, Mumbai",
      rating: 4.9,
      reviews: 1247,
      specialties: ["Luxury Cars", "Electric Vehicles"],
      verified: true,
      phone: "+91 22 1234 5678",
      email: "mumbai@premiummotors.com",
      status: "Open"
    },
    {
      id: 2,
      name: "Elite Electronics Delhi",
      location: "Connaught Place, Delhi",
      rating: 4.8,
      reviews: 892,
      specialties: ["Smartphones", "Laptops", "Accessories"],
      verified: true,
      phone: "+91 11 9876 5432",
      email: "delhi@eliteelectronics.com",
      status: "Open"
    },
    {
      id: 3,
      name: "Tech Hub Bangalore",
      location: "Indiranagar, Bangalore",
      rating: 4.7,
      reviews: 654,
      specialties: ["Smartphones", "Gaming", "Audio"],
      verified: true,
      phone: "+91 80 5555 1234",
      email: "bangalore@techhub.com",
      status: "Open"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* News Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-700 rounded-lg">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-xl font-serif tracking-wide font-light antialiased capitalize text-orange-700`}>
            Market News
          </h3>
        </div>

        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-200 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded">
                  {item.category}
                </span>
                <span className="text-xs text-slate-500">{item.date}</span>
              </div>
              <h4 className={`font-serif tracking-wide font-light antialiased capitalize text-slate-800 mb-1`}>{item.title}</h4>
              <p className="text-sm text-slate-600">{item.summary}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Verified Dealers Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-700 rounded-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-xl font-serif tracking-wide font-light antialiased capitalize text-orange-700`}>
            Verified Dealers
          </h3>
        </div>

        <div className="space-y-4">
          {verifiedDealers.map((dealer, index) => (
            <motion.div
              key={dealer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-orange-50 rounded-xl p-4 border border-orange-100 hover:border-orange-200 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-serif tracking-wide font-light antialiased capitalize text-slate-800`}>
                      {dealer.name}
                    </h4>
                    {dealer.verified && (
                      <Shield className="w-4 h-4 text-orange-700" />
                    )}
                    {dealer.status === 'Open' && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        Open
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {dealer.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(dealer.rating)
                        ? 'text-orange-700 fill-current'
                        : 'text-orange-200'
                    }`}
                  />
                ))}
                <span className="text-sm font-semibold text-slate-800 ml-1">
                  {dealer.rating}
                </span>
                <span className="text-xs text-slate-500">({dealer.reviews} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {dealer.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white border border-orange-200 text-slate-600 px-2 py-1 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-orange-700" />
                  {dealer.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-orange-700" />
                  {dealer.email}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
