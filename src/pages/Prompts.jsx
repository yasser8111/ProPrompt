import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, Clock } from 'lucide-react';
import prompts from '../data/prompts.json';
import PromptCard from '../components/PromptCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Prompts = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Trending');

  const categories = ['All', 'Image', 'Coding', 'Text', 'Productivity'];

  const filteredPrompts = useMemo(() => {
    return prompts
      .filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'Trending') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
        if (sortBy === 'New') return b.id - a.id;
        return 0;
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Page Header */}
      <div className="mb-24 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">
          {t('prompts.title')} <span className="text-blue-600">{t('prompts.titleAccent')}</span>
        </h1>
        <p className="text-gray-500 text-lg font-medium leading-relaxed">
          {t('prompts.subtitle')}
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-2xl shadow-gray-200/40 mb-20 space-y-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Search Input */}
          <div className="relative flex-grow w-full lg:w-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors rtl:left-auto rtl:right-6" />
            <input
              type="text"
              placeholder={t('prompts.searchPlaceholder')}
              className="w-full pl-16 pr-8 py-5 bg-gray-50/50 border border-transparent rounded-[30px] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/30 focus:border-blue-300 transition-all font-medium text-gray-900 rtl:pl-8 rtl:pr-16"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2 space-x-reverse shrink-0 bg-gray-50/80 p-2.5 rounded-[22px] border border-gray-100/50">
            <button 
              onClick={() => setSortBy('Trending')}
              className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-2xl transition-all ${sortBy === 'Trending' ? 'bg-white text-blue-600 shadow-sm font-black text-[10px] uppercase tracking-widest' : 'text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-gray-600'}`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t('prompts.trending')}</span>
            </button>
            <button 
              onClick={() => setSortBy('New')}
              className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-2xl transition-all ${sortBy === 'New' ? 'bg-white text-blue-600 shadow-sm font-black text-[10px] uppercase tracking-widest' : 'text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-gray-600'}`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{t('prompts.newest')}</span>
            </button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-4 pt-10 border-t border-gray-50">
          <Filter className="w-4 h-4 text-gray-300 mr-2 rtl:mr-0 rtl:ml-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 text-[10px] font-black rounded-full transition-all border uppercase tracking-widest ${
                selectedCategory === cat 
                ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20' 
                : 'bg-white text-gray-400 border-gray-100 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              {cat === 'All' ? t('prompts.all') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredPrompts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {filteredPrompts.map(prompt => (
              <motion.div
                layout
                key={prompt.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PromptCard prompt={prompt} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center bg-gray-50/50 rounded-[60px] border border-dashed border-gray-200"
          >
            <div className="w-24 h-24 bg-gray-100/50 rounded-full flex items-center justify-center mx-auto mb-10 border border-gray-100">
               <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">{t('prompts.noResults')}</h3>
            <p className="text-gray-400 max-w-sm mx-auto leading-relaxed font-bold text-sm">
              {t('prompts.noResultsDesc')}
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-12 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:text-blue-700 underline underline-offset-8"
            >
              {t('prompts.clearFilters')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Prompts;
