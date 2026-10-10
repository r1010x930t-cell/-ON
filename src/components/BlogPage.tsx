import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Tag, Heart, Apple, Sparkles, ChevronDown, ChevronLeft, BookOpen, ArrowLeft, Instagram, MessageCircle, ExternalLink, Settings } from 'lucide-react';
import { useBlogStore, BlogPost } from '../lib/blogStore';
import BlogAdmin from './BlogAdmin';

interface BlogPageProps {
  onNavigateToHome: () => void;
}

export default function BlogPage({ onNavigateToHome }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'すべて' | 'トレーニング' | '食事管理' | 'お知らせ'>('すべて');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const { posts: blogPosts } = useBlogStore();

  const getIconAndGradient = (iconType: 'sparkles' | 'apple' | 'heart' | 'book') => {
    switch (iconType) {
      case 'sparkles':
        return {
          icon: <Sparkles className="w-5 h-5 text-amber-500" />,
          bgGradient: 'from-amber-50 to-orange-50 text-amber-700 border-amber-200/50'
        };
      case 'apple':
        return {
          icon: <Apple className="w-5 h-5 text-emerald-600" />,
          bgGradient: 'from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200/50'
        };
      case 'heart':
        return {
          icon: <Heart className="w-5 h-5 text-rose-500" />,
          bgGradient: 'from-rose-50 to-pink-50 text-rose-700 border-rose-200/50'
        };
      case 'book':
      default:
        return {
          icon: <BookOpen className="w-5 h-5 text-blue-500" />,
          bgGradient: 'from-blue-50 to-indigo-50 text-blue-700 border-blue-200/50'
        };
    }
  };

  const filteredPosts = selectedCategory === 'すべて' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const activePost = selectedPostId ? blogPosts.find(p => p.id === selectedPostId) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedPostId]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col antialiased">
      {/* Blog-Dedicated Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => { setSelectedPostId(null); onNavigateToHome(); }}>
            <div className="w-9 h-9 rounded-full bg-brand-olive flex items-center justify-center text-white font-bold tracking-tight shadow-2xs">
              ON
            </div>
            <div>
              <span className="font-bold text-base md:text-lg text-brand-dark tracking-tight block leading-none">
                パーソナルジムON
              </span>
              <span className="text-[9px] text-brand-olive font-semibold tracking-widest mt-0.5 block uppercase">Staff Blog</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-olive transition-colors cursor-pointer bg-gray-100 px-3.5 py-1.5 rounded-full"
              title="ブログ管理"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ブログ管理</span>
            </button>

            <button 
              onClick={onNavigateToHome}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-brand-olive hover:text-brand-dark transition-colors cursor-pointer bg-brand-sage-light/40 px-3.5 py-1.5 rounded-full"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ホームページに戻る</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Blog Workspace */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-12 md:py-16">
        <AnimatePresence mode="wait">
          {!activePost ? (
            // LIST VIEW
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Blog Title Header */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="w-8 h-px bg-brand-olive/30"></span>
                  <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
                    Official Blog
                  </span>
                  <span className="w-8 h-px bg-brand-olive/30"></span>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
                  スタッフブログ
                </h1>
                <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
                <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed pt-3">
                  茂原市のパーソナルジムONがお届けする、効果的なトレーニング方法、リバウンドしない食事習慣、スタジオからのお知らせなど、役立つ情報をお届けします。
                </p>
              </div>

              {/* Filtering tabs */}
              <div className="flex flex-wrap gap-1.5 justify-center py-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-3xs max-w-md mx-auto">
                {(['すべて', 'トレーニング', '食事管理', 'お知らせ'] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-brand-olive text-white shadow-xs'
                        : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Grid or List of Posts */}
              <div className="grid gap-6 md:grid-cols-1">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => {
                    const iconData = getIconAndGradient(post.iconType);
                    return (
                      <motion.article
                        key={post.id}
                        onClick={() => setSelectedPostId(post.id)}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 cursor-pointer group"
                      >
                        {/* Icon Block */}
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${iconData.bgGradient} flex items-center justify-center self-start shrink-0`}>
                          {iconData.icon}
                        </div>

                        {/* Content Block */}
                        <div className="space-y-3 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-semibold">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {post.date}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-olive bg-brand-sage px-2 py-0.5 rounded-md">
                              <Tag className="w-3 h-3" />
                              {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-gray-500 font-medium">
                              <User className="w-3.5 h-3.5" />
                              {post.author}
                            </span>
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-brand-dark group-hover:text-brand-olive transition-colors leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-2 md:line-clamp-3">
                            {post.summary}
                          </p>

                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-xs text-gray-400 font-medium">{post.readTime}</span>
                            <span className="text-xs text-brand-olive font-extrabold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                              記事を読む
                              <span className="text-base">→</span>
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })
                ) : (
                  <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 text-gray-400 font-semibold">
                    該当する記事がありません。管理画面から記事を公開してください。
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            // DETAIL VIEW (READING VIEW)
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Back to List link */}
              <button
                onClick={() => setSelectedPostId(null)}
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-gray-500 hover:text-brand-olive transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>ブログ一覧に戻る</span>
              </button>

              {/* Main Article Container */}
              <article className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-100 shadow-md space-y-6">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-400 font-semibold border-b border-gray-100 pb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {activePost.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-olive bg-brand-sage px-2.5 py-0.5 rounded-md">
                    <Tag className="w-3.5 h-3.5" />
                    {activePost.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 font-medium">
                    <User className="w-4 h-4" />
                    {activePost.author}
                  </span>
                  <span className="ml-auto text-xs text-gray-400">{activePost.readTime}</span>
                </div>

                {/* Article Header */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark leading-snug tracking-tight">
                  {activePost.title}
                </h1>

                {/* Summary Box */}
                <div className="p-4.5 bg-brand-sage-light/30 border-l-4 border-brand-olive rounded-r-xl">
                  <p className="text-brand-dark font-semibold text-sm leading-relaxed">
                    {activePost.summary}
                  </p>
                </div>

                {/* Content Paragraphs */}
                <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed font-medium pt-4 border-t border-gray-50">
                  {activePost.content.map((paragraph, index) => (
                    <p key={index} className="indent-0 whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Foot Signature */}
                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-400 font-semibold">
                  <span>パーソナルジムON スタッフブログ | {activePost.readTime}</span>
                  <button
                    onClick={() => setSelectedPostId(null)}
                    className="px-5 py-2 rounded-full bg-brand-sage-light text-brand-olive hover:bg-brand-sage hover:text-white transition duration-200 font-bold cursor-pointer"
                  >
                    ブログ一覧に戻る
                  </button>
                </div>
              </article>

              {/* Guide Box to Reservation */}
              <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold font-serif">
                  体験レッスンでお待ちしております！
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 max-w-lg mx-auto leading-relaxed">
                  パーソナルジムONでは、他のお客様と重なることのない完全プライベート空間で体験レッスンをご提供しております。運動が苦手な方も大歓迎です。
                </p>
                <button
                  onClick={onNavigateToHome}
                  className="bg-white hover:bg-amber-300 text-emerald-950 hover:scale-102 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>ホームページで詳細・ご予約を見る</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Simple Footer */}
      <footer className="bg-emerald-950 text-white py-12 border-t border-white/5 shrink-0">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white text-emerald-950 flex items-center justify-center font-bold text-sm tracking-tight">
              ON
            </div>
            <span className="font-bold text-sm text-white tracking-tight">パーソナルジムON スタッフブログ</span>
          </div>
          <p className="text-xs text-emerald-100/40">〒299-4113 千葉県茂原市法目701-1 | 完全予約制プライベートジム ON</p>
          
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/personalgym.on?igsh=ZDVpOG1xMGlsOWp1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-100/50 hover:text-[#E1306C] transition-colors"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://lin.ee/TK9IMAU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-100/50 hover:text-[#06C755] transition-colors"
              title="LINE"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
          </div>

          <p className="text-[10px] text-emerald-100/30">&copy; 2026 パーソナルジムON. All rights reserved.</p>
        </div>
      </footer>

      {/* Admin Panel overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <BlogAdmin onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
