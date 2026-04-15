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
      className="group bg-white rounded-[32px] border border-gray-100 hover:border-blue-100 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      <Link to={`/prompts/${prompt.id}`} className="block relative aspect-video overflow-hidden bg-gray-50/50">
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
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
          <div className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
            prompt.category === 'Image' ? 'bg-indigo-soft/80 text-indigo-primary border-indigo-primary/10' :
            prompt.category === 'Coding' ? 'bg-emerald-soft/80 text-emerald-primary border-emerald-primary/10' :
            prompt.category === 'Text' ? 'bg-amber-soft/80 text-amber-primary border-amber-primary/10' :
            'bg-rose-soft/80 text-rose-primary border-rose-primary/10'
          }`}>
            {prompt.category}
          </div>
        </div>
      </Link>

      <div className="p-6 grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">{prompt.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {prompt.prompt}
        </p>
        
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {prompt.tags.map(tag => (
            <span key={tag} className="text-gray-400 text-[11px] font-medium transition-colors hover:text-blue-500 cursor-default">#{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PromptCard;
