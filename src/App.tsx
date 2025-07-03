import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import RedirectHandler from './components/RedirectHandler';
import { URLProvider } from './context/URLContext';

function App() {
  return (
    <URLProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40`}></div>
          
          <div className="relative z-10">
            <Header />
            
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-4 py-8"
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/s/:shortCode" element={<RedirectHandler />} />
              </Routes>
            </motion.main>
          </div>
        </div>
      </Router>
    </URLProvider>
  );
}

export default App;