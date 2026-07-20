import React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, Heart } from 'lucide-react';

export default function Trainers() {
  const trainers = [
    {
      name: '宮間（みやま）',
      role: 'オーナー / パーソナルトレーナー',
      birthplace: '茂原市出身',
      image: 'https://i.ibb.co/qFYKT5R6/IMG-8946.jpg',
      tags: ['NSCA認定パーソナルトレーナー (NSCA-CPT)', 'トレーニング歴 15年以上'],
      bio: `運動科学・トレーニング理論の専門教育を修了後、パーソナルトレーナーとしての活動を開始いたしました。数年間、フリーとして経験を積んだのち、「培ってきたノウハウを活かして、地元の役に立ちたい」という想いから帰郷。現在は、地域の皆様の健康と身体づくりをサポートしております。
そんな私ですが、学生時代は部活に所属せず万年帰宅部。サッカーやバスケなどの、いわゆる人気スポーツが長続きしないタイプでした。実は、体育会系の暑苦しい雰囲気が今でも少し苦手です（笑）。
だからこそ、運動が苦手な方の気持ちが誰よりも分かります。こんな私でも変われたから大丈夫。あなたの「変わりたい」スイッチを、私が全力で押します！
あとは、それを少しずつ「習慣」にするだけ。
特別なことはしません。ただ隣で、あなたと一緒に走ります。`,
      accentColor: 'border-brand-olive/20 text-brand-olive bg-brand-sage-light',
      badge: 'Owner'
    },
    {
      name: '橋本（はしもと）',
      role: 'パーソナルトレーナー / セラピスト',
      birthplace: 'トレーナー',
      image: 'https://i.ibb.co/BVV2XLs5/60548381-15-C0-4522-9-E77-B858-E932-B854.png',
      tags: [
        'JCCA認定RS7アドバンストトレーナー',
        'リラクゼーションセラピスト',
        '食生活アドバイザー'
      ],
      bio: `スポーツ系の専門学校を卒業後、女性の身体の仕組みやケアについて学んできましたが……実は私自身、最初からストイックに運動ができたわけではありません（笑）。
特に女性の身体は、年齢やライフステージ、その日のバイオリズムによって驚くほど変化します。『なんだかやる気が出ないな』『今日は頑張れないな』……そんな日があって当然です。
だからこそ私のセッションでは、ただメニューをこなすのではなく、その日の『心と身体のコンディション』に徹底的に寄り添います。ガッツリ鍛える日もあれば、最近のむくみや疲れをおしゃべりしながら、ストレッチでじんわりほぐす日があってもいい。そんな『女性ならではの悩み』を何でも話せる、一番身近な存在でありたいと思っています。
運動が得意じゃなくても、体力がなくても大丈夫。『ジムに行くのがちょっと億劫だな』という日こそ、お気軽にいらしてください。帰る頃には、心も身体もふっと軽くなっているような、温かい時間をお届けします！`,
      accentColor: 'border-brand-accent/20 text-brand-olive bg-brand-sage-light',
      badge: 'Trainer'
    }
  ];

  return (
    <section id="trainers" className="py-20 bg-brand-sage-light relative overflow-hidden">
      {/* Visual flourishes */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-brand-sage/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-brand-olive font-bold text-xs uppercase tracking-widest bg-brand-sage px-3.5 py-1 rounded-full inline-block">
            Our Trainers
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            あなたに寄り添うトレーナー
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed pt-2">
            ONのトレーナーは「教え込む」のではなく、「隣を一緒に走る」存在です。<br />
            運動が苦手でも、あなたの毎日をそっとサポートします。
          </p>
        </div>

        {/* Trainers Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 max-w-5xl mx-auto">
          {trainers.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row gap-6 md:gap-8 items-start relative"
            >
              {/* Badge */}
              <div className="absolute right-6 top-6 text-xs font-bold text-brand-olive bg-brand-sage px-2.5 py-1 rounded-full uppercase tracking-wider">
                {t.badge}
              </div>

              {/* Trainer Profile Image Frame */}
              <div className="w-full md:w-44 shrink-0 aspect-square md:h-44 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative">
                <img
                  src={t.image}
                  alt={`トレーナー ${t.name}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Trainer Information details */}
              <div className="flex-1 space-y-4">
                <div>
                  <span className="text-xs font-bold text-brand-olive tracking-wider block mb-1">
                    {t.role}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-brand-dark">{t.name}</h3>
                    <span className="text-xs text-gray-400 font-semibold bg-gray-150 px-2 py-0.5 rounded-full">{t.birthplace}</span>
                  </div>
                </div>

                {/* Credentials / Qualifications */}
                <div className="space-y-1.5 border-t border-b border-gray-100 py-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-2">
                    <GraduationCap className="w-4 h-4 text-brand-olive" />
                    <span>資格・経歴</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-[11px] font-semibold text-gray-600 bg-[#F9F9F7] border border-gray-150 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Trainer Bio Quote */}
                <p className="text-gray-650 text-xs md:text-sm leading-relaxed font-medium whitespace-pre-line">
                  「{t.bio}」
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
