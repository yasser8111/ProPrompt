import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, Clock, Grid, List as ListIcon } from 'lucide-react';
import prompts from '../data/prompts.json';
import PromptCard from '../components/PromptCard';
import { motion, AnimatePresence } from 'framer-motion';

const Prompts = () => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight uppercase">Explore <span className="text-blue-600">The Library</span></h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Filter through our comprehensive collection of AI prompts. Found something you like? Give it a try.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-xl shadow-blue-50/20 mb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Search Input */}
          <div className="relative flex-grow w-full lg:w-auto overflow-hidden">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            <input
              type="text"
              placeholder="Search prompts by title, content or tags..."
              className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-[25px] focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all text-sm font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2 shrink-0 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            <button 
              onClick={() => setSortBy('Trending')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all ${sortBy === 'Trending' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-gray-500 font-semibold'}`}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Trending</span>
            </button>
            <button 
              onClick={() => setSortBy('New')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all ${sortBy === 'New' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-gray-500 font-semibold'}`}
            >
              <Clock className="w-4 h-4" />
              <span className="text-xs">Newest</span>
            </button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-gray-50">
          <Filter className="w-4 h-4 text-gray-400 mr-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all border uppercase tracking-widest ${
                selectedCategory === cat 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                : 'bg-white text-gray-600 border-gray-100 hover:border-blue-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredPrompts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredPrompts.map(prompt => (
              <motion.div
                layout
                key={prompt.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <PromptCard prompt={prompt} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center bg-gray-50 rounded-[50px] border border-dashed border-gray-200"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">No results found</h3>
            <p className="text-gray-400 max-w-xs mx-auto leading-relaxed font-medium">
              We couldn't find any prompts matching your current filters. Try searching for something else.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-8 text-blue-600 font-bold underline underline-offset-4"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Prompts;
