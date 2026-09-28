import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Phone, 
  ExternalLink,
  Sparkles,
  ShieldCheck, 
  HelpCircle,
  Clock,
  Instagram,
  ChevronRight,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export default function BookingSystem() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background soft ambient blurs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-sage-light/60 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-sage/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-brand-olive font-bold text-xs uppercase tracking-widest bg-brand-sage px-3.5 py-1.5 rounded-full inline-block shadow-2xs">
            Reservation & Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            ご予約・お問い合わせ
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-3"></div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed pt-2">
            当ジムは他のお客様と重ならない<strong>完全プライベート空間・完全予約制</strong>です。<br className="hidden sm:inline" />
            公式LINE、またはお電話よりお気軽にご予約・ご相談ください。
          </p>
        </div>

        {/* 2 Main Contact Cards: LINE (Featured) & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto mb-12">
          
          {/* 1. Official LINE Card (Featured - 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 bg-white rounded-3xl p-7 sm:p-9 border-2 border-[#06C755] shadow-lg relative flex flex-col justify-between"
          >
            <span className="absolute -top-3.5 left-7 bg-[#06C755] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              <span>おすすめNo.1・スムーズ</span>
            </span>

            <div>
              <div className="flex items-center gap-3.5 mb-5 mt-1">
                <div className="w-14 h-14 rounded-2xl bg-[#06C755]/10 text-[#06C755] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-8 h-8 fill-current" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark font-serif">
                    公式LINEで予約・相談
                  </h3>
                  <p className="text-xs text-[#06C755] font-bold mt-0.5">
                    24時間いつでも送信OK・返信が一番早い方法です
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                友だち追加して、トーク画面から<strong>「体験レッスンを受けたい」「希望の日時」「気になるご相談」</strong>などをメッセージするだけ。トレーナーが空きスケジュールを確認の上、直接ご返信いたします。
              </p>

              {/* 3 Step Guide inside LINE card */}
              <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-gray-100 mb-6 space-y-2.5">
                <span className="text-[11px] font-bold text-brand-dark uppercase tracking-wider block">
                  LINE予約のかんたん3ステップ
                </span>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#06C755] text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                    <span>下のボタンから「パーソナルジムON」を友だち追加</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#06C755] text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                    <span>「お名前」「希望の日時やメニュー」をトークで送信</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#06C755] text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                    <span>トレーナーからの返信を確認して予約完了！</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <a
                href="https://lin.ee/TK9IMAU"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_line', { placement: 'contact_section_featured' })}
                className="w-full bg-[#06C755] hover:bg-[#05B34C] text-white font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>LINEで友だち追加して相談・予約</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-center text-[11px] text-gray-400 mt-2 font-mono">
                LINE公式ID: <span className="font-semibold text-gray-600">@908oaupn</span>
              </p>
            </div>
          </motion.div>

          {/* 2. Phone Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 bg-white rounded-3xl p-7 sm:p-9 border border-gray-200/80 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-sage text-brand-olive flex items-center justify-center mb-5">
                <Phone className="w-7 h-7" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-brand-dark font-serif mb-2">
                お電話でのご予約
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                直接お話しして日程を決めたい方や、今すぐ確認したい方はお気軽にお電話ください。
              </p>

              <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-gray-100 mb-6 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Clock className="w-4 h-4 text-brand-olive shrink-0" />
                  <span>受付時間：9:00〜21:00（不定休）</span>
                </div>
                <p className="text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200/60 leading-relaxed">
                  ※トレーニング指導中はお電話に出られない場合がございます。その際は着信履歴より折り返しご連絡いたします。
                </p>
              </div>
            </div>

            <div>
              <a
                href="tel:080-9289-5373"
                onClick={() => trackEvent('click_phone', { placement: 'contact_section' })}
                className="w-full bg-brand-olive hover:bg-brand-dark text-white font-bold py-4 px-6 rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                <span>080-9289-5373</span>
              </a>
              <p className="text-center text-[11px] text-gray-400 mt-2">
                スマートフォンの方はタップで発信できます
              </p>
              <div className="mt-4 pt-3.5 border-t border-gray-100 text-center">
                <a
                  href="https://www.instagram.com/personalgym.on?igsh=ZDVpOG1xMGlsOWp1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-rose-600 transition group"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium underline underline-offset-2">営業の方はInstagramのDMにお願いします。</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Reassurance Notice */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-olive" />
            <span>強引な勧誘や高額ローンの押し売りは一切いたしません</span>
          </div>
          <span className="hidden sm:inline text-gray-300">•</span>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-brand-olive" />
            <span>運動未経験・体力に自信がない方も大歓迎です</span>
          </div>
        </div>

      </div>
    </section>
  );
}
