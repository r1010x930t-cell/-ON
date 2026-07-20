import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 md:py-24">
      {/* Background Image with elegant modern styling */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.ibb.co/60FLpyQz/l-LN-G1bct0ao3-Bg-QK7s-EC323pd9-S9tu-G1-VNZgh-MBKv2-FAqmb-dg-Zd-Z7-KLIet-Ri0o4-Ycj-Tm-FJ7-E81-Lm-So-TPx-FJFz.jpg"
          alt="Personal Gym ON Lounge"
          className="w-full h-full object-cover object-center scale-105 filter brightness-95"
          referrerPolicy="no-referrer"
        />
        {/* Modern high-contrast elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent md:bg-gradient-to-r md:from-white/90 md:via-white/75 md:to-white/10"></div>
        {/* Soft atmospheric radial gradient for luxury feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,250,229,0.15),transparent_60%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-2xl text-left space-y-6 md:space-y-8">
          
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-sage border border-brand-olive/10 px-3.5 py-1.5 rounded-full text-brand-olive font-bold text-xs md:text-sm shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-olive fill-current" />
            <span>茂原市のマンツーマンフィットネス</span>
          </motion.div>
 
          {/* Main Copy */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-dark tracking-tight leading-[1.2]"
            >
              あなたはただ、<br />
              <span className="relative inline-block text-brand-olive">
                ON
                <span className="absolute left-0 bottom-1.5 w-full h-1.5 bg-brand-accent/30 -z-10 rounded-xs"></span>
              </span>
              に来るだけ。
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed max-w-xl"
            >
              寝起きのままでも、ラフな格好でも、なんでもOK。とにかく来てくれたら、あとはこちらにお任せください。楽しく身体を変えていきましょう！
            </motion.p>
          </div>
 
          {/* Action Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <button
              onClick={handleScrollToContact}
              className="group bg-brand-olive hover:bg-brand-dark text-white font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg cursor-pointer"
            >
              <span>まずは体験レッスン</span>
            </button>
            
            <div className="flex items-center justify-center gap-2.5 text-xs text-brand-dark/80 font-semibold px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-brand-olive block animate-pulse"></span>
              <span>完全個室 / 体験レッスン実施中</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Elegant visual indicator for scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400 text-xs font-semibold select-none opacity-60">
        <span className="tracking-widest rotate-90 inline-block mb-2 font-mono">SCROLL</span>
        <div className="w-[1.5px] h-12 bg-gray-200 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-olive rounded-full animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
