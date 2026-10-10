import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  ChevronLeft, 
  Flame, 
  Target, 
  Calendar,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  options: {
    label: string;
    description: string;
    weight: 'light' | 'standard' | 'intensive';
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: '普段の運動習慣や経験は？',
    subtitle: '直感で当てはまるものを選んでください',
    icon: HelpCircle,
    options: [
      {
        label: '運動はほぼゼロ・久しぶりの運動',
        description: '運動が苦手でも無理なくできるペースから始めたい',
        weight: 'light',
      },
      {
        label: '自己流でたまにやるが続かない',
        description: 'プロのトレーナーと一緒に習慣化を目指したい',
        weight: 'standard',
      },
      {
        label: '定期的に体を動かすのが好き',
        description: '正しいフォームで効率よく成果を最大化したい',
        weight: 'intensive',
      },
    ],
  },
  {
    id: 2,
    title: 'ジムに通う主な目的・理想は？',
    subtitle: 'あなたが叶えたい一番の目標を教えてください',
    icon: Target,
    options: [
      {
        label: '運動不足解消・肩こりや腰痛の予防',
        description: '日常生活を快適にして、軽やかな身体をつくりたい',
        weight: 'light',
      },
      {
        label: '無理なく引き締めて健康的に減量',
        description: 'リバウンドせず、服がきれいに着こなせる体型にしたい',
        weight: 'standard',
      },
      {
        label: '短期間でしっかりボディメイク',
        description: '筋肉をつけて引き締まったメリハリボディを目指したい',
        weight: 'intensive',
      },
    ],
  },
  {
    id: 3,
    title: '無理なく通えそうな頻度は？',
    subtitle: 'お仕事やプライベートの都合に合わせて選んでください',
    icon: Calendar,
    options: [
      {
        label: '週1回ペース（月4回）',
        description: '忙しい日常の隙間時間で、息抜き感覚で通いたい',
        weight: 'light',
      },
      {
        label: '週2回ペース（月8回）',
        description: '定期的に通って、着実に体型や体調の変化を感じたい',
        weight: 'standard',
      },
      {
        label: '週3回ペース（月12回）',
        description: '集中して通い、最速で理想の結果を手に入れたい',
        weight: 'intensive',
      },
    ],
  },
];

interface DiagnosisResult {
  planName: string;
  badge: string;
  frequency: string;
  monthlyPrice: string;
  perSessionPrice: string;
  matchScore: number;
  headline: string;
  description: string;
  recommendedFor: string[];
}

