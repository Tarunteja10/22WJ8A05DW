import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Link, Clock } from 'lucide-react';
import { useURLContext } from '../context/URLContext';

const StatsOverview: React.FC = () => {
  const { urls, getAnalytics } = useURLContext();
  const analytics = getAnalytics();

  const stats = [
    {
      icon: Link,
      label: 'Total Links',
      value: analytics.totalUrls,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: TrendingUp,
      label: 'Total Clicks',
      value: analytics.totalClicks,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: Clock,
      label: 'Active Links',
      value: analytics.activeUrls,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
      
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-white font-semibold">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {urls.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-4 border-t border-white/20"
        >
          <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Activity</h4>
          <div className="space-y-2">
            {urls.slice(0, 3).map((url) => (
              <div key={url.id} className="text-xs text-gray-400 flex justify-between">
                <span className="truncate">{url.shortCode}</span>
                <span>{url.clicks.length} clicks</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StatsOverview;