import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import prompts from '../data/prompts.json';
import { 
  ArrowLeft, Copy, Edit3, Wand2, Check, 
  Image as ImageIcon, Code as CodeIcon, FileText, Zap, 
  Share2, Save, MoreHorizontal, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PromptDetail = () => {
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

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (!prompt) return <div className="py-20 text-center font-bold text-gray-500">Loading prompt details...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/prompts" className="inline-flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors mb-12 group font-semibold">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Library</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Details & Interaction */}
        <div className="lg:col-span-12 xl:col-span-8">
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100 uppercase tracking-widest">
                {prompt.category}
              </span>
              <div className="flex gap-2">
                {prompt.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-semibold rounded-lg border border-gray-100">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight mb-4">
              {prompt.title}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
              Professional, high-performance {prompt.category.toLowerCase()} prompt optimized for peak AI results.
            </p>
          </div>

          {/* Prompt Block */}
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl p-8 md:p-12 mb-12 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -z-1 opacity-20 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">The Power Prompt</h3>
                  <p className="text-sm font-medium text-gray-400">Copy or refine this prompt for your needs.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleEdit}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all text-sm ${isEditing ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditing ? 'Finish Editing' : 'Edit Prompt'}</span>
                </button>
                <button 
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm group"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center space-x-2">
                        <Copy className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        <span>Copy Prompt</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <div className="bg-gray-50/80 backdrop-blur-sm rounded-[30px] border border-gray-100 p-8 min-h-[200px] relative z-10 group/code">
              {isEditing ? (
                <textarea
                  className="w-full h-full bg-transparent border-none focus:outline-none text-gray-700 font-mono text-lg leading-relaxed resize-none"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="text-gray-700 font-mono text-lg leading-relaxed whitespace-pre-wrap select-all">
                  {editedText}
                </p>
              )}
              {/* Magic improvement tooltip/button mock */}
              <button className="absolute bottom-6 right-6 p-3 bg-white rounded-2xl shadow-lg border border-gray-50 text-gray-400 hover:text-blue-600 transition-all hover:scale-110 group/magic">
                 <Wand2 className="w-5 h-5 group-hover/magic:animate-spin-slow" />
                 <span className="sr-only">AI Improve</span>
              </button>
            </div>

            <div className="mt-8 flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-widest px-4">
              <span>Token Count: ~{Math.floor(editedText.length / 4)}</span>
              <div className="flex space-x-4">
                 <button className="hover:text-gray-900 transition-colors">Safety Report</button>
                 <button className="hover:text-gray-900 transition-colors">Help Center</button>
              </div>
            </div>
          </div>

          {/* Results / Preview Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight flex items-center space-x-3">
              <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
              <span>Prompt Results & Examples</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {prompt.previewImages && prompt.previewImages.map((img, i) => (
                <div key={i} className="group relative aspect-square rounded-[40px] overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
                   <img src={img} alt="Preview Result" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                      <p className="text-white font-bold text-sm">Example Output {i+1}</p>
                   </div>
                </div>
              ))}
              
              {prompt.sampleOutput && (
                <div className="md:col-span-2 bg-[#1E1E1E] rounded-[40px] p-8 md:p-12 shadow-2xl border-4 border-gray-800">
                  <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-[4px]">Verified Output</span>
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <pre className="text-emerald-400 font-mono text-sm leading-relaxed overflow-x-auto selection:bg-emerald-900 selection:text-white">
                    <code>{prompt.sampleOutput}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Meta Info / Tips (Sidebar-like approach) */}
        <div className="hidden xl:block xl:col-span-4">
           <div className="sticky top-28 space-y-8">
              {/* Premium Card */}
              <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-[45px] p-8 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                <h3 className="text-xl font-black mb-4 relative z-10">Upgrade to Pro</h3>
                <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium relative z-10">Get access to professional-grade variations, private prompt storage, and advanced AI optimization tools.</p>
                <button className="w-full py-4 bg-white text-blue-600 font-black rounded-2xl shadow-lg relative z-10 hover:scale-105 active:scale-95 transition-transform">
                  Unlock Pro Features
                </button>
              </div>

              {/* Tips Section */}
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl p-8">
                <h3 className="text-lg font-black text-gray-900 mb-8 border-b border-gray-50 pb-4">Pro Tips & Notes</h3>
                <div className="space-y-6">
                   <div className="flex space-x-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                      <p className="text-sm font-medium text-gray-500 leading-relaxed">Adjust the lighting tokens to shift the emotional mood of the output.</p>
                   </div>
                   <div className="flex space-x-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                      <p className="text-sm font-medium text-gray-500 leading-relaxed">Works best with Midjourney v6 or DALL-E 3 with standard aspect ratios.</p>
                   </div>
                   <div className="flex space-x-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                      <p className="text-sm font-medium text-gray-500 leading-relaxed">Consider lowering the weight of decorative elements if the result is busy.</p>
                   </div>
                </div>
                <button className="w-full mt-10 py-3 bg-gray-50 text-gray-600 font-bold rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                   <HelpCircle className="w-4 h-4" />
                   <span>View Guide</span>
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
