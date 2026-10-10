import React from 'react';
import { motion } from 'motion/react';
import { DoorOpen, ClipboardCheck, Dumbbell, Coffee, Check, Sparkles, ShieldCheck, Car, MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export default function TrialFlow() {
  const steps = [
    {
      step: '01',
      title: 'ご来店・お着替え',
      subtitle: '動きやすい服装でお気軽にお越しください',
      description: '敷地内にある広い駐車場にお車を停めて、そのままリラックスしてお越しください。更衣スペースを完備しておりますので、お着替えをお持ちいただきスタジオ内でお着替えいただくことも可能です。',
      icon: DoorOpen,
      tags: ['更衣スペース完備', '広々駐車場完備', '完全個室空間'],
    },
    {
      step: '02',
      title: '丁寧なカウンセリング',
      subtitle: 'お悩みや理想の姿をじっくりヒアリング',
      description: '「運動経験がなくて不安」「産後太りを解消したい」「肩こりや腰痛を軽くしたい」など、今のお悩みや目標をお聞かせください。現在の運動習慣や体調に合わせて、あなただけのメニューをその場で組み立てます。',
      icon: ClipboardCheck,
      tags: ['お悩み相談', '無理な目標設定なし', '運動歴ゼロでも安心'],
    },
    {
      step: '03',
      title: 'オーダーメイド体験トレーニング',
      subtitle: 'あなたの体力に合わせた優しい指導',
      description: 'スパルタ指導や体育会系のプレッシャーは一切ありません！姿勢のチェックや簡単なストレッチから始め、無理のない強度で身体を動かします。トレーナーが常に隣で優しくサポートするので、運動が苦手な方でも楽しめます。',
      icon: Dumbbell,
      tags: ['完全個室マンツーマン', '正しいフォーム指導', 'きつすぎない強度'],
    },
    {
      step: '04',
      title: '振り返り＆ご案内',
      subtitle: '強引な勧誘・営業は一切ありません',
      description: 'お疲れ様でした！冷たいお水で一息つきながら、本日の身体の癖やこれからの改善ポイントをお伝えします。料金プランのご案内もいたしますが、強引な勧誘は一切行いませんので、ご自宅でゆっくりご検討いただけます。',
      icon: Coffee,
      tags: ['身体のフィードバック', '強引な勧誘なし', '当日入会で体験料0円'],
    },
  ];

  const reassuringPoints = [
    {
      icon: ShieldCheck,
      title: '無理な勧誘・セールスゼロ',
      desc: 'お客様のお気持ちを最優先にしています。「一度家に持ち帰って考えたい」という場合も大歓迎です。',
    },
    {
      icon: Car,
      title: '停めやすい敷地内駐車場完備',
      desc: '運転が得意でない方でも安心の広々とした駐車場を完備。茂原市内外からお車でスムーズにお越しいただけます。',
    },
  ];

  const scrollToContact = () => {
    trackEvent('click_trial_cta', { placement: 'trial_flow' });
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="trial-flow" className="py-24 bg-[#FAFAF8] relative overflow-hidden border-b border-gray-100 scroll-mt-24">
      {/* Background ambient accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-sage/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-sage-light/60 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-brand-olive/30"></span>
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
              Trial Flow
            </span>
            <span className="w-8 h-px bg-brand-olive/30"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            体験レッスン 当日の流れ
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-3"></div>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-3 font-medium">
            「どんなことをするの？」「きつくない？」と不安な方もご安心ください。<br className="hidden sm:inline" />
            運動初心者の方でも笑顔で楽しめる、当日のステップをご紹介します。
          </p>
        </div>

        {/* Chronological Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {steps.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300 relative flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-brand-olive tracking-tight">
                      STEP {s.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-brand-sage/60 text-brand-olive flex items-center justify-center shadow-2xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
                      {s.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-olive">
                      {s.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium mb-5">
                    {s.description}
                  </p>
                </div>

                {/* Feature Chips */}
                <div className="pt-4 border-t border-gray-50 flex flex-wrap gap-2">
                  {s.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-brand-olive shrink-0" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3 Reassuring Points Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-brand-sage-light/70 border border-brand-olive/15 rounded-3xl p-8 sm:p-10 mb-12 shadow-2xs"
        >
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-brand-olive tracking-wider bg-white px-3 py-1 rounded-full shadow-2xs inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ONが選ばれる安心サポート</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mt-2">
              初めての方もリラックスしてお越しいただけます
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {reassuringPoints.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-xs border border-brand-olive/10 space-y-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-brand-sage text-brand-olive flex items-center justify-center">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-brand-dark">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA to Book Trial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={scrollToContact}
              className="bg-brand-olive hover:bg-brand-dark text-white font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg cursor-pointer"
            >
              <span>まずは体験レッスンを申し込む</span>
            </button>
            <a
              href="https://lin.ee/TK9IMAU"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_line', { placement: 'trial_flow_cta' })}
              className="bg-[#06C755] hover:bg-[#05B34C] text-white font-bold px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-current" />
              <span>LINEですぐに日程を相談する</span>
            </a>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            ※体験レッスン（カウンセリング込）：3,000円（当日入会で0円）
          </p>
        </motion.div>

      </div>
    </section>
  );
}
