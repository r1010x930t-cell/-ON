import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'スタート',
      frequency: '週1回',
      frequencySub: '（60分 × 4/月）',
      perSession: '1回 7,700円',
      price: '30,800',
      description: 'まずは無理なく、週に1回から健康習慣を身につけたい方におすすめの基本プランです。',
      color: 'border-brand-accent/40 hover:border-brand-olive',
      badge: null,
    },
    {
      name: 'ベーシック',
      frequency: '週2回',
      frequencySub: '（60分 × 8/月）',
      perSession: '1回 7,425円',
      price: '59,400',
      description: '一番人気の標準プラン。効率よく理想の体づくりを目指し、生活習慣から改善していきます。',
      color: 'border-brand-olive border-2 bg-white ring-8 ring-brand-sage/40',
      badge: '人気 No.1',
    },
    {
      name: 'アクティブ',
      frequency: '週3回',
      frequencySub: '（60分 × 12/月）',
      perSession: '1回 7,150円',
      price: '85,800',
      description: '短期間で徹底的に成果を出したい方や、本格的なトレーニングを習慣づけたい方向けのプランです。',
      color: 'border-brand-accent/40 hover:border-brand-olive',
      badge: '本格ボディメイク',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
      {plans.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className={`flex flex-col justify-between bg-white rounded-[2rem] p-8 md:p-6 lg:p-8 border shadow-xs transition-all duration-300 relative group ${p.color}`}
        >
          {p.badge && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-olive text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md tracking-wider flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              {p.badge}
            </span>
          )}

          <div className="space-y-6">
            {/* Plan Header */}
            <div className="text-center border-b border-gray-100 pb-5">
              <h3 className="text-2xl font-bold text-brand-dark mb-1 font-serif">
                {p.name}
              </h3>
              <div className="text-brand-olive font-bold text-lg">
                {p.frequency}
              </div>
              <div className="text-gray-400 text-xs mt-0.5">
                {p.frequencySub}
              </div>
            </div>

            {/* Main Session / Pricing breakdown */}
            <div className="text-center space-y-1 py-2">
              <div className="text-gray-500 text-xs font-medium bg-brand-sage-light/80 py-1.5 px-3 rounded-full inline-block">
                {p.perSession}
              </div>
              <div className="pt-4 flex items-baseline justify-center text-brand-dark gap-1">
                <span className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                  {p.price}円
                </span>
                <span className="text-xs font-medium text-gray-500">（税込）</span>
              </div>
            </div>

            {/* Plan short intro */}
            <p className="text-gray-500 text-sm leading-relaxed text-center font-medium">
              {p.description}
            </p>

            {/* Feature Checkmarks list */}
            <ul className="space-y-3 pt-2 text-sm text-gray-600 font-medium">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                <span>完全プライベート個室空間</span>
              </li>
            </ul>
          </div>

          {/* Bottom action within card */}
          <div className="pt-8">
            <a
              href="#contact"
              className={`block w-full text-center py-3.5 px-4 rounded-full text-sm font-bold tracking-wide transition duration-200 shadow-xs cursor-pointer ${
                p.badge
                  ? 'bg-brand-olive hover:bg-brand-dark text-white font-bold'
                  : 'bg-brand-sage hover:bg-brand-accent/30 text-brand-dark font-bold'
              }`}
            >
              このプランで体験レッスン
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
