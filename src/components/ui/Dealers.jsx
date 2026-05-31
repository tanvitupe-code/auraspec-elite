import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Shield, Phone, Mail, Clock } from 'lucide-react';

export default function Dealers() {
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
      hours: "10:00 AM - 8:00 PM",
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
      hours: "9:00 AM - 9:00 PM",
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
      hours: "10:00 AM - 7:00 PM",
      status: "Open"
    },
    {
      id: 4,
      name: "Luxury Auto Chennai",
      location: "T. Nagar, Chennai",
      rating: 4.9,
      reviews: 1089,
      specialties: ["Luxury Cars", "Sports Cars"],
      verified: true,
      phone: "+91 44 2345 6789",
      email: "chennai@luxuryauto.com",
      hours: "9:30 AM - 7:30 PM",
      status: "Open"
    },
    {
      id: 5,
      name: "Gadget World Hyderabad",
      location: "Banjara Hills, Hyderabad",
      rating: 4.6,
      reviews: 543,
      specialties: ["Smartphones", "Tablets", "Wearables"],
      verified: true,
      phone: "+91 40 6789 0123",
      email: "hyderabad@gadgetworld.com",
      hours: "10:00 AM - 8:30 PM",
      status: "Open"
    },
    {
      id: 6,
      name: "Prestige Motors Pune",
      location: "Koregaon Park, Pune",
      rating: 4.8,
      reviews: 765,
      specialties: ["Electric Vehicles", "Hybrid Cars"],
      verified: true,
      phone: "+91 20 3456 7890",
      email: "pune@prestigemotors.com",
      hours: "9:00 AM - 8:00 PM",
      status: "Open"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedDealers.map((dealer, index) => (
          <motion.div
            key={dealer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white/95 border border-orange-100/70 shadow-lg shadow-orange-900/10 rounded-2xl p-6 hover:shadow-xl hover:shadow-orange-900/15 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-serif tracking-wide font-light antialiased capitalize text-slate-800 text-lg">
                    {dealer.name}
                  </h4>
                  {dealer.verified && (
                    <Shield className="w-5 h-5 text-orange-700" />
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-orange-700" />
                  <p className="text-sm text-slate-600">{dealer.location}</p>
                </div>
                {dealer.status === 'Open' && (
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Open Now
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-orange-100">
              <div className="flex items-center gap-1">
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
              </div>
              <span className="text-sm font-semibold text-slate-800">
                {dealer.rating}
              </span>
              <span className="text-xs text-slate-500">({dealer.reviews} reviews)</span>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-4">
              {dealer.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-orange-50 border border-orange-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Phone className="w-4 h-4 text-orange-700" />
                <span className="text-sm text-slate-800 font-medium">{dealer.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Mail className="w-4 h-4 text-orange-700" />
                <span className="text-sm text-slate-800 font-medium">{dealer.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Clock className="w-4 h-4 text-orange-700" />
                <span className="text-sm text-slate-800 font-medium">{dealer.hours}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