export default function PlanDiagnosis() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleSelectOption = (weight: 'light' | 'standard' | 'intensive') => {
    const nextAnswers = [...answers, weight];
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate outcome
      setIsAnalyzing(true);
      setTimeout(() => {
        const calculatedResult = calculatePlan(nextAnswers);
        setResult(calculatedResult);
        setIsAnalyzing(false);
        trackEvent('diagnosis_complete', {
          recommended_plan: calculatedResult.planName,
        });
      }, 500);
    }
  };

  const calculatePlan = (weights: string[]): DiagnosisResult => {
    const countStandard = weights.filter((w) => w === 'standard').length;
    const countIntensive = weights.filter((w) => w === 'intensive').length;
    const countLight = weights.filter((w) => w === 'light').length;

    // Highest frequency priority from Q3, or weighted score
    const q3 = weights[2];

    if (q3 === 'intensive' || countIntensive >= 2) {
      return {
        planName: '月12回コース（週3回）',
        badge: '最速で結果を出したい方へ',
        frequency: '週3回（月12回）',
        monthlyPrice: '85,800円',
        perSessionPrice: '7,150円 / 回',
        matchScore: 96,
        headline: '短期間で圧倒的な変化を目指すあなたに最適！',
        description: '1回あたり7,150円と最もお得な単価で、手厚いマンツーマントレーニングを受けられます。集中して取り組むことで、最速で理想のボディラインを手に入れることができます。',
        recommendedFor: [
          '短期集中で確実な成果を出したい方',
          '筋力アップ・本格的なボディメイクを目指す方',
          '1回あたりの受講料をお得に抑えたい方',
        ],
      };
    } else if (q3 === 'standard' || countStandard >= 1 || (countLight === 1 && countStandard === 1)) {
      return {
        planName: '月8回コース（週2回）',
        badge: '★ 当店人気No.1 ★',
        frequency: '週2回（月8回）',
        monthlyPrice: '59,400円',
        perSessionPrice: '7,425円 / 回',
        matchScore: 98,
        headline: '効果の実感と続けやすさのベストバランス！',
        description: '運動効果が最も出やすく、リバウンド防止と身体の引き締まりを実感しやすい王道プランです。ONに通われる会員様の多くがこのプランで楽しく成果を出しています。',
        recommendedFor: [
          '健康的に引き締まった体型を目指したい方',
          '無理なく着実に身体の変化を感じたい方',
          'まずは一番人気のスタンダードプランから始めたい方',
        ],
      };
    } else {
      return {
        planName: '月4回コース（週1回）',
        badge: 'マイペースに続けたい方へ',
        frequency: '週1回（月4回）',
        monthlyPrice: '30,800円',
        perSessionPrice: '7,700円 / 回',
        matchScore: 95,
        headline: '忙しい日常と両立できる、無理のない習慣化プラン！',
        description: '週に1回、ご自身のペースで身体をリセット。仕事や家事で忙しい方でも無理なく通え、運動習慣を心地よく定着させることができます。',
        recommendedFor: [
          '運動初心者でマイペースに始めたい方',
          '仕事や家事と両立して週1回通いたい方',
          '肩こり・腰痛の予防や日々のリフレッシュをしたい方',
        ],
      };
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
    setIsAnalyzing(false);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setAnswers((prev) => prev.slice(0, -1));
    }
  };

  const scrollToContact = () => {
    trackEvent('click_trial_from_diagnosis', { plan: result?.planName });
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-olive/15 shadow-sm relative overflow-hidden mb-16">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-sage/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-sage-light/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="w-6 h-px bg-brand-olive/30"></span>
          <span className="text-xs font-medium tracking-[0.28em] uppercase text-brand-olive">
            Plan Diagnosis
          </span>
          <span className="w-6 h-px bg-brand-olive/30"></span>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-amber-100/80 text-amber-900 border border-amber-300/60 px-3.5 py-1 rounded-full text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>3秒かんたん・無料</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark tracking-tight">
          あなたにぴったりのプラン診断
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 font-medium pt-1">
          たった3つの質問をタップするだけ。あなたの生活スタイルに合う最適プランをご提案します。
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="max-w-2xl mx-auto">
        
        {/* Analyzing Spinner State */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center space-y-4"
          >
            <div className="w-12 h-12 border-3 border-brand-sage border-t-brand-olive rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-bold text-brand-dark">
              あなたに最適なプランを分析中...
            </p>
          </motion.div>
        )}

        {/* Diagnosis Questions */}
        {!isAnalyzing && !result && (
          <div>
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-4 text-xs font-semibold text-gray-400">
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevStep}
                    className="text-gray-500 hover:text-brand-olive flex items-center gap-0.5 cursor-pointer text-xs"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>前の質問</span>
                  </button>
                )}
                <span>質問 {currentStep + 1} / {QUESTIONS.length}</span>
              </div>
              <span className="text-brand-olive font-bold">
                {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% 完了
              </span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8 overflow-hidden">
              <div
                className="bg-brand-olive h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            {/* Current Question Block */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <h4 className="text-lg sm:text-xl font-bold text-brand-dark">
                    Q{QUESTIONS[currentStep].id}. {QUESTIONS[currentStep].title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {QUESTIONS[currentStep].subtitle}
                  </p>
                </div>

                {/* Option Buttons */}
                <div className="space-y-3">
                  {QUESTIONS[currentStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.weight)}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border border-gray-200 hover:border-brand-olive bg-white hover:bg-brand-sage-light/30 transition-all duration-200 cursor-pointer group flex items-center justify-between shadow-2xs hover:shadow-xs"
                    >
                      <div className="space-y-1 pr-3">
                        <p className="text-sm sm:text-base font-bold text-brand-dark group-hover:text-brand-olive transition-colors">
                          {opt.label}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          {opt.description}
                        </p>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-brand-olive group-hover:text-white flex items-center justify-center text-gray-400 shrink-0 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Diagnosis Result Card */}
        {!isAnalyzing && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Top Match Card */}
            <div className="bg-brand-sage-light/60 border-2 border-brand-olive/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="bg-brand-olive text-white text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                  {result.badge}
                </span>
                <span className="text-xs font-bold text-brand-olive bg-white px-3 py-1 rounded-full shadow-2xs flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>あなたとのマッチ度: {result.matchScore}%</span>
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-gray-500">あなたにおすすめのプラン</p>
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark">
                  {result.planName}
                </h4>
                <p className="text-sm font-bold text-brand-olive">
                  {result.headline}
                </p>
              </div>

              {/* Pricing Box */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-olive/15 mb-6 flex flex-col sm:flex-row items-baseline justify-between gap-2">
                <div>
                  <span className="text-xs text-gray-400 font-semibold block">月額料金（税込）</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-bold font-serif text-brand-dark">
                      {result.monthlyPrice}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">/ 月</span>
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs text-gray-400 font-semibold block">1回あたり</span>
                  <span className="text-sm font-bold text-brand-olive">
                    {result.perSessionPrice}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium mb-6">
                {result.description}
              </p>

              {/* Recommended Points */}
              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-gray-700">こんな方におすすめ：</p>
                <ul className="space-y-1.5">
                  {result.recommendedFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reassurance Notice */}
              <div className="p-3.5 bg-white/80 rounded-xl border border-brand-olive/10 text-xs text-gray-600 font-medium text-center">
                ※どのプランも、まずは <strong className="text-brand-dark font-bold">体験レッスン（当日入会で0円）</strong> で実際の指導や雰囲気を試してからご入会いただけます。
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-brand-olive hover:bg-brand-dark text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>まずは体験レッスンを申し込む</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="https://lin.ee/TK9IMAU"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_line', { placement: 'diagnosis_result' })}
                className="w-full sm:w-auto bg-[#06C755] hover:bg-[#05B34C] text-white font-bold px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>LINEでプランを相談する</span>
              </a>

              <button
                onClick={handleReset}
                className="text-xs text-gray-500 hover:text-brand-olive font-semibold flex items-center gap-1.5 py-2 cursor-pointer transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>もう一度診断する</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
