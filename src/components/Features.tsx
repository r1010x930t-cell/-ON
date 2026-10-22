import React from 'react';
import { Shirt, Smile, HeartHandshake, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const stances = [
    {
      num: '01',
      title: '服装はなんでもOK',
      badge: '続く理由 ① 気負わず手ぶらで来れる',
      description: '寝起きのままでも、お気に入りのカッコいいウェアでも、動きやすいラフなスウェットやTシャツでも大歓迎。格好にこだわる必要は一切ありません。ウェア準備の煩わしさがゼロだから、無理なく通い続けられます。',
      icon: Shirt,
      bg: 'bg-brand-sage text-brand-olive',
    },
    {
      num: '02',
      title: '体育会系の暑苦しさはゼロ',
      badge: '続く理由 ② プレッシャーなく楽しい',
      description: '「もっといける！」「気合いだ！」といったスパルタな雰囲気は一切ありません。運動が苦手な方や、これまでのジムで続かなかった方でも、安心して和やかに馴染める、優しく丁寧なコミュニケーションで楽しい時間を共有します。',
      icon: Smile,
      bg: 'bg-brand-sage-light text-brand-olive',
    },
    {
      num: '03',
      title: 'ただ隣で一緒に走るサポート',
      badge: '続く理由 ③ 自分のペースで習慣化',
      description: '急激な減量や厳しい食事制限などの「一過性のイベント」ではなく、あなたのその日の体調や気分にそっと寄り添い、無理なく「心地よい習慣」にすることを目指します。あなた専属の伴走者として、長く続く健康を支えます。',
      icon: HeartHandshake,
      bg: 'bg-brand-sage text-brand-olive',
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#F9F9F7] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-sage/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-brand-olive/30"></span>
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
              Features
            </span>
            <span className="w-8 h-px bg-brand-olive/30"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            パーソナルジムONの強みと安心スタンス
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed pt-3">
            ONは、高い目標へ無理に追い込む場所ではありません。<br />
            まずは無理なく、あなた自身のペースを「ON」にするための優しい約束です。
          </p>
        </div>

        {/* Core Strength Spotlight Banner: 継続率 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-olive/15 shadow-sm max-w-4xl mx-auto mb-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-sage/40 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 bg-brand-sage-light border border-brand-olive/20 px-3.5 py-1.5 rounded-full text-brand-olive font-bold text-xs tracking-wider mb-4 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-brand-accent" />
            <span>PERSONAL GYM ON 最大の強み</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight mb-4">
            このジム最大の強みは、<br className="block sm:hidden" />
            <span className="text-brand-olive relative inline-block mx-1">
              「継続率」
              <span className="absolute left-0 bottom-1 w-full h-2 bg-brand-accent/25 -z-10 rounded-xs"></span>
            </span>
            です。
          </h3>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium mb-6">
            パーソナルジムで最も重要なのは、過酷な追い込みではなく<strong className="text-brand-dark font-bold">「無理なく続けられること」</strong>。<br className="hidden sm:inline" />
            ONが多くの会員様に選ばれ、長年通い続けられている理由は、<br className="hidden sm:inline" />
            挫折を生まない居心地の良さと、一人ひとりの体調に寄り添うマンツーマンサポートにあります。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-brand-dark pt-1 border-t border-gray-100">
            <span className="bg-brand-bg px-4 py-2 rounded-xl border border-gray-200/70 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0" />
              <span>運動が苦手・挫折経験のある方大歓迎</span>
            </span>
            <span className="bg-brand-bg px-4 py-2 rounded-xl border border-gray-200/70 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0" />
              <span>厳しい食事制限・スパルタ指導ゼロ</span>
            </span>
            <span className="bg-brand-bg px-4 py-2 rounded-xl border border-gray-200/70 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0" />
              <span>「習慣化」に特化した優しいサポート</span>
            </span>
          </div>
        </motion.div>

        {/* Section Sub-heading for 3 Stances */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-bold text-brand-olive uppercase tracking-widest mb-1">
            3 Reassuring Stances
          </p>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark">
            なぜONは続けられるのか？ 高い継続率を支える「3つの安心スタンス」
          </h3>
        </div>

        {/* 3 Stances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {stances.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white hover:shadow-xl rounded-3xl p-8 border border-gray-100/80 hover:border-brand-olive/10 transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Large Decorative Number */}
                <div className="absolute right-8 top-6 text-5xl md:text-6xl font-bold font-mono text-gray-100 select-none group-hover:text-brand-sage/55 transition-colors duration-300">
                  {s.num}
                </div>

                <div className="space-y-6">
                  {/* Icon Bagde */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs ${s.bg}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title and Body */}
                  <div className="space-y-3 relative z-10">
                    <span className="text-[11px] font-bold text-brand-olive bg-brand-sage px-2.5 py-1 rounded-md inline-block">
                      {s.badge}
                    </span>
                    <h4 className="text-xl font-bold text-brand-dark group-hover:text-brand-olive transition-colors duration-200">
                      {s.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>

                {/* Accent line on hover */}
                <div className="w-0 group-hover:w-16 h-[2px] bg-brand-olive rounded-full mt-6 transition-all duration-300"></div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
