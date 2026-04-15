import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon, Code, FileText, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const CategoryIcon = ({ category, className }) => {
  switch (category.toLowerCase()) {
    case 'image': return <ImageIcon className={className} />;
    case 'coding': return <Code className={className} />;
    case 'text': return <FileText className={className} />;
    default: return <Zap className={className} />;
  }
};

const PromptCard = ({ prompt }) => {
  const { t } = useLanguage();
  
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(prompt.prompt);
    // Silent success for premium feel, or subtle Toast
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group bg-white rounded-[40px] border border-gray-100  hover:border-blue-100 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      <Link to={`/prompts/${prompt.id}`} className="block relative aspect-video overflow-hidden bg-gray-50/50 border-b border-gray-50">
        {prompt.previewImages && prompt.previewImages[0] ? (
          <img
            src={prompt.previewImages[0]}
            alt={prompt.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-50/30">
            <CategoryIcon category={prompt.category} className="w-10 h-10 text-blue-200" />
          </div>
        )}
        <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6">
          <div className={`p-2.5 rounded-2xl border backdrop-blur-sm shadow-sm transition-transform duration-300 group-hover:scale-110 ${
            prompt.category === 'Image' ? 'bg-indigo-soft/90 text-indigo-primary border-indigo-primary/10' :
            prompt.category === 'Coding' ? 'bg-emerald-soft/90 text-emerald-primary border-emerald-primary/10' :
            prompt.category === 'Text' ? 'bg-amber-soft/90 text-amber-primary border-amber-primary/10' :
            'bg-rose-soft/90 text-rose-primary border-rose-primary/10'
          }`}>
            <CategoryIcon category={prompt.category} className="w-4 h-4" />
          </div>
        </div>
      </Link>

      <div className="p-8 grow flex flex-col">
        <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-1 tracking-tight leading-tight">{prompt.title}</h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
          {prompt.prompt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {prompt.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-gray-50/50 text-gray-400 text-[10px] font-black rounded-xl border border-gray-100 transition-colors hover:bg-blue-50 hover:text-blue-600 uppercase tracking-widest">#{tag}</span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50/50">
          <button 
            onClick={handleCopy}
            className="px-6 py-2.5 bg-gray-50/50 text-gray-400 hover:text-blue-600 font-black uppercase tracking-widest text-[10px] transition-all rounded-xl hover:bg-blue-50"
          >
            <span>{t('prompts.copyPrompt')}</span>
          </button>
          
          <Link to={`/prompts/${prompt.id}`} className="p-2.5 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PromptCard;
