import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Click {
  timestamp: number;
  referrer: string;
  userAgent: string;
}

interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: number;
  expiryTime: number;
  clicks: Click[];
}

interface URLContextType {
  urls: ShortenedURL[];
  createShortUrl: (originalUrl: string, customCode?: string, expiryMinutes?: number) => Promise<string>;
  deleteUrl: (id: string) => void;
  addClick: (id: string, click: Click) => void;
  getAnalytics: () => {
    totalUrls: number;
    totalClicks: number;
    activeUrls: number;
    avgClicksPerUrl: number;
  };
}

const URLContext = createContext<URLContextType | undefined>(undefined);

export const useURLContext = () => {
  const context = useContext(URLContext);
  if (!context) {
    throw new Error('useURLContext must be used within a URLProvider');
  }
  return context;
};

interface URLProviderProps {
  children: ReactNode;
}

export const URLProvider: React.FC<URLProviderProps> = ({ children }) => {
  const [urls, setUrls] = useState<ShortenedURL[]>([]);

  useEffect(() => {
    const savedUrls = localStorage.getItem('shortenedUrls');
    if (savedUrls) {
      setUrls(JSON.parse(savedUrls));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
  }, [urls]);

  const generateShortCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const createShortUrl = async (
    originalUrl: string,
    customCode?: string,
    expiryMinutes: number = 30
  ): Promise<string> => {
    const shortCode = customCode || generateShortCode();
    
    // Check if custom code already exists
    if (urls.some(url => url.shortCode === shortCode)) {
      throw new Error('Custom code already exists');
    }

    const newUrl: ShortenedURL = {
      id: uuidv4(),
      originalUrl,
      shortCode,
      createdAt: Date.now(),
      expiryTime: Date.now() + (expiryMinutes * 60 * 1000),
      clicks: []
    };

    setUrls(prev => [newUrl, ...prev]);
    return `${window.location.origin}/s/${shortCode}`;
  };

  const deleteUrl = (id: string) => {
    setUrls(prev => prev.filter(url => url.id !== id));
  };

  const addClick = (id: string, click: Click) => {
    setUrls(prev => prev.map(url => 
      url.id === id 
        ? { ...url, clicks: [...url.clicks, click] }
        : url
    ));
  };

  const getAnalytics = () => {
    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, url) => sum + url.clicks.length, 0);
    const activeUrls = urls.filter(url => Date.now() < url.expiryTime).length;
    const avgClicksPerUrl = totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0;

    return {
      totalUrls,
      totalClicks,
      activeUrls,
      avgClicksPerUrl
    };
  };

  return (
    <URLContext.Provider value={{
      urls,
      createShortUrl,
      deleteUrl,
      addClick,
      getAnalytics
    }}>
      {children}
    </URLContext.Provider>
  );
};