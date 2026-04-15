import React from 'react';
import { Sparkles, Send, Code2, Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-1 bgColorGradient rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Pro<span className="text-blue-600">Prompt</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Empowering creators with the world's most professional and refined AI library.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 border-b-2 border-blue-600 w-fit pb-1">Resources</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Best Practices</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Image Generation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Coding Tips</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 border-b-2 border-blue-600 w-fit pb-1">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Terms & Privacy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Contact Support</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 border-b-2 border-blue-600 w-fit pb-1">Stay Connected</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-all active:scale-90">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-all active:scale-90">
                <Code2 className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-all active:scale-90">
                <Briefcase className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-xs font-medium">
            &copy; {new Date().getFullYear()} ProPrompt. Designed for professional creators. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
