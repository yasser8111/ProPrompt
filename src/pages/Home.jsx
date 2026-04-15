import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Image as ImageIcon, Code, FileText, Zap, Star } from 'lucide-react';
import prompts from '../data/prompts.json';
import PromptCard from '../components/PromptCard';

const Home = () => {
  const featuredPrompts = prompts.filter(p => p.isFeatured).slice(0, 3);
  const categories = [
    { title: 'Image Generation', icon: ImageIcon, color: 'bg-indigo-50 text-indigo-600 border-indigo-100', count: '120+' },
    { title: 'Writing & Content', icon: FileText, color: 'bg-amber-50 text-amber-600 border-amber-100', count: '80+' },
    { title: 'Software Coding', icon: Code, color: 'bg-emerald-50 text-emerald-600 border-emerald-100', count: '50+' },
    { title: 'Productivity', icon: Zap, color: 'bg-rose-50 text-rose-600 border-rose-100', count: '40+' },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100 mb-8 animate-bounce">
              <Star className="w-4 h-4 mr-2 text-amber-400 fill-amber-400" />
              New Prompts Daily
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Discover Powerful <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">AI Prompts</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed font-medium">
              Elevate your creative workflow with our curated library of high-performance prompts for Midjourney, ChatGPT, DALL-E, and more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/prompts"
                className="group w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center"
              >
                Browse Library
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-2xl border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center">
                Submit Prompt
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-y border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter">Smart Categories</h2>
              <p className="text-gray-500 text-lg">Explore tailored prompts for every creative need.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group p-8 rounded-[40px] border relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white cursor-pointer ${cat.color}`}
              >
                <div className="relative z-10">
                  <cat.icon className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-black mb-2 text-gray-900">{cat.title}</h3>
                  <p className="font-bold text-gray-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]">{cat.count} curated prompts</p>
                </div>
                <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <cat.icon className="w-40 h-40" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-4 md:space-y-0 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Trending Now</h2>
              <p className="text-gray-500 text-lg">Most used prompts by our community this week.</p>
            </div>
            <Link to="/prompts" className="flex items-center text-blue-600 font-bold hover:translate-x-1 transition-transform">
              View All Libary
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-900 py-32 rounded-[60px] mx-4 sm:mx-8 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-black text-white mb-20 tracking-tighter uppercase tracking-widest">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { step: '01', title: 'Find Inspiration', text: 'Browse through thousands of high-quality, community-tested prompts.' },
              { step: '02', title: 'Copy & Tweak', text: 'One-click copy, and then edit to fit your exact creative vision.' },
              { step: '03', title: 'Get Results', text: 'Paste into your favorite AI tool and see stunning results instantly.' },
            ].map((item, i) => (
              <div key={item.step} className="group text-center">
                <div className="text-6xl font-black text-blue-600 mb-6 group-hover:scale-125 transition-transform duration-500">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
