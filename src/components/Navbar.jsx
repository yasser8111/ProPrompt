import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Search, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { lang, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.explore'), path: '/prompts' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse group gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pro<span className="text-blue-600">Prompt</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-all px-2 py-1 rounded-lg ${
                  isActive(link.path) ? 'text-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <button 
              onClick={toggleLanguage}
              className="text-xs font-black uppercase tracking-wider text-gray-400 hover:text-blue-600 transition-colors px-2 py-1"
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>

            <div className="h-4 w-px mx-8 bg-gray-200" />

            <button className="px-6 py-2.5 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:translate-y-0.5 transition-all">
              {t('nav.signIn')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4 space-x-reverse">
            <button onClick={toggleLanguage} className="text-xs font-black uppercase text-gray-400 px-3 py-2">
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-xl text-base font-bold ${
                  isActive(link.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="w-full mt-4 bg-blue-600 text-white px-3 py-4 rounded-2xl font-black uppercase tracking-widest shadow-md transition-transform">
              {t('nav.signIn')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
