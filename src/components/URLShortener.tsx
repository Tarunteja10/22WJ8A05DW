import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Copy, Check, Settings } from 'lucide-react';
import { useURLContext } from '../context/URLContext';

const URLShortener: React.FC = () => {
  const { createShortUrl } = useURLContext();
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState(30);
  const [lastCreated, setLastCreated] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    setIsLoading(true);
    try {
      const shortUrl = await createShortUrl(originalUrl, customCode, expiryMinutes);
      setLastCreated(shortUrl);
      setOriginalUrl('');
      setCustomCode('');
      setCopied(false);
    } catch (error) {
      console.error('Error creating short URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (lastCreated) {
      await navigator.clipboard.writeText(lastCreated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-500/20 p-2 rounded-lg">
          <Link className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Create Short Link</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Original URL
          </label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Advanced Options</span>
          </button>
        </div>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Custom Code (optional)
                </label>
                <input
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="custom-code"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expiry (minutes)
                </label>
                <input
                  type="number"
                  value={expiryMinutes}
                  onChange={(e) => setExpiryMinutes(parseInt(e.target.value))}
                  min="1"
                  max="43200"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={!originalUrl.trim() || !isValidUrl(originalUrl) || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating...' : 'Shorten URL'}
        </motion.button>
      </form>

      {lastCreated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-green-400 mb-1">Your short link:</p>
              <p className="text-white font-medium break-all">{lastCreated}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="ml-4 p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-green-400" />
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default URLShortener;