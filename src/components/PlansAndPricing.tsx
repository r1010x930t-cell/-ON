import React from 'react';
import { motion } from 'motion/react';
import { Gift, CheckCircle2, Coins } from 'lucide-react';
import Pricing from './Pricing';

export default function PlansAndPricing() {
  return (
    <section id="plans-and-trial" className="py-24 bg-brand-bg relative overflow-hidden border-b border-gray-100">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-sage-light rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-sage/60 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-brand-olive font-bold text-xs uppercase tracking-widest bg-brand-sage px-3.5 py-1.5 rounded-full inline-block shadow-xs">
            Plan ＆ Trial
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            料金プラン ＆ 無料体験のご案内
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-2">
            「運動を習慣にしたいけれど、続けられるか不安…」という方も大歓迎です。<br />
            まずはスタジオの雰囲気を感じられる「毎月限定の無料体験」からお気軽にお越しください。
          </p>
        </div>

        {/* Pricing & Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          
          {/* Campaign Card (Trial) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 border border-brand-olive/15 shadow-md shadow-brand-olive/5 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Limit Badge */}
            <div className="absolute -right-12 top-6 bg-brand-accent text-white text-[11px] font-bold py-1 px-12 rotate-45 text-center shadow-xs">
              毎月先着2名限定
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-sage text-brand-olive flex items-center justify-center">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">無料体験レッスン</h3>
                  <p className="text-xs text-brand-olive font-semibold">カウンセリング込み 60分</p>
                </div>
              </div>

              <div className="border-b border-gray-100 pb-5 mb-5 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-serif font-bold text-brand-olive">0円</span>
                  <span className="text-xs text-gray-400 line-through font-medium">通常 3,000円（税込）</span>
                </div>
                <p className="text-xs text-brand-dark bg-brand-sage-light px-3 py-2 rounded-xl font-medium inline-block">
                  ※今月の残り枠は、LINEまたはお電話にてお気軽にお問い合わせください。
                </p>
              </div>

              <ul className="space-y-3.5 text-xs text-gray-600 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                  <span>あなただけの完全オーダーメイドメニューを設計</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                  <span>強引な勧誘やセールスは一切行いません</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                  <span>寝起きのラフな服装のまま受講可能</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-50 text-[11px] text-gray-400 font-semibold">
              ※マンツーマン指導のため、枠に限りがございます。ご了承ください。
            </div>
          </motion.div>

          {/* Admission Fee Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-50 text-brand-olive flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">入会金</h3>
                  <p className="text-xs text-gray-400 font-semibold">ご入会時にのみ頂戴いたします</p>
                </div>
              </div>

              <div className="border-b border-gray-100 pb-5 mb-5 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">20,000円</span>
                  <span className="text-xs text-gray-500 font-medium">（税込）</span>
                </div>
                <p className="text-xs text-gray-400 font-semibold">
                  ※継続的なトレーニングをサポートするための基本初期費用です。
                </p>
              </div>

              <ul className="space-y-3.5 text-xs text-gray-600 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                  <span>入会後のプランは回数券や定額プランからお選びいただけます</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                  <span>ライフスタイルに合わせた最適なプランを一緒にご相談</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-50 text-[11px] text-gray-400 font-semibold">
              ※ご入会前のカウンセリング時に各プランを詳細にご説明いたします。
            </div>
          </motion.div>

        </div>

        {/* Course Plans (Start, Basic, Active) */}
        <div id="pricing" className="mt-24 relative scroll-mt-24">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark tracking-tight relative inline-block">
              コースのご案内
              {/* Hand-drawn underline squiggle style */}
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-amber-400/60 rounded-full"></span>
            </h3>
            <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed pt-2">
              ONは、分かりやすい定額・月謝制。<br />
              一人ひとりに寄り添い、丁寧に伴走します。
            </p>
          </div>
          <Pricing />
        </div>

      </div>
    </section>
  );
}
