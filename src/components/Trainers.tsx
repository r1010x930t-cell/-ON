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
      tags: ['NSCA認定パーソナルトレーナー (NSCA-CPT)', 'トレーニング指導歴 10年以上'],
      bio: `運動科学・トレーニング理論の専門教育を修了後、パーソナルトレーナーとしての活動を開始いたしました。数年間、フリーとして経験を積んだのち、「培ってきたノウハウを活かして、地元の役に立ちたい」という想いから帰郷。現在は、地域の皆様の健康と身体づくりをサポートしております。
そんな私ですが、学生時代は部活に所属せず万年帰宅部。サッカーやバスケなどの、いわゆる人気スポーツが長続きしないタイプでした。実は、体育会系の暑苦しい雰囲気が今でも少し苦手です（笑）。
だからこそ、運動が苦手な方の気持ちが誰よりも分かります。こんな私でも変われたから大丈夫。あなたの「変わりたい」スイッチを、私が全力で押します！
あとは、それを少しずつ「習慣」にするだけ。
特別なことはしません。ただ隣で、あなたと一緒に走ります。`
    },
    {
      name: '橋本（はしもと）',
      role: 'パーソナルトレーナー / セラピスト',
      birthplace: '',
      image: 'https://i.ibb.co/spYv1YyK/IMG-0855.jpg',
      tags: [
        'JCCA認定RS7アドバンストトレーナー',
        'リラクゼーションセラピスト',
        '食生活アドバイザー'
      ],
      bio: `スポーツ系の専門学校を卒業後、女性の身体の仕組みやケアについて学んできましたが……実は私自身、最初からストイックに運動ができたわけではありません（笑）。
特に女性の身体は、年齢やライフステージ、その日のバイオリズムによって驚くほど変化します。『なんだかやる気が出ないな』『今日は頑張れないな』……そんな日があって当然です。
だからこそ私のセッションでは、ただメニューをこなすのではなく、その日の『心と身体のコンディション』に徹底的に寄り添います。ガッツリ鍛える日もあれば、最近のむくみや疲れをおしゃべりしながら、ストレッチでじんわりほぐす日があってもいい。そんな『女性ならではの悩み』を何でも話せる、一番身近な存在でありたいと思っています。
運動が得意じゃなくても、体力がなくても大丈夫。『ジムに行くのがちょっと億億だな』という日こそ、お気軽にいらしてください。帰る頃には、心も身体もふっと軽くなっているような、温かい時間をお届けします！`
    }
  ];

  return (
    <section id="trainers" className="py-20 bg-brand-sage-light relative overflow-hidden">
      {/* Visual flourishes */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-brand-sage/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-brand-olive/30"></span>
            <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-brand-olive">
              Trainers
            </span>
            <span className="w-8 h-px bg-brand-olive/30"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            あなたに寄り添うトレーナー
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed pt-3">
            ONのトレーナーは「教え込む」のではなく、「隣を一緒に走る」存在です。<br />
            運動が苦手でも、あなたの毎日をそっとサポートします。
          </p>
        </div>

        {/* Trainers Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {trainers.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Profile Header: Photo + Info */}
                <div className="flex flex-col sm:flex-row gap-5 md:gap-6 items-center sm:items-start mb-6">
                  {/* Trainer Profile Image Frame */}
                  <div className="w-36 h-36 sm:w-36 sm:h-36 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative mx-auto sm:mx-0">
                    <img
                      src={t.image}
                      alt={`トレーナー ${t.name}`}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Trainer Information details */}
                  <div className="flex-1 space-y-3 text-left w-full">
                    <div>
                      <span className="text-xs font-bold text-brand-olive tracking-wider block mb-1">
                        {t.role}
                      </span>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h3 className="text-2xl font-bold text-brand-dark">{t.name}</h3>
                        {t.birthplace && (
                          <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-2 py-0.5 rounded-full">
                            {t.birthplace}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Credentials / Qualifications */}
                    <div className="space-y-1.5 pt-1 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-1">
                        <GraduationCap className="w-4 h-4 text-brand-olive shrink-0" />
                        <span>資格・経歴</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {t.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-[11px] font-semibold text-gray-600 bg-[#F9F9F7] border border-gray-200 px-2.5 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trainer Bio Message (Spans full width under photo and profile) */}
                <div className="bg-[#FAF9F5] rounded-2xl p-5 border border-brand-sage/30 relative">
                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium whitespace-pre-line">
                    「{t.bio}」
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
