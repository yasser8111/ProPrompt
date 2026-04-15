import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Image as ImageIcon, Code, FileText, Zap, Star } from 'lucide-react';
import prompts from '../data/prompts.json';
import PromptCard from '../components/PromptCard';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const featuredPrompts = prompts.filter(p => p.isFeatured).slice(0, 3);
  const categories = [
    { title: t('categories.image'), icon: ImageIcon, color: 'bg-indigo-soft/50 text-indigo-primary border-indigo-primary/10', count: '120+' },
    { title: t('categories.writing'), icon: FileText, color: 'bg-amber-soft/50 text-amber-primary border-amber-primary/10', count: '80+' },
    { title: t('categories.coding'), icon: Code, color: 'bg-emerald-soft/50 text-emerald-primary border-emerald-primary/10', count: '50+' },
    { title: t('categories.productivity'), icon: Zap, color: 'bg-rose-soft/50 text-rose-primary border-rose-primary/10', count: '40+' },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-44 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background blobs - more subtle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-300 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[3px mb-10 gap-2">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              {t('hero.badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[1.05] mb-8">
              {t('hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">{t('hero.titleGradient')}</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-12 leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/prompts"
                className="group w-full sm:w-auto px-10 py-4.5 bg-blue-600 text-white text-base font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/10 hover:bg-blue-700 hover:shadow-blue-500/20 active:translate-y-0.5 transition-all text-center"
              >
                {t('hero.browse')}
              </Link>
              <button className="w-full sm:w-auto px-10 py-4.5 bg-white text-gray-900 text-base font-black uppercase tracking-widest rounded-2xl border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all text-center">
                {t('hero.submit')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-32 px-4 sm:px-6 lg:px-8 border-y border-gray-50/50">
        <div className="max-w-7xl mx-auto text-center md:text-start">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">{t('categories.title')}</h2>
              <p className="text-gray-500 text-lg font-medium">{t('categories.subtitle')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`p-10 rounded-[45px] border relative overflow-hidden transition-all duration-300 cursor-pointer ${cat.color}`}
              >
                <div className="relative z-10 text-center md:text-start">
                  <cat.icon className="w-10 h-10 mb-8 mx-auto md:mx-0 opacity-80" />
                  <h3 className="text-xl font-black mb-3 text-gray-900 leading-tight">{cat.title}</h3>
                  <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">{cat.count} {t('categories.promptsCount')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 space-y-4 md:space-y-0 text-center md:text-start">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tighter uppercase">{t('trending.title')}</h2>
              <p className="text-gray-500 text-lg font-medium">{t('trending.subtitle')}</p>
            </div>
            <Link to="/prompts" className="flex items-center text-blue-600 font-bold uppercase tracking-widest text-xs hover:text-blue-700 transition-colors">
              {t('trending.viewAll')}
              <ArrowRight className="ml-2 w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-900 py-40 rounded-[80px] mx-4 sm:mx-10 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto text-center md:text-start relative z-10">
          <h2 className="text-4xl font-black text-white mb-24 tracking-tighter uppercase">{t('howItWorks.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 font-arabic-fix">
            {[
              { step: '01', title: t('howItWorks.step1.title'), text: t('howItWorks.step1.desc') },
              { step: '02', title: t('howItWorks.step2.title'), text: t('howItWorks.step2.desc') },
              { step: '03', title: t('howItWorks.step3.title'), text: t('howItWorks.step3.desc') },
            ].map((item, i) => (
              <div key={item.step} className="group text-start">
                <div className="text-7xl font-black text-blue-600 mb-10 transition-colors duration-500">
                  {item.step}
                </div>
                <h3 className="text-2xl font-black text-white mb-6 uppercase">{item.title}</h3>
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
