import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, Trash2, Clock, BarChart3 } from 'lucide-react';
import { useURLContext } from '../context/URLContext';

const URLList: React.FC = () => {
  const { urls, deleteUrl } = useURLContext();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (shortUrl: string, id: string) => {
    await navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const isExpired = (expiryTime: number) => {
    return Date.now() > expiryTime;
  };

  if (urls.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <div className="text-gray-400 mb-4">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No links created yet</p>
          <p className="text-sm">Create your first short link above to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Your Links</h3>
        <span className="text-gray-400">{urls.length} link{urls.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="space-y-4">
        {urls.map((url, index) => (
          <motion.div
            key={url.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              isExpired(url.expiryTime)
                ? 'bg-red-500/10 border-red-500/20'
                : 'bg-white/5 border-white/20 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-white font-medium truncate">
                    {window.location.origin}/s/{url.shortCode}
                  </h4>
                  {isExpired(url.expiryTime) && (
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                      Expired
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm truncate mb-2">{url.originalUrl}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Created {formatDate(url.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-3 w-3" />
                    <span>{url.clicks.length} clicks</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => copyToClipboard(`${window.location.origin}/s/${url.shortCode}`, url.id)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors group"
                  title="Copy link"
                >
                  <Copy className={`h-4 w-4 ${copiedId === url.id ? 'text-green-400' : 'text-blue-400'}`} />
                </button>
                
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors group"
                  title="Visit original URL"
                >
                  <ExternalLink className="h-4 w-4 text-green-400" />
                </a>
                
                <button
                  onClick={() => deleteUrl(url.id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors group"
                  title="Delete link"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default URLList;