import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Users, Flag, ToggleLeft, ToggleRight, Plus, MoreVertical, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Admin Dashboard Component
 * Management view for products, users, and review moderation
 */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [flaggedReviews, setFlaggedReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'iPhone 16 Pro Max', category: 'Mobile', price: 1199, stock: 45, isActive: true },
        { id: 2, name: 'Samsung Galaxy S25 Ultra', category: 'Mobile', price: 1299, stock: 32, isActive: true },
        { id: 3, name: 'Tesla Model 3', category: 'Auto', price: 38990, stock: 12, isActive: true },
        { id: 4, name: 'BMW i5', category: 'Auto', price: 66500, stock: 8, isActive: false },
      ]);
      
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', isActive: true, joinedDate: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', isActive: true, joinedDate: '2024-02-20' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', isActive: false, joinedDate: '2024-03-10' },
      ]);
      
      setFlaggedReviews([
        { id: 1, user: 'Anonymous', product: 'iPhone 16 Pro Max', rating: 1, comment: 'Terrible product!', flagReason: 'Inappropriate language', date: '2024-05-28' },
        { id: 2, user: 'User123', product: 'Samsung Galaxy S25', rating: 2, comment: 'Not worth the money', flagReason: 'Spam content', date: '2024-05-29' },
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleProductToggle = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const handleUserToggle = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    ));
  };

  const handleReviewAction = (reviewId, action) => {
    setFlaggedReviews(flaggedReviews.filter(r => r.id !== reviewId));
  };

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
        <h1 className={`text-3xl font-serif tracking-wide font-light antialiased capitalize text-orange-700`}>
          Admin Dashboard
        </h1>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:shadow-lg hover:shadow-orange-900/10 transition"
          >
            Export Data
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition"
          >
            System Health
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: products.length, trend: '+2 this week', color: 'from-slate-700 to-slate-800', icon: Package },
          { label: 'Active Users', value: users.filter(u => u.isActive).length, trend: '+5% from last month', color: 'from-blue-600 to-purple-600', icon: Users },
          { label: 'Flagged Reviews', value: flaggedReviews.length, trend: 'Requires attention', color: 'from-slate-700 to-slate-800', icon: Flag },
          { label: 'System Status', value: 'Online', trend: '99.9% uptime', color: 'from-slate-700 to-slate-800', icon: CheckCircle }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/95 border border-orange-100/70 shadow-sm shadow-orange-900/5 hover:shadow-md rounded-2xl p-6 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs text-slate-500 mt-1">{stat.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white border border-stone-200 shadow-sm rounded-2xl">
        <div className="border-b border-stone-200">
          <nav className="flex space-x-2 px-6">
            {[
              { id: 'products', label: 'Products', icon: Package },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'reviews', label: 'Reviews', icon: Flag }
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-4 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-slate-800 text-slate-800'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Product Management</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:shadow-lg hover:shadow-lg transition text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </motion.button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700/50">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-stone-200">
                    {products.map((product, index) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(248, 250, 252, 1)' }}
                        className="transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${product.price.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{product.stock}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.isActive ? 'bg-green-600/20 text-green-400 border border-green-500/30' : 'bg-red-600/20 text-red-400 border border-red-500/30'
                          }`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleProductToggle(product.id)}
                            className={`text-slate-800 hover:text-slate-600 mr-3 ${!product.isActive ? 'text-green-600' : ''}`}
                          >
                            {product.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">User Management</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:shadow-lg hover:shadow-lg transition text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </motion.button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700/50">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-stone-200">
                    {users.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(248, 250, 252, 1)' }}
                        className="transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'Admin' ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-orange-50 text-orange-600 border border-orange-100'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.joinedDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isActive ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUserToggle(user.id)}
                            className={`text-slate-800 hover:text-orange-700 mr-3 ${!user.isActive ? 'text-green-600' : ''}`}
                          >
                            {user.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Review Moderation</h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {flaggedReviews.length} Flagged
                  </span>
                </div>
              </div>
              {flaggedReviews.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <p className="text-slate-600">No flagged reviews to moderate</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {flaggedReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-stone-50 backdrop-blur-sm rounded-2xl p-6 border border-stone-200"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-slate-800 mb-1">{review.product}</div>
                          <div className="text-sm text-slate-600">By {review.user} • {review.date}</div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {'★'.repeat(review.rating)}
                        </div>
                      </div>
                      <p className="text-slate-600 mb-4">{review.comment}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Flagged: {review.flagReason}
                        </span>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReviewAction(review.id, 'approve')}
                            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition text-sm"
                          >
                            Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReviewAction(review.id, 'reject')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                          >
                            Reject
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
