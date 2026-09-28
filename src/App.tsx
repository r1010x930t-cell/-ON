import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Trainers from './components/Trainers';
import Gallery from './components/Gallery';
import PlansAndPricing from './components/PlansAndPricing';
import TrialFlow from './components/TrialFlow';
import Reviews from './components/Reviews';
import Blog from './components/Blog';
import BlogPage from './components/BlogPage';
import Access from './components/Access';
import BookingSystem from './components/BookingSystem';
import FAQ from './components/FAQ';
import { Instagram, MessageCircle } from 'lucide-react';
import { initAnalytics, trackPageView, trackEvent } from './lib/analytics';

export default function App() {
  const [view, setView] = useState<'home' | 'blog'>('home');

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (view === 'blog') {
      trackPageView('/blog', 'スタッフブログ｜パーソナルジムON');
    } else {
      trackPageView('/', 'パーソナルジムON｜千葉県茂原市の完全プライベートジム');
    }
  }, [view]);

  useEffect(() => {
    const checkRoute = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const isBlogSearch = searchParams.get('page') === 'blog' || searchParams.get('view') === 'blog';
      const isBlogHash = window.location.hash === '#blog' || window.location.hash === '#blog-page';
      
      if (isBlogSearch || isBlogHash) {
        setView('blog');
      } else {
        setView('home');
      }
    };

    // Check on mount
    checkRoute();

    // Listen to changes (hashchange & popstate)
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  const handleNavigateToBlog = () => {
    setView('blog');
    window.history.pushState({}, '', '?page=blog');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToHome = () => {
    setView('home');
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (view === 'blog') {
    return <BlogPage onNavigateToHome={handleNavigateToHome} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-emerald-800/10 selection:text-emerald-950 font-sans antialiased">
      {/* Navigation Header */}
      <Header onNavigateToBlog={handleNavigateToBlog} />

      {/* Main Landing Page Content */}
      <main>
        {/* Hero Banner Visual Area */}
        <Hero />

        {/* Core Features: 3 reassuring pillars */}
        <Features />

        {/* Trainers Panel */}
        <Trainers />

        {/* Facility & Equipment Gallery */}
        <Gallery />

        {/* Plans & Pricing Section */}
        <PlansAndPricing />

        {/* Flow & Guide for First-Time Trial Lesson */}
        <TrialFlow />

        {/* Contact & Web Reservation System */}
        <BookingSystem />

        {/* Member Reviews */}
        <Reviews />

        {/* Staff Blog Section */}
        <Blog onNavigateToBlog={handleNavigateToBlog} />

        {/* Location access mapping */}
        <Access />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Public Footer */}
      <footer className="bg-emerald-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-8 gap-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-12 h-12 rounded-full bg-white text-emerald-950 flex items-center justify-center font-bold text-xl tracking-tight shadow-md">
                ON
              </div>
              <div className="text-left">
                <span className="font-bold text-lg md:text-xl text-white tracking-tight block">パーソナルジムON</span>
                <span className="text-xs text-emerald-200/80 tracking-wide font-medium">あなたはただ、ONに来るだけ。</span>
                <div className="flex items-center justify-center md:justify-start space-x-3 mt-3">
                  <a
                    href="https://www.instagram.com/personalgym.on?igsh=ZDVpOG1xMGlsOWp1"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('click_instagram', { placement: 'footer' })}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://lin.ee/TK9IMAU"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('click_line', { placement: 'footer' })}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200"
                    title="LINE"
                  >
                    <MessageCircle className="w-4 h-4 fill-current text-white" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-100/90 font-medium">
              <a href="#features" className="hover:text-amber-300 transition">特徴</a>
              <a href="#trainers" className="hover:text-amber-300 transition">トレーナー</a>
              <a href="#gallery" className="hover:text-amber-300 transition">施設・設備</a>
              <a href="#pricing" className="hover:text-amber-300 transition">料金</a>
              <a href="#trial-flow" className="hover:text-amber-300 transition">体験の流れ</a>
              <a href="#reviews" className="hover:text-amber-300 transition">クチコミ</a>
              <a href="#contact" className="hover:text-amber-300 transition">ご予約</a>
              <button onClick={handleNavigateToBlog} className="hover:text-amber-300 transition cursor-pointer">ブログ</button>
              <a href="#access" className="hover:text-amber-300 transition">アクセス</a>
              <a href="#faq" className="hover:text-amber-300 transition">よくある質問</a>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-100/60 font-semibold text-left">
            <div className="space-y-1">
              <p>〒299-4113 千葉県茂原市法目701-1（敷地内広々駐車場完備）</p>
              <p className="text-emerald-100/40">完全予約制プライベートジム ON / 営業時間 8:00 〜 21:00</p>
            </div>
            <p className="text-emerald-100/40">&copy; 2026 パーソナルジムON. All rights reserved.</p>
          </div>

        </div>
      </footer>
    </div>
  );
}
