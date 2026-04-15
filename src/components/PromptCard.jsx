import React from 'react';
import { Link } from 'react-router-dom';
import { Copy, ArrowRight, Image as ImageIcon, Code, FileText, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoryIcon = ({ category, className }) => {
  switch (category.toLowerCase()) {
    case 'image': return <ImageIcon className={className} />;
    case 'coding': return <Code className={className} />;
    case 'text': return <FileText className={className} />;
    default: return <Zap className={className} />;
  }
};

const PromptCard = ({ prompt }) => {
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(prompt.prompt);
    // You could add a toast here
    alert('Prompt copied!');
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      <Link to={`/prompts/${prompt.id}`} className="block relative aspect-video overflow-hidden bg-gray-50 border-b border-gray-50">
        {prompt.previewImages && prompt.previewImages[0] ? (
          <img
            src={prompt.previewImages[0]}
            alt={prompt.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-50/50">
            <CategoryIcon category={prompt.category} className="w-12 h-12 text-blue-200" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="flex items-center space-x-1 px-3 py-1 bg-white/90 backdrop-blur text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
            <CategoryIcon category={prompt.category} className="w-3 h-3" />
            <span>{prompt.category}</span>
          </span>
        </div>
        {prompt.isFeatured && (
          <div className="absolute top-4 right-4 animate-pulse">
            <span className="bg-amber-100 text-amber-700 px-3 py-1 text-[10px] font-bold rounded-full shadow-sm border border-amber-200">Featured</span>
          </div>
        )}
      </Link>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">{prompt.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {prompt.prompt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {prompt.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-semibold rounded-lg border border-gray-100 uppercase tracking-tighter">#{tag}</span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <button 
            onClick={handleCopy}
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-600 font-medium text-xs transition-colors p-2 -ml-2 rounded-lg hover:bg-blue-50"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Prompt</span>
          </button>
          
          <Link to={`/prompts/${prompt.id}`} className="p-2 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PromptCard;
