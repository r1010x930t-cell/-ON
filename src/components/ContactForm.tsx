import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Sparkles, ShieldAlert } from 'lucide-react';

export default function ContactForm() {
  return (
    <section id="contact" className="py-24 bg-brand-bg relative overflow-hidden border-b border-gray-100 scroll-mt-24">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-sage-light rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-sage/60 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-brand-olive font-bold text-xs uppercase tracking-widest bg-brand-sage px-3.5 py-1.5 rounded-full inline-block shadow-xs mb-2">
            Contact ＆ Reservation
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-accent" />
            <span>ご予約・お問い合わせ方法</span>
          </h3>
          <p className="text-xs md:text-sm text-gray-500 font-semibold pt-1">
            当ジムは完全予約制です。LINEまたはお電話にて、お気軽にご連絡ください。
          </p>
        </div>

        {/* Contact Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* LINE Contact Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-md flex flex-col justify-between items-stretch text-center group"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#06C755]/10 text-[#06C755] rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-105 duration-300">
                <MessageCircle className="w-10 h-10 fill-current" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#06C755] bg-[#06C755]/5 px-3 py-1 rounded-full uppercase tracking-wider">
                  簡単・24時間受付中
                </span>
                <h4 className="text-xl font-bold text-brand-dark">LINEで予約・相談</h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                  メッセージでいつでも手軽にご連絡いただけます。空き枠の確認や、ちょっとしたご質問も大歓迎です。
                </p>
              </div>

              {/* QR Code section for Desktop Users */}
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="bg-white p-2.5 rounded-2xl border border-gray-100 inline-block shadow-2xs">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Flin.ee%2FTK9IMAU"
                    alt="LINE QR Code"
                    className="w-32 h-32 md:w-36 md:h-36"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-bold mt-2">スマホでのスキャンはこちら</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <a 
                href="https://lin.ee/TK9IMAU" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#06C755] hover:bg-[#05B34C] text-white font-bold py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>LINEで友だち追加する</span>
              </a>
              <p className="text-[10px] text-gray-400 font-semibold leading-normal">
                ※友だち追加後、メッセージで「体験希望」またはご質問内容をお送りください。
              </p>
            </div>
          </motion.div>

          {/* Phone Contact Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between items-stretch text-center group"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 bg-brand-sage-light text-brand-olive rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-105 duration-300">
                <Phone className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-brand-olive bg-brand-sage px-3 py-1 rounded-full uppercase tracking-wider">
                  電話受付 8:00 〜 21:00
                </span>
                <h4 className="text-xl font-bold text-brand-dark">お電話で予約・相談</h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                  「直接話して日程を決めたい」「今日体験してみたい」など、お急ぎの方はお電話にてご連絡ください。
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a 
                href="tel:07035230189" 
                className="w-full bg-brand-olive hover:bg-brand-dark text-white font-bold py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                <span className="font-mono text-base tracking-wide">070-3523-0189</span>
              </a>
              <div className="space-y-2">
                <p className="text-[10px] text-gray-400 font-semibold leading-normal flex items-start gap-1.5 justify-center max-w-xs mx-auto text-left">
                  <ShieldAlert className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                  <span>トレーニング指導中はお電話に出られない場合がございます。その際はLINEをお試しいただくか、留守電にメッセージをお願いいたします。</span>
                </p>
                <p className="text-[11px] text-rose-600 font-bold leading-normal text-center bg-rose-50/80 border border-rose-200/60 rounded-xl py-2 px-3">
                  ※営業の方はInstagramのDMもしくわ<a href="mailto:personalgym.on@gmail.com" className="underline hover:opacity-80">personalgym.on@gmail.com</a>までお願いします
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
