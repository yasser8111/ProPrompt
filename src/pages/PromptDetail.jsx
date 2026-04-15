import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import prompts from '../data/prompts.json';
import { 
  ArrowLeft, Copy, Edit3, Wand2, Check, 
  Image as ImageIcon, Code as CodeIcon, FileText, Zap, 
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const PromptDetail = () => {
  const { t, lang } = useLanguage();
  const { id } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const found = prompts.find(p => p.id === parseInt(id));
    if (found) {
      setPrompt(found);
      setEditedText(found.prompt);
    }
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!prompt) return <div className="py-40 text-center font-black text-gray-400 uppercase tracking-widest text-xs">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link to="/prompts" className="inline-flex items-center space-x-2 space-x-reverse text-gray-500 hover:text-blue-600 transition-colors mb-16 group font-black text-xs uppercase tracking-widest">
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform rtl:group-hover:translate-x-1 rtl:rotate-180" />
        <span>{t('details.back')}</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-12 xl:col-span-8">
          <div className="mb-20">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-5 py-2 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full border border-blue-100/50 uppercase tracking-widest">
                {prompt.category}
              </span>
              <div className="flex gap-2">
                {prompt.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-gray-50/50 text-gray-400 text-[10px] font-black rounded-xl border border-gray-100 uppercase tracking-widest">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight mb-6 uppercase">
              {prompt.title}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
              {t('details.description')}
            </p>
          </div>

          <div className="bg-white rounded-[50px] border border-gray-100 shadow-2xl p-10 md:p-16 mb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/30 rounded-full blur-[100px] -z-1"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-12 relative z-10">
              <div className="flex items-center space-x-3 space-x-reverse">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  aria-label={isEditing ? t('details.finish') : t('details.edit')}
                  className={`p-4 rounded-2xl transition-all ${isEditing ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCopy}
                  aria-label={t('prompts.copyPrompt')}
                  className="p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:translate-y-0.5 transition-all group"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                        <Check className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                        <Copy className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <div className="bg-gray-50/50 backdrop-blur-md rounded-[40px] border border-gray-100 p-10 min-h-[250px] relative z-10">
              {isEditing ? (
                <textarea
                  className="w-full h-full bg-transparent border-none focus:outline-none text-gray-700 font-mono text-xl leading-relaxed resize-none font-medium"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="text-gray-700 font-mono text-xl leading-relaxed whitespace-pre-wrap select-all font-medium">
                  {editedText}
                </p>
              )}
              <button className="absolute bottom-8 right-8 rtl:right-auto rtl:left-8 p-4 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 text-gray-300 hover:text-blue-600 transition-all hover:bg-gray-50">
                 <Wand2 className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-10 flex items-center justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest px-6 opacity-60">
              <span>{t('prompts.tokenCount')}: ~{Math.floor(editedText.length / 4)}</span>
              <div className="flex space-x-6 space-x-reverse">
                 <button className="hover:text-blue-600 transition-colors uppercase">Safety Report</button>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-black text-gray-900 mb-12 tracking-tighter uppercase flex items-center space-x-4 space-x-reverse">
              <span className="w-1.5 h-10 bg-blue-600 rounded-full"></span>
              <span>{t('details.results')}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {prompt.previewImages && prompt.previewImages.map((img, i) => (
                <div key={i} className="group relative aspect-square rounded-[50px] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 bg-gray-50/50 pointer-events-none">
                   <img src={img} alt="Preview Result" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
              ))}
              
              {prompt.sampleOutput && (
                <div className="md:col-span-2 bg-[#0F172A] rounded-[50px] p-10 md:p-16 shadow-2xl border-2 border-gray-800/20">
                  <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sample Output</span>
                    <div className="flex space-x-2 space-x-reverse">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    </div>
                  </div>
                  <pre className="text-slate-300 font-mono text-base md:text-lg leading-loose overflow-x-auto font-medium">
                    <code>{prompt.sampleOutput}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden xl:block xl:col-span-4">
           <div className="sticky top-28 space-y-10">
              <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-[55px] p-10 text-white shadow-3xl shadow-blue-900/40 group overflow-hidden border border-white/5">
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{t('details.upgrade')}</h3>
                <p className="text-blue-100/70 text-sm mb-10 leading-relaxed font-medium">{t('details.upgradeDesc')}</p>
                <button className="w-full py-4.5 bg-white text-blue-900 font-black rounded-[20px] shadow-xl uppercase tracking-widest text-xs hover:bg-blue-50 transition-colors active:translate-y-0.5">
                  {t('details.unlock')}
                </button>
              </div>

              <div className="bg-white rounded-[50px] border border-gray-100 shadow-2xl p-10 space-y-10">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter border-b border-gray-50 pb-6">{t('details.proTips')}</h3>
                <div className="space-y-8">
                   {[
                     "Adjust lighting tokens for mood shifts.",
                     "Best with Midjourney v6+ or DALL-E 3.",
                     "Combine with negative prompts for clarity."
                   ].map((tip, i) => (
                      <div key={i} className="flex gap-5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0"></div>
                        <p className="text-sm font-semibold text-gray-500 leading-relaxed">{tip}</p>
                      </div>
                   ))}
                </div>
                <button className="w-full mt-10 py-4 bg-gray-50 text-gray-400 font-black uppercase tracking-widest text-[10px] rounded-[20px] border border-gray-100 hover:bg-gray-100 hover:text-gray-600 transition-colors flex items-center justify-center gap-3">
                   <HelpCircle className="w-4 h-4" />
                   <span>View Documentation</span>
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
