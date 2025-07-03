import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, ExternalLink } from 'lucide-react';
import { useURLContext } from '../context/URLContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Analytics: React.FC = () => {
  const { urls, getAnalytics } = useURLContext();
  const analytics = getAnalytics();

  const clicksOverTime = urls.reduce((acc, url) => {
    url.clicks.forEach(click => {
      const date = new Date(click.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(clicksOverTime).map(([date, clicks]) => ({
    date,
    clicks
  }));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4">Analytics Dashboard</h2>
        <p className="text-xl text-gray-400">Track your link performance and engagement</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{analytics.totalUrls}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Total Links</h3>
          <p className="text-gray-400 text-sm">Created links</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{analytics.totalClicks}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Total Clicks</h3>
          <p className="text-gray-400 text-sm">All time clicks</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{analytics.avgClicksPerUrl}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Avg. Clicks</h3>
          <p className="text-gray-400 text-sm">Per link</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <ExternalLink className="h-8 w-8 text-orange-400" />
            <span className="text-2xl font-bold text-white">{analytics.activeUrls}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Active Links</h3>
          <p className="text-gray-400 text-sm">Not expired</p>
        </motion.div>
      </div>

      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6">Clicks Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="date" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-6">Link Performance</h3>
        <div className="space-y-4">
          {urls.slice(0, 5).map((url) => (
            <div key={url.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex-1">
                <h4 className="text-white font-medium truncate">{url.shortCode}</h4>
                <p className="text-gray-400 text-sm truncate">{url.originalUrl}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{url.clicks.length}</p>
                <p className="text-gray-400 text-sm">clicks</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;