import React from 'react';
import { motion } from 'motion/react';
import { Gift, CheckCircle2, Coins, Sparkles, ChevronRight } from 'lucide-react';
import Pricing from './Pricing';
import PlanDiagnosis from './PlanDiagnosis';

export default function PlansAndPricing() {
  return (
    <section id="plans-and-trial" className="py-24 bg-brand-bg relative overflow-hidden border-b border-gray-100">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-sage-light rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-sage/60 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-brand-olive/30"></span>
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
              Pricing & Trial
            </span>
            <span className="w-8 h-px bg-brand-olive/30"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            料金プラン ＆ 体験レッスンのご案内
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-3">
            ON最大の強みは<strong className="text-brand-dark font-bold">「高い継続率」</strong>。無理なく続けられる安心の料金設計です。<br />
            まずはスタジオの雰囲気を感じられる「体験レッスン」からお気軽にお越しください。
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
            <div className="absolute -right-14 top-6 bg-brand-accent text-white text-[11px] font-bold py-1 px-14 rotate-45 text-center shadow-xs">
              当日入会で0円
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-sage text-brand-olive flex items-center justify-center">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">体験レッスン</h3>
                  <p className="text-xs text-brand-olive font-semibold">カウンセリング込み</p>
                </div>
              </div>

              <div className="border-b border-gray-100 pb-5 mb-5 space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">3,000円</span>
                  <span className="text-xs text-gray-500 font-medium">（税込）</span>
                </div>
                <div className="bg-brand-sage-light border border-brand-olive/20 px-3.5 py-2 rounded-xl font-bold text-brand-olive text-xs md:text-sm inline-flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>当日入会で体験費 0円！</span>
                </div>
                <p className="text-xs text-gray-400 font-medium pt-1">
                  ※体験レッスンの空き枠状況は、LINEまたはお電話にてお気軽にお問い合わせください。
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
                  <span>完全個室で人目を気にせずリラックス受講</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-50 space-y-3">
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-trial-flow'));
                  const element = document.getElementById('trial-flow');
                  if (element) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    window.scrollTo({
                      top: elementPosition - offset,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="w-full bg-brand-sage hover:bg-brand-sage-light text-brand-dark font-bold text-xs py-2.5 px-4 rounded-xl border border-brand-olive/20 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>体験レッスンの当日の流れを見る</span>
                <ChevronRight className="w-3.5 h-3.5 text-brand-olive" />
              </button>
              <p className="text-[11px] text-gray-400 font-semibold text-center">
                ※マンツーマン指導のため、1日の枠に限りがございます。ご了承ください。
              </p>
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

        {/* 3-Second Quick Plan Diagnosis Tool */}
        <div id="diagnosis" className="scroll-mt-24">
          <PlanDiagnosis />
        </div>

        {/* Course Plans (Start, Basic, Active) */}
        <div id="pricing" className="mt-20 relative scroll-mt-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-brand-olive/30"></span>
              <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
                Pricing
              </span>
              <span className="w-8 h-px bg-brand-olive/30"></span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark tracking-tight">
              月額コースのご案内
            </h3>
            <div className="w-10 h-[2px] bg-brand-accent mx-auto rounded-full mt-3"></div>
            <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed pt-3">
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
