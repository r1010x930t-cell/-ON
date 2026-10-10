import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Tag, Heart, Apple, Sparkles, ChevronDown, BookOpen, X, ArrowRight, Settings } from 'lucide-react';
import { useBlogStore, BlogPost } from '../lib/blogStore';
import BlogAdmin from './BlogAdmin';

interface BlogProps {
  onNavigateToBlog?: () => void;
}

export default function Blog({ onNavigateToBlog }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState<'すべて' | 'トレーニング' | '食事管理' | 'お知らせ'>('すべて');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const toggleExpand = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <section id="blog" className="py-20 bg-white relative overflow-hidden border-b border-gray-100 scroll-mt-20">
      {/* Decorative background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-sage-light/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-md mx-auto px-4 text-center relative z-10">
        
        {/* Compact Section Title */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="w-8 h-px bg-brand-olive/30"></span>
          <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
            Staff Blog
          </span>
          <span className="w-8 h-px bg-brand-olive/30"></span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark tracking-tight">
          スタッフブログ
        </h2>
        <div className="w-8 h-[2px] bg-brand-accent mx-auto rounded-full mt-3"></div>

        {/* Dynamic Interactive Icon Button */}
        <div className="my-8 flex justify-center">
          <button
            onClick={() => onNavigateToBlog ? onNavigateToBlog() : setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center cursor-pointer focus:outline-hidden"
            aria-label="スタッフブログ一覧を見る"
          >
            {/* Pulsing decorative border ring */}
            <div className="absolute -inset-4 rounded-full bg-brand-sage/40 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse"></div>
            <div className="absolute -inset-1 rounded-full bg-brand-olive/10 group-hover:scale-105 transition-all duration-300"></div>
            
            {/* Main Icon Orb */}
            <div className="relative w-20 h-20 rounded-full bg-brand-olive text-white flex items-center justify-center shadow-lg group-hover:bg-brand-olive/90 transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-3">
              <BookOpen className="w-10 h-10 stroke-[1.5]" />
              
              {/* Pulsing notification circle */}
              <span className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-brand-accent text-[10px] font-extrabold text-brand-dark items-center justify-center shadow-sm">
                  {blogPosts.length}
                </span>
              </span>
            </div>
          </button>
        </div>

        <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 font-medium">
          プロが教える効果的なトレーニングや、<br className="hidden sm:inline" />
          リバウンドしない食事管理の知識などを配信中！
        </p>

        {/* View list invitation trigger */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => onNavigateToBlog ? onNavigateToBlog() : setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs md:text-sm text-brand-olive font-extrabold hover:text-brand-dark transition-colors group cursor-pointer"
          >
            <span>ブログ一覧を見る</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Modern sliding overlay modal for the blog list */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Soft backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm"
            />

            {/* Modal Box wrapper */}
            <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
              >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/50">
                  <div className="space-y-1">
                    <span className="text-brand-olive font-bold text-[10px] uppercase tracking-widest bg-brand-sage px-2.5 py-1 rounded-full inline-block">
                      Staff Blog
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-dark tracking-tight">
                      スタッフブログ
                    </h3>
                  </div>
                  
                  {/* Close and Admin buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAdminOpen(true)}
                      className="p-2.5 rounded-full bg-white hover:bg-brand-sage-light text-gray-500 hover:text-brand-olive transition-all duration-200 border border-gray-100 shadow-2xs cursor-pointer focus:outline-hidden flex items-center gap-1 text-xs font-bold px-3.5"
                      title="ブログ管理者メニュー"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">管理画面</span>
                    </button>

                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-400 hover:text-brand-dark transition-all duration-200 border border-gray-100 shadow-2xs cursor-pointer focus:outline-hidden"
                      aria-label="閉じる"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Scrollable Content list */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 bg-white scrollbar-thin">
                  
                  {/* Filter controls */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(['すべて', 'トレーニング', '食事管理', 'お知らせ'] as const).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-2xs cursor-pointer ${
                          selectedCategory === category
                            ? 'bg-brand-olive text-white shadow-md'
                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-brand-dark'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Accordion list */}
                  <div className="space-y-4">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => {
                        const isExpanded = expandedPostId === post.id;
                        const iconData = getIconAndGradient(post.iconType);
                        return (
                          <div
                            key={post.id}
                            className="bg-white rounded-2xl border border-gray-100 hover:border-brand-olive/20 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
                          >
                            {/* Item head trigger */}
                            <button
                              onClick={() => toggleExpand(post.id)}
                              className="w-full text-left p-4.5 md:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden group"
                            >
                              <div className="flex items-start md:items-center gap-4 flex-1 min-w-0">
                                {/* Icon container */}
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${iconData.bgGradient} hidden sm:block shrink-0`}>
                                  {iconData.icon}
                                </div>
                                
                                <div className="space-y-1.5 min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-[11px] font-semibold text-gray-400">
                                    <span className="flex items-center gap-1">
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

                                  <h4 className="font-bold text-brand-dark text-sm md:text-base leading-snug group-hover:text-brand-olive transition duration-200">
                                    {post.title}
                                  </h4>

                                  {!isExpanded && (
                                    <p className="text-gray-400 text-xs line-clamp-1 font-medium transition-all duration-300">
                                      {post.summary}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="shrink-0">
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-brand-olive group-hover:border-brand-olive/20 transition-colors bg-gray-50"
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </motion.div>
                              </div>
                            </button>

                            {/* Item expansion body */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                  <div className="px-5 pb-6 md:px-6 md:pb-8 border-t border-gray-100 pt-5 space-y-6 bg-gray-50/25">
                                    {/* Summarized block */}
                                    <div className="p-4 bg-brand-sage-light/35 border-l-4 border-brand-olive rounded-r-xl">
                                      <p className="text-brand-dark font-medium text-xs md:text-sm leading-relaxed">
                                        {post.summary}
                                      </p>
                                    </div>

                                    {/* Article body content */}
                                    <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                                      {post.content.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                      ))}
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-400 font-semibold pt-4 border-t border-gray-100">
                                      <span>パーソナルジムON スタッフブログ | {post.readTime}</span>
                                      <button
                                        onClick={() => toggleExpand(post.id)}
                                        className="text-brand-olive hover:underline font-bold cursor-pointer"
                                      >
                                        閉じる
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12 text-gray-400 font-medium">
                        このカテゴリーのブログ記事はまだありません。
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Foot */}
                <div className="p-5 border-t border-gray-100 text-center bg-gray-50/50 shrink-0">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-brand-olive hover:bg-brand-olive/90 text-white font-extrabold text-xs shadow-xs hover:shadow-md transition duration-200 cursor-pointer"
                  >
                    ブログを閉じる
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Panel overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <BlogAdmin onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
