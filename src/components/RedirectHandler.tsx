import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { useURLContext } from '../context/URLContext';

const RedirectHandler: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const { urls, addClick } = useURLContext();

  useEffect(() => {
    if (shortCode) {
      const url = urls.find(u => u.shortCode === shortCode);
      
      if (url) {
        if (Date.now() > url.expiryTime) {
          return; // Don't redirect if expired
        }

        // Add click tracking
        addClick(url.id, {
          timestamp: Date.now(),
          referrer: document.referrer || 'direct',
          userAgent: navigator.userAgent
        });

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = url.originalUrl;
        }, 1000);
      }
    }
  }, [shortCode, urls, addClick]);

  const url = urls.find(u => u.shortCode === shortCode);

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center max-w-md"
        >
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Link Not Found</h2>
          <p className="text-gray-400 mb-4">
            The short link you're looking for doesn't exist or has been deleted.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Go Home
          </a>
        </motion.div>
      </div>
    );
  }

  if (Date.now() > url.expiryTime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center max-w-md"
        >
          <AlertCircle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Link Expired</h2>
          <p className="text-gray-400 mb-4">
            This short link has expired and is no longer available.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Go Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <ExternalLink className="h-16 w-16 text-blue-400 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Redirecting...</h2>
        <p className="text-gray-400 mb-4">
          You're being redirected to your destination.
        </p>
        <div className="text-sm text-gray-500 break-all">
          {url.originalUrl}
        </div>
      </motion.div>
    </div>
  );
};

export default RedirectHandler;