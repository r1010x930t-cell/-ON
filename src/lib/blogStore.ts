import { useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  category: 'トレーニング' | '食事管理' | 'お知らせ';
  date: string;
  author: string;
  summary: string;
  content: string[];
  readTime: string;
  iconType: 'sparkles' | 'apple' | 'heart' | 'book';
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'default-1',
    title: 'パーソナルジムONがオープン！オーナー宮間からのご挨拶',
    category: 'お知らせ',
    date: '2026.07.01',
    author: '宮間',
    summary: '千葉県茂原市に新しくオープンした完全予約制プライベートジムON。皆様の目標達成を全力でサポートするスタジオのコンセプトをご紹介します。',
    content: [
      'こんにちは！パーソナルジムONオーナーの宮間です。',
      'この度、千葉県茂原市法目に、完全予約制のプライベートジム「ON」をグランドオープンいたしました！',
      '「あなたはただ、ONに来るだけ。」をコンセプトに、一人一人にしっかりと寄り添った完全マンツーマンのトレーニングスタジオです。',
      '「一般的な24時間ジムに通ったけれどマシンの使い方が分からず挫折してしまった…」「運動を始めたいけれど、周囲の目が気になって集中できない…」「ダイエットしたいけれど、食事制限が厳しそうで一歩踏み出せない…」このようなお悩みはありませんか？',
      'パーソナルジムONは、他のお客様と重なることのない完全プライベートな空間。あなたのペースに合わせて、安全で効果的なプログラムをご提案します。強引な勧誘なども一切行いませんので、ぜひ一度、私たちのフレンドリーでアットホームな無料体験レッスンへお気軽に遊びに来てください！',
      '皆様にお会いできる日を、心より楽しみにしております。'
    ],
    readTime: '読了目安 2分',
    iconType: 'sparkles'
  },
  {
    id: 'default-2',
    title: '無理な食事制限はNG！リバウンドしない食事管理の基本ルール',
    category: '食事管理',
    date: '2026.07.08',
    author: '宮間',
    summary: 'ダイエットというと「極端な食事制限」をイメージしがちですが、それはリバウンドの元です。ONが推奨する健康的な食事管理のコツをお話しします。',
    content: [
      'トレーニングの効果を最大限に高め、かつリバウンドしない健やかな身体を作るためには、正しい食事の知識が不可欠です。',
      'よくある失敗例として、「炭水化物を一切抜く」「サラダとチキンしか食べない」といった極端な制限が挙げられます。これらは一時的に体重を落とせても、基礎代謝を下げて痩せにくく、リバウンドしやすい身体を作ってしまいます。',
      'パーソナルジムONでは、無理な食事制限は一切行いません。大切にしているのは「PFCバランス（プロテイン＝タンパク質、ファット＝脂質、カーボ＝炭水化物）」を意識した、続けやすい3食のバランスです。',
      '主食を完全に抜くのではなく、玄米やオートミールといった食物繊維が豊富な良質炭水化物に変えたり、高タンパク・低脂質のお肉や魚を賢く選択する。これだけの工夫で、お腹いっぱい食べながら体脂肪を効率よく燃焼することができます。',
      'ライフスタイルや好みに合わせて、一生モノの食事習慣を一緒に身につけていきましょう！'
    ],
    readTime: '読了目安 3分',
    iconType: 'apple'
  },
  {
    id: 'default-3',
    title: '週1回からでも変わる？パーソナルトレーニングを続ける驚きのメリット',
    category: 'トレーニング',
    date: '2026.07.15',
    author: '宮間',
    summary: '忙しくて毎日は通えない…そんな方へ。週1回のパーソナルトレーニングでも、なぜ十分な効果を期待できるのか、メソッドから解説します。',
    content: [
      '「ジムには毎日、あるいは週に何度も通わないと効果が出ないのでは？」と思われている方が非常に多いです。',
      'しかし、実は完全マンツーマンのパーソナルトレーニングであれば、週1回（月4回）の受講でも、十分に身体の変化を実感していただけます！',
      'その大きな理由は「トレーニング強度の最適化」と「正しいフォームの習得」にあります。',
      '1人でトレーニングを行うと、どうしても無意識に楽な動作になってしまいがちですが、トレーナーが並走することで、安全かつターゲットとする筋肉へ的確にアプローチする限界の一歩手前の強度を提供できます。週1回でも非常に密度の濃い運動が可能なのです。',
      'また、正しい運動をすることで筋肉量や基礎代謝が上がり、日常生活そのものの消費カロリーがアップします。これに週1回の良質な筋肉への刺激を合わせることで、着実に身体は変わっていきます。',
      '忙しい日常の中でも無理なく続けられるよう、最適な間隔と強度をサポートいたします！'
    ],
    readTime: '読了目安 3分',
    iconType: 'heart'
  }
];

const LOCAL_STORAGE_KEY = 'on_gym_blog_posts';

export function getStoredPosts(): BlogPost[] {
  if (typeof window === 'undefined') return DEFAULT_POSTS;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
    return DEFAULT_POSTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing stored blog posts, resetting to default', e);
    return DEFAULT_POSTS;
  }
}

export function saveStoredPosts(posts: BlogPost[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  // Dispatch a storage event to sync across open tabs/windows or states
  window.dispatchEvent(new Event('on_gym_blog_update'));
}

export function useBlogStore() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getStoredPosts());

    const handleUpdate = () => {
      setPosts(getStoredPosts());
    };

    window.addEventListener('on_gym_blog_update', handleUpdate);
    return () => {
      window.removeEventListener('on_gym_blog_update', handleUpdate);
    };
  }, []);

  const addPost = (newPost: Omit<BlogPost, 'id'>) => {
    const postWithId: BlogPost = {
      ...newPost,
      id: `post-${Date.now()}`
    };
    const updated = [postWithId, ...posts];
    saveStoredPosts(updated);
  };

  const updatePost = (id: string, updatedFields: Partial<Omit<BlogPost, 'id'>>) => {
    const updated = posts.map(post => 
      post.id === id ? { ...post, ...updatedFields } : post
    );
    saveStoredPosts(updated);
  };

  const deletePost = (id: string) => {
    const updated = posts.filter(post => post.id !== id);
    saveStoredPosts(updated);
  };

  const resetToDefault = () => {
    saveStoredPosts(DEFAULT_POSTS);
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    resetToDefault
  };
}
