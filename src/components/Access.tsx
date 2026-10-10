import React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Car, Phone, Navigation } from 'lucide-react';

export default function Access() {
  const mapIframeSrc = "https://maps.google.com/maps?q=千葉県茂原市法目701-1(パーソナルジムON)&z=17&output=embed";

  return (
    <section id="access" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-brand-olive/30"></span>
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
              Access & Hours
            </span>
            <span className="w-8 h-px bg-brand-olive/30"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            営業時間・アクセス
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed pt-3">
            「パーソナルジムON」は、千葉県茂原市にございます。<br />
            広々とした駐車場を完備しておりますので、お車でも安心してお越しください。
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Info Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Business Hours Card */}
              <div className="bg-gray-50/70 p-6 rounded-2xl border border-gray-100/80 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-sage text-brand-olive flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-dark text-sm md:text-base">営業時間</h4>
                  <p className="text-2xl font-bold text-brand-dark tracking-tight">8:00 〜 21:00</p>
                  <p className="text-xs text-gray-400 font-semibold">不定休 / 完全予約制</p>
                </div>
              </div>

              {/* Address Location Card */}
              <div className="bg-gray-50/70 p-6 rounded-2xl border border-gray-100/80 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-sage-light text-brand-olive flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-dark text-sm md:text-base">所在地・住所</h4>
                  <p className="text-sm md:text-base text-gray-800 font-medium leading-relaxed">
                    〒299-4113 <br />
                    千葉県茂原市法目701-1
                  </p>
                  <a 
                    href="https://maps.google.com/?q=千葉県茂原市法目701-1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-olive font-bold hover:underline pt-2"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Google Maps アプリで開く
                  </a>
                </div>
              </div>

              {/* Parking Card */}
              <div className="bg-gray-50/70 p-6 rounded-2xl border border-gray-100/80 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-sage text-brand-olive flex items-center justify-center shrink-0 shadow-xs">
                  <Car className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-dark text-sm md:text-base">駐車場について</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    敷地内に、広々とした専用駐車場を完備しています。お車でお気軽にお越しいただけます。
                  </p>
                </div>
              </div>

            </div>

            {/* Reassurance text */}
            <div className="bg-brand-sage/40 p-5 rounded-2xl border border-brand-olive/10 text-xs text-brand-dark leading-relaxed">
              <strong className="block text-brand-dark font-bold mb-1">【寝起き・ラフな服装でのご来店大歓迎】</strong>
              ONは、茂原市郊外の閑静な場所に位置する隠れ家プライベートスタジオです。人の目を気にせず、ラフな格好でスッとお越しいただける環境を用意してお待ちしております。
            </div>
          </div>

          {/* Interactive Google Map Panel */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs h-full min-h-[350px] lg:min-h-[450px] relative flex flex-col justify-between"
            >
              {/* Map container */}
              <div className="flex-1 w-full h-full min-h-[300px] relative">
                <iframe
                  title="パーソナルジムON アクセスマップ"
                  src={mapIframeSrc}
                  className="absolute inset-0 w-full h-full border-0 rounded-t-3xl"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                ></iframe>
              </div>

              {/* Map Footer Label */}
              <div className="bg-gray-50 p-4 border-t border-gray-100 text-center flex items-center justify-between px-6">
                <span className="text-xs text-gray-500 font-semibold">茂原市法目701-1 アクセスマップ</span>
                <span className="text-xs text-brand-olive font-bold">広々駐車場完備</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
