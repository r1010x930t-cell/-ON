import React from 'react';
import { Shirt, Smile, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const stances = [
    {
      num: '01',
      title: '服装はなんでもOK',
      description: '寝起きのままでも、お気に入りのカッコいいウェアでも、動きやすいラフなスウェットやTシャツでも大歓迎。格好にこだわる必要は一切ありません。あなたが心地よいスタイルで、リラックスしてお越しください。',
      icon: Shirt,
      bg: 'bg-brand-sage text-brand-olive',
    },
    {
      num: '02',
      title: '体育会系の暑苦しさはゼロ',
      description: '「もっといける！」「気合いだ！」といったスパルタな雰囲気は一切ありません。運動が苦手な方や、これまでのジムで続かなかった方でも、安心して和やかに馴染める、優しく丁寧なコミュニケーションを心がけています。',
      icon: Smile,
      bg: 'bg-brand-sage-light text-brand-olive',
    },
    {
      num: '03',
      title: 'ただ隣で一緒に走るサポート',
      description: '急激な減量や厳しい食事制限などの「一過性のイベント」ではなく、あなたのその日の体調や気分にそっと寄り添い、無理なく「心地よい習慣」にすることを目指します。あなたのペースを一緒に守り続けます。',
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
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-brand-olive font-bold text-xs uppercase tracking-widest bg-brand-sage px-3.5 py-1 rounded-full inline-block">
            Our Stance
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            パーソナルジムONの <br className="block sm:hidden" />「3つの安心スタンス」
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed pt-2">
            ONは、高い目標へ追い込む場所ではありません。<br />
            まずは無理なく、あなた自身のペースを「ON」にするための優しい約束です。
          </p>
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
                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-olive transition-colors duration-200">
                      {s.title}
                    </h3>
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
