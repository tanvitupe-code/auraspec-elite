import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, TrendingUp, PieChart, Clock, Download, ArrowUp, Activity, Heart, Star, Search as SearchIcon } from 'lucide-react';

/**
 * Analytics Dashboard Component
 * Visual dashboard with charts and statistical panels tracking system metrics
 */
export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  // Mock analytics data
  const [metrics, setMetrics] = useState({
    activeUsers: 0,
    searchQueries: 0,
    topCompared: [],
    categoryDistribution: {},
    sentimentBreakdown: {},
    userGrowth: [],
    engagementRate: 0
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMetrics({
        activeUsers: 1247,
        searchQueries: 8543,
        topCompared: [
          { name: 'iPhone 16 Pro Max', comparisons: 342, trend: '+12%' },
          { name: 'Samsung Galaxy S25 Ultra', comparisons: 298, trend: '+8%' },
          { name: 'Tesla Model 3', comparisons: 245, trend: '+15%' },
          { name: 'BMW i5', comparisons: 187, trend: '+5%' },
          { name: 'Google Pixel 9 Pro', comparisons: 156, trend: '+22%' }
        ],
        categoryDistribution: {
          'Mobile': 45,
          'Auto': 35,
          'Electronics': 20
        },
        sentimentBreakdown: {
          'Positive': 65,
          'Neutral': 25,
          'Negative': 10
        },
        userGrowth: [
          { date: 'Mon', users: 120 },
          { date: 'Tue', users: 145 },
          { date: 'Wed', users: 132 },
          { date: 'Thu', users: 167 },
          { date: 'Fri', users: 189 },
          { date: 'Sat', users: 234 },
          { date: 'Sun', users: 198 }
        ],
        engagementRate: 72
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-serif tracking-tight font-medium text-orange-700">
          Analytics Dashboard
        </h1>
        <div className="flex gap-2">
          <motion.select
            whileHover={{ scale: 1.02 }}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-orange-50 border border-orange-100/70 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-700/50"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </motion.select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:shadow-lg hover:shadow-orange-900/10 transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Report
          </motion.button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Users', value: metrics.activeUsers.toLocaleString(), trend: '+12%', color: 'from-orange-600 to-orange-800', icon: Users },
          { label: 'Search Queries', value: metrics.searchQueries.toLocaleString(), trend: '+8%', color: 'from-orange-500 to-orange-700', icon: SearchIcon },
          { label: 'Comparisons Made', value: '1,234', trend: '+15%', color: 'from-orange-400 to-orange-600', icon: BarChart3 },
          { label: 'Engagement Rate', value: `${metrics.engagementRate}%`, trend: '+5%', color: 'from-orange-700 to-orange-900', icon: Activity }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-gradient-to-br ${metric.color} rounded-2xl p-6 text-white shadow-2xl hover:shadow-lg transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <metric.icon className="w-5 h-5" />
              </div>
              <ArrowUp className="w-4 h-4" />
            </div>
            <div className="text-sm opacity-80 mb-1">{metric.label}</div>
            <div className="text-4xl font-extrabold">{metric.value}</div>
            <div className="text-sm mt-2 opacity-80 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {metric.trend} from last period
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 hover:shadow-md rounded-2xl p-6"
        >
          <h3 className={`text-xl font-serif tracking-wide font-light antialiased capitalize text-orange-700 mb-6 flex items-center gap-2`}>
            <TrendingUp className="w-6 h-6" />
            User Growth
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {metrics.userGrowth.map((data, index) => {
              const maxValue = Math.max(...metrics.userGrowth.map(d => d.users));
              const height = (data.users / maxValue) * 100;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 flex flex-col items-center"
                >
                  <div 
                    className="w-full bg-gradient-to-t from-[#E2A182] to-[#D4956E] rounded-t transition-all duration-300 shadow-sm"
                    style={{ height: `${height}%` }}
                  >
                    <div className="text-xs text-white text-center mt-1 font-semibold">{data.users}</div>
                  </div>
                  <div className="text-xs text-slate-600 mt-2">{data.date}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 hover:shadow-md rounded-2xl p-6"
        >
          <h3 className="text-xl font-serif tracking-tight font-medium text-orange-700 mb-6 flex items-center gap-2">
            <PieChart className="w-6 h-6" />
            Category Distribution
          </h3>
          <div className="space-y-4">
            {Object.entries(metrics.categoryDistribution).map(([category, percentage], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-medium">{category}</span>
                  <span className="text-slate-600">{percentage}%</span>
                </div>
                <div className="w-full bg-orange-50 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className="bg-gradient-to-r from-[#E2A182] to-[#D4956E] h-3 rounded-full shadow-lg shadow-orange-900/10"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 hover:shadow-md rounded-2xl p-6"
        >
          <h3 className={`text-xl font-serif tracking-wide font-light antialiased capitalize text-orange-700 mb-6 flex items-center gap-2`}>
            <PieChart className="w-6 h-6" />
            Sentiment Analysis
          </h3>
          <div className="flex items-center justify-center gap-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#fed7aa" strokeWidth="20" />
                {/* Positive segment */}
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" 
                  stroke="#ea580c" 
                  strokeWidth="20"
                  strokeDasharray={`${metrics.sentimentBreakdown.Positive * 2.51} 251`}
                  transform="rotate(-90 50 50)"
                />
                {/* Neutral segment */}
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" 
                  stroke="#fb923c" 
                  strokeWidth="20"
                  strokeDasharray={`${metrics.sentimentBreakdown.Neutral * 2.51} 251`}
                  strokeDashoffset={`-${metrics.sentimentBreakdown.Positive * 2.51}`}
                  transform="rotate(-90 50 50)"
                />
                {/* Negative segment */}
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" 
                  stroke="#fdba74" 
                  strokeWidth="20"
                  strokeDasharray={`${metrics.sentimentBreakdown.Negative * 2.51} 251`}
                  strokeDashoffset={`-${(metrics.sentimentBreakdown.Positive + metrics.sentimentBreakdown.Neutral) * 2.51}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#E2A182]">65%</div>
                  <div className="text-xs text-slate-600">Positive</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E2A182]"></div>
                <span className="text-sm text-slate-600">Positive: {metrics.sentimentBreakdown.Positive}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D4956E]"></div>
                <span className="text-sm text-slate-600">Neutral: {metrics.sentimentBreakdown.Neutral}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#C4855A]"></div>
                <span className="text-sm text-slate-600">Negative: {metrics.sentimentBreakdown.Negative}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Compared Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 hover:shadow-md rounded-2xl p-6"
        >
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Top Compared Items
          </h3>
          <div className="space-y-3">
            {metrics.topCompared.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 bg-[#E2A182] rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 font-serif tracking-wide font-light antialiased capitalize">{item.name}</div>
                    <div className="text-sm text-slate-600 font-serif tracking-wide font-light antialiased capitalize">{item.comparisons} comparisons</div>
                  </div>
                </div>
                <div className="text-[#E2A182] font-semibold text-sm flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  {item.trend}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white border border-stone-200 shadow-sm hover:shadow-md rounded-2xl p-6"
      >
        <h3 className="text-xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { action: 'New user registered', user: 'john@example.com', time: '2 minutes ago', type: 'user', icon: Users, color: 'from-slate-700 to-slate-800' },
            { action: 'Product comparison completed', user: 'jane@example.com', time: '5 minutes ago', type: 'comparison', icon: BarChart3, color: 'from-slate-700 to-slate-800' },
            { action: 'Review submitted', user: 'bob@example.com', time: '8 minutes ago', type: 'review', icon: Star, color: 'from-slate-700 to-slate-800' },
            { action: 'Search query: "best phone under 30000"', user: 'anonymous', time: '12 minutes ago', type: 'search', icon: SearchIcon, color: 'from-slate-700 to-slate-800' },
            { action: 'Wishlist item added', user: 'alice@example.com', time: '15 minutes ago', type: 'wishlist', icon: Heart, color: 'from-slate-700 to-slate-800' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100"
            >
              <div className={`p-3 bg-gradient-to-r ${activity.color} rounded-xl`}>
                <activity.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-800">{activity.action}</div>
                <div className="text-sm text-slate-600">{activity.user}</div>
              </div>
              <div className="text-sm text-slate-600 flex items-center gap-1">
                <Clock className="w-3 h-3 text-orange-700" />
                {activity.time}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
