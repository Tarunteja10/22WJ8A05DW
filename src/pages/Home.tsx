import React from 'react';
import { motion } from 'framer-motion';
import URLShortener from '../components/URLShortener';
import URLList from '../components/URLList';
import StatsOverview from '../components/StatsOverview';

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-5xl font-bold text-white mb-4">
          Shorten Your Links
          <span className="block text-3xl font-normal text-gray-300 mt-2">
            Create powerful, trackable short links
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Transform long, complex URLs into clean, professional links with advanced analytics and customization options.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <URLShortener />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StatsOverview />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <URLList />
      </motion.div>
    </div>
  );
};

export default Home;