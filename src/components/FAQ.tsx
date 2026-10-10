import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle, Heart, ShieldCheck } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'サービス' | '体験・入会' | '食事・指導';
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'すべて' | 'サービス' | '体験・入会' | '食事・指導'>('すべて');

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: '運動経験が全くない初心者ですが、大丈夫ですか？',
      answer: 'はい、大歓迎です！パーソナルジムONにお越しいただくお客様の多くが運動初心者の方や、普段あまり運動をされていない方です。お客様の体力レベル、運動経験、その日の体調に合わせて完全オーダーメイドでメニューを構築しますので、ご安心ください。マシンの正しい使い方や怪我をしない丁寧なフォームから、わかりやすくサポートいたします。',
      category: 'サービス'
    },
    {
      id: 2,
      question: '体験レッスンでは何を持っていけば良いですか？',
      answer: '動きやすい服装（ウエア）、汗拭き用のタオル、室内用シューズ（内履き）、水分補給用のお飲み物をお持ちください。なお、スタジオ内でお着替えいただくことも可能ですので、お気軽にお越しください。ご入会される方はクレジットカードをご持参ください。',
      category: '体験・入会'
    },
    {
      id: 3,
      question: '他のお客様とすれ違ったり、人目が気になったりしませんか？',
      answer: '当店は完全予約制・完全個室のプライベートスタジオです。他のお客様と時間が重ならないように枠を設定しておりますので、トレーニング中に別のお客様とお会いすることは基本的にございません。「一般的なジムだと周囲の視線が気になって集中できない…」という方でも、リラックスしてご自身のボディメイクに集中していただける環境を整えております。',
      category: 'サービス'
    },
    {
      id: 4,
      question: '食事制限は厳しいですか？お酒や甘いものは我慢が必要ですか？',
      answer: '極端な糖質ゼロや、サラダとチキンだけを食べるような無理な食事制限は一切行いません。そのような制限は一時的に痩せてもリバウンドの直接的な原因になります。ONでは、主食（炭水化物）を摂りながら、タンパク質・脂質・炭水化物のバランス（PFCバランス）を整える「しっかり食べて健康的に引き締める」持続可能な食事スタイルをご提案します。お酒や甘いものも、楽しむタイミングやバランスをご相談しながら無理なくコントロールしていきます。',
      category: '食事・指導'
    },
    {
      id: 5,
      question: '週に何回通うのがおすすめですか？',
      answer: 'お客様の目標やライフスタイルに合わせて設定可能ですが、まずは週に1回〜2回のご来店を推奨しております。完全個別パーソナルによる適切な運動刺激と、ライフスタイルに合わせた食事・生活のアドバイスにより、週1回（月4回）からでも十分に身体の変化や効果を実感していただけます。忙しい日常の隙間時間で無理なく続けていただけるスケジュールをご案内します。',
      category: 'サービス'
    },
    {
      id: 6,
      question: '駐車場はありますか？お車でのアクセスは可能ですか？',
      answer: 'はい、スタジオの敷地内に広々とした駐車場をご用意しております。完全個室・プライベートスタジオですので、他のお客様のお車に気を使うことなく、ゆったりと駐車していただけます。',
      category: 'サービス'
    },
    {
      id: 7,
      question: '体験後の強引な勧誘などはありますか？',
      answer: '強引なセールスや勧誘は一切行いませんのでご安心ください。パーソナルジムONでは、体験レッスンでスタジオやトレーナーの雰囲気、ご提案内容にご満足いただき、「ここなら安心して続けられそう」と納得していただいた方にのみご入会いただいております。まずはお気軽に当店の良さを体感しにいらしてください。',
      category: '体験・入会'
    },
    {
      id: 8,
      question: '入会金やその他に必要な手数料などはありますか？',
      answer: '入会金として20,000円（税込）をいただいております。なお、事務手数料などの余計な初期費用やオプション料金は一切かかりません。当日入会された場合は体験レッスン費（3,000円）が0円となります。料金についてご不明な点があれば、いつでもお気軽にお尋ねください。',
      category: '体験・入会'
    }
  ];

  const filteredItems = activeCategory === 'すべて'
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-brand-bg relative overflow-hidden border-b border-gray-100 scroll-mt-20">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-brand-sage-light/50 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-brand-sage/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-brand-olive/30"></span>
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
              FAQ
            </span>
            <span className="w-8 h-px bg-brand-olive/30"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            よくある質問
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-3">
            お客様からよくいただくご質問をまとめました。<br className="hidden sm:inline" />
            この他にも気になる点やご不安なことがございましたら、お気軽に公式LINEまたはお電話からお問い合わせください。
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(['すべて', 'サービス', '体験・入会', '食事・指導'] as const).map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenId(null); // Reset open accordion on category change
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-2xs cursor-pointer ${
                activeCategory === category
                  ? 'bg-brand-olive text-white shadow-md'
                  : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-brand-dark border border-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Accordion FAQ items */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100/80 hover:border-brand-olive/20 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleOpen(item.id)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Q Circle Indicator */}
                    <div className="w-7 h-7 rounded-full bg-brand-sage text-brand-olive flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">
                      Q
                    </div>
                    
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-block text-[9px] font-extrabold text-brand-olive bg-brand-sage px-2 py-0.5 rounded-sm">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-brand-dark text-sm md:text-base leading-snug group-hover:text-brand-olive transition duration-200">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  {/* Icon Indicator */}
                  <div className="shrink-0">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-brand-olive group-hover:border-brand-olive/20 transition-colors bg-gray-50"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-8 border-t border-gray-50 pt-5 bg-gray-50/10 flex gap-4">
                        {/* A Circle Indicator */}
                        <div className="w-7 h-7 rounded-full bg-brand-olive text-white flex items-center justify-center shrink-0 font-bold text-sm mt-0.5 shadow-sm">
                          A
                        </div>
                        <div className="flex-1 space-y-4">
                          <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed font-medium">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic Trust Note below FAQ */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2.5 bg-white/60 border border-gray-100 px-6 py-4 rounded-2xl shadow-xs">
            <span className="flex items-center gap-1.5 text-xs text-brand-olive font-bold">
              <ShieldCheck className="w-4 h-4 text-brand-olive shrink-0" />
              安心のプライベート空間
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <p className="text-xs text-gray-500 font-medium">
              気になることや個別のカウンセリングは、公式LINEから24時間お気軽にご質問いただけます。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
