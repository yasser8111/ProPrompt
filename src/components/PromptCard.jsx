import React from 'react';
import { Link } from 'react-router-dom';
import { Copy, ArrowRight, Image as ImageIcon, Code, FileText, Zap } from 'lucide-react';
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
      className="group bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 hover:border-blue-100 transition-all duration-500 overflow-hidden flex flex-col h-full"
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
          <span className="flex items-center space-x-1 space-x-reverse px-3 py-1.5 bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm border border-gray-100/50">
            <CategoryIcon category={prompt.category} className="w-3 h-3" />
            <span>{prompt.category}</span>
          </span>
        </div>
      </Link>

      <div className="p-8 flex-grow flex flex-col">
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
            className="flex items-center space-x-2 space-x-reverse text-gray-400 hover:text-blue-600 font-black uppercase tracking-widest text-[10px] transition-colors p-2 -ml-2 rounded-xl hover:bg-blue-50"
          >
            <Copy className="w-4 h-4" />
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
