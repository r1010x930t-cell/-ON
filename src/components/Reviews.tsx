import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Reviews() {
  const reviews = [
    {
      name: '紫雨こころ 様',
      rating: 5,
      time: '3か月前',
      badge: '女性 / 駐車場完備が嬉しい',
      text: `基本のウェイトトレーニングだけでなく初心者でもできるケーブル種目の機械が充実しているのでほかのジムではない指導を受けることができるところがいいです！

今後ひとりでのトレーニングもケーブル種目をマスターすれば市営ジムでのトレーニングも不安がなくなりそうです！

また、男性女性のトレーナーがいるので毎回違うトレーニングができ、満遍なく鍛えることができるのもメリットだと思います。

近くのパーソナルジムだと駐車場がなく困っていたのでそういう心配もなくとっても通いやすいジムだと思います！

迷ってる方は体験だけでも行く価値はあるので是非！`,
    },
    {
      name: 'さじ 様',
      rating: 5,
      time: '1か月前',
      badge: '男女問わずオススメ',
      text: `月1回〜通えることができて茂原の他のパーソナルよりは気軽にやりやすいと思います。

自分に合ったやり方の筋トレを教えてもらうこともできますし、フォームの確認もして貰えるので男女問わずオススメです。`,
    },
    {
      name: 'H.K 様 (女性 / 40代 / 通い始めて10か月)',
      rating: 5,
      time: '2か月前',
      badge: '週1回のペースで継続中',
      text: `週1回のペースで通い始めて、もうすぐ10か月になります。最初の頃は体がとても硬く、痛みもあってストレッチしかできませんでしたが、今では普通の筋トレができるようになりました。

これまでピラティスやヨガなども試してきましたが、関節を痛めてしまうことがありました。今のジムでは、トレーナーの先生に細かく体の不調を共有しながら、無理をしない範囲で少しずつ続けていくという私の希望をしっかり理解してもらえて、とても安心して取り組めています。

腰痛や肩こりもなくなり、体が動くようになったことが本当にうれしいです。継続して通ってよかったと心から思っています。`,
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-white relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-sage-light/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-sage-light/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-brand-olive/30"></span>
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
              Reviews
            </span>
            <span className="w-8 h-px bg-brand-olive/30"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            会員様からのクチコミ
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed pt-3">
            実際にパーソナルジムONに通われている会員様から、<br className="hidden sm:block" />
            たくさんの嬉しいご感想・お声をいただいています。
          </p>
        </div>

        {/* Aggregate Score Badge */}
        <div className="max-w-md mx-auto bg-brand-sage-light/60 rounded-3xl p-6 mb-12 border border-brand-sage/80 flex flex-col sm:flex-row items-center justify-center gap-6 shadow-2xs">
          <div className="text-center">
            <div className="text-5xl font-serif font-bold text-brand-dark leading-none">5.0</div>
            <div className="text-xs text-gray-500 font-bold mt-1">Google クチコミ評価</div>
          </div>
          <div className="h-px sm:h-12 w-16 sm:w-px bg-brand-accent/30"></div>
          <div className="text-center sm:text-left space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs text-gray-600 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-olive" />
              <span>全員が星5つの高評価を頂いています</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-brand-bg rounded-3xl p-8 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-brand-sage text-6xl pointer-events-none group-hover:text-brand-accent/25 transition-colors duration-300">
                <MessageSquareQuote className="w-12 h-12 stroke-1" />
              </div>

              <div className="space-y-6">
                {/* User Info & Rating Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-brand-dark">
                      {r.name}
                    </h3>
                    <span className="text-xs text-gray-400 font-medium shrink-0">
                      {r.time}
                    </span>
                  </div>
                  <span className="inline-block text-[10px] text-brand-olive bg-brand-sage px-2 py-0.5 rounded-md font-bold">
                    {r.badge}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-gray-650 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-medium border-t border-brand-sage/40 pt-4">
                  {r.text}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="w-8 h-[2px] bg-brand-accent rounded-full mt-6 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Sincere Footer Message */}
        <div className="text-center mt-12">
          <p className="text-xs text-gray-400 font-bold">
            ※クチコミの一部は分かりやすさのために段落を整え掲載しています。Google上のリアルな評価に基づいています。
          </p>
        </div>

      </div>
    </section>
  );
}
