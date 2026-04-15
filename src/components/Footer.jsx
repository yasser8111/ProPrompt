import React from 'react';
import { Sparkles, Send, Code2, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 space-x-reverse mb-8">
              <div className="p-1.5 bgColorGradient rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Pro<span className="text-blue-600">Prompt</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
              {t('footer.desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[4px] mb-10 border-b border-blue-600/10 w-fit pb-4">{t('footer.resources')}</h3>
            <ul className="space-y-6">
              <li><a href="#" className="text-gray-400 font-bold hover:text-blue-600 transition-colors text-xs uppercase tracking-widest">Best Practices</a></li>
              <li><a href="#" className="text-gray-400 font-bold hover:text-blue-600 transition-colors text-xs uppercase tracking-widest">Image Generation</a></li>
              <li><a href="#" className="text-gray-400 font-bold hover:text-blue-600 transition-colors text-xs uppercase tracking-widest">Coding Tips</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[4px] mb-10 border-b border-blue-600/10 w-fit pb-4">{t('footer.company')}</h3>
            <ul className="space-y-6">
              <li><a href="#" className="text-gray-400 font-bold hover:text-blue-600 transition-colors text-xs uppercase tracking-widest">About Us</a></li>
              <li><a href="#" className="text-gray-400 font-bold hover:text-blue-600 transition-colors text-xs uppercase tracking-widest">Terms & Privacy</a></li>
              <li><a href="#" className="text-gray-400 font-bold hover:text-blue-600 transition-colors text-xs uppercase tracking-widest">Contact Support</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[4px] mb-10 border-b border-blue-600/10 w-fit pb-4">{t('footer.social')}</h3>
            <div className="flex space-x-6 space-x-reverse">
              <a href="#" className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95">
                <Code2 className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95">
                <Briefcase className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest opacity-50">
            &copy; {new Date().getFullYear()} ProPrompt. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
