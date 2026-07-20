import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, User, Calendar, Instagram, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigateToBlog?: () => void;
}

export default function Header({ onNavigateToBlog }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
    // Delay the scroll to allow the mobile menu close animation (200ms) to completely finish.
    // This prevents layout shifts and scroll cancellation on mobile devices.
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // height of sticky header
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = window.scrollY + elementRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 shadow-xs' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-brand-olive flex items-center justify-center text-white font-bold tracking-tight shadow-xs">
              ON
            </div>
            <div>
              <span className="font-bold text-lg md:text-xl text-brand-dark tracking-tight block leading-none">
                パーソナルジム<span className="text-brand-olive">ON</span>
              </span>
              <span className="text-[10px] text-brand-olive font-semibold tracking-widest mt-0.5 block uppercase">Personal Gym ON</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 font-medium text-sm text-gray-600">
            <button 
              onClick={() => scrollToSection('features')}
              className="hover:text-brand-olive transition py-2 cursor-pointer"
            >
              特徴
            </button>
            <button 
              onClick={() => scrollToSection('trainers')}
              className="hover:text-brand-olive transition py-2 cursor-pointer"
            >
              トレーナー
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="hover:text-brand-olive transition py-2 cursor-pointer"
            >
              料金
            </button>
            <button 
              onClick={() => onNavigateToBlog ? onNavigateToBlog() : scrollToSection('blog')}
              className="hover:text-brand-olive transition py-2 cursor-pointer"
            >
              ブログ
            </button>
            <button 
              onClick={() => scrollToSection('access')}
              className="hover:text-brand-olive transition py-2 cursor-pointer"
            >
              アクセス
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="hover:text-brand-olive transition py-2 cursor-pointer"
            >
              よくある質問
            </button>
          </nav>

          {/* Desktop Call to Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a
                href="https://www.instagram.com/personalgym.on?igsh=ZDVpOG1xMGlsOWp1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-[#E1306C] hover:border-rose-200 hover:bg-rose-50/50 flex items-center justify-center transition-all duration-200"
                title="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://lin.ee/TK9IMAU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-[#06C755] hover:border-emerald-200 hover:bg-emerald-50/50 flex items-center justify-center transition-all duration-200"
                title="LINE"
              >
                <MessageCircle className="w-4.5 h-4.5 fill-current" />
              </a>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-brand-olive hover:bg-brand-dark text-white text-xs font-bold px-5 py-3 rounded-full shadow-xs transition duration-200 cursor-pointer"
            >
              ご予約・お問い合わせ
            </button>
          </div>

          {/* Mobile Hamburguer Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-olive p-2 rounded-lg focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full lg:hidden bg-white border-b border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 font-medium text-gray-700 text-sm flex flex-col">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left py-2.5 border-b border-gray-50 hover:text-brand-olive transition"
              >
                ONの特徴
              </button>
              <button
                onClick={() => scrollToSection('trainers')}
                className="text-left py-2.5 border-b border-gray-50 hover:text-brand-olive transition"
              >
                トレーナー紹介
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-left py-2.5 border-b border-gray-50 hover:text-brand-olive transition"
              >
                コース・料金
              </button>
              <button
                onClick={() => { setIsOpen(false); onNavigateToBlog ? onNavigateToBlog() : scrollToSection('blog'); }}
                className="text-left py-2.5 border-b border-gray-50 hover:text-brand-olive transition"
              >
                スタッフブログ
              </button>
              <button
                onClick={() => scrollToSection('access')}
                className="text-left py-2.5 border-b border-gray-50 hover:text-brand-olive transition"
              >
                営業時間・アクセス
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left py-2.5 border-b border-gray-50 hover:text-brand-olive transition"
              >
                よくある質問
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full text-center bg-brand-olive hover:bg-brand-dark text-white font-bold py-3.5 rounded-full transition"
              >
                体験レッスンのご予約はこちら
              </button>

              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-50 mt-2">
                <a
                  href="https://www.instagram.com/personalgym.on?igsh=ZDVpOG1xMGlsOWp1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-[#E1306C] transition-colors font-semibold text-xs"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://lin.ee/TK9IMAU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-[#06C755] transition-colors font-semibold text-xs"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>LINE</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
