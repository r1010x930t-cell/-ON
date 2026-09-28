import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  X, 
  Upload, 
  Maximize2, 
  Image as ImageIcon, 
  Check, 
  RotateCcw,
  Building2
} from 'lucide-react';
import { useGallery, GalleryCategory, GalleryItem } from '../lib/galleryStore';

export default function Gallery() {
  const { items, addItem, deleteItem, resetToDefault } = useGallery();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('すべて');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // New photo form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'トレーニング設備' | '完全個室空間' | '更衣スペース' | '外観・駐車場'>('トレーニング設備');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: GalleryCategory[] = ['すべて', 'トレーニング設備', '完全個室空間', '更衣スペース', '外観・駐車場'];

  const filteredItems = activeCategory === 'すべて'
    ? items
    : items.filter((item) => item.category === activeCategory);

  // Handle local image file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('画像ファイル（JPG、PNG、WEBPなど）を選択してください。');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('ファイルサイズは5MB以下にしてください。');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setNewImageUrl(result);
      setFormError(null);
    };
    reader.onerror = () => {
      setFormError('画像の読み込みに失敗しました。');
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError('写真のタイトルを入力してください。');
      return;
    }

    const finalImg = imagePreview || newImageUrl.trim();
    if (!finalImg) {
      setFormError('画像ファイルを選択するか、画像URLを入力してください。');
      return;
    }

    addItem({
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim() || 'パーソナルジムONの施設・設備写真です。',
      imageUrl: finalImg,
    });

    // Reset form
    setNewTitle('');
    setNewDescription('');
    setNewImageUrl('');
    setImagePreview(null);
    setFormError(null);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-sage/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-brand-sage-light/60 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-brand-olive font-bold text-xs uppercase tracking-widest bg-brand-sage px-3.5 py-1.5 rounded-full inline-block shadow-2xs">
            Facility & Equipment
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">
            施設・設備ギャラリー
          </h2>
          <div className="w-12 h-[2px] bg-brand-accent mx-auto rounded-full mt-3"></div>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-2 font-medium">
            自然光と木目が心地よい、完全予約制のプライベート空間。<br className="hidden sm:inline" />
            清潔感あふれるトレーニング環境と充実の設備をご紹介します。
          </p>
          <div className="inline-flex items-center gap-2 mt-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>※実際の施設写真は現在準備中（COMING SOON）です</span>
          </div>
        </div>

        {/* Category Filter Chips & Admin Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const count = cat === 'すべて' 
                ? items.length 
                : items.filter((i) => i.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-brand-olive text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Add / Manage Photos button for owner */}
          <button
            onClick={() => setShowAdminModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-brand-olive bg-brand-sage-light hover:bg-brand-sage border border-brand-olive/20 transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>写真の追加・管理</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Photo container */}
                <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-[0.88]"
                    loading="lazy"
                  />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-3.5 left-3.5 z-10 bg-brand-dark/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {item.category}
                  </span>

                  {/* COMING SOON Top-Right Tag */}
                  <span className="absolute top-3.5 right-3.5 z-10 bg-black/60 backdrop-blur-md text-white border border-white/30 text-[10px] tracking-widest font-black px-2.5 py-1 rounded-full uppercase shadow-xs">
                    COMING SOON
                  </span>

                  {/* COMING SOON Center Watermark Stamp */}
                  <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                    <div className="bg-brand-dark/80 backdrop-blur-md border border-white/40 px-5 py-2.5 rounded-2xl text-center shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                      <span className="block font-serif tracking-[0.25em] text-white text-xs sm:text-sm font-black uppercase">
                        COMING SOON
                      </span>
                      <span className="block text-[9px] text-brand-sage tracking-wider mt-0.5 font-medium">
                        写真準備中
                      </span>
                    </div>
                  </div>

                  {/* Hover Overlay with expand icon */}
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3 pointer-events-none">
                    <span className="w-8 h-8 rounded-full bg-white/90 text-brand-dark flex items-center justify-center shadow-md">
                      <Maximize2 className="w-3.5 h-3.5 text-brand-olive" />
                    </span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-1.5 group-hover:text-brand-olive transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-xs text-brand-olive font-semibold">
                    <span>詳しく見る</span>
                    <span className="text-gray-300">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-500">
              このカテゴリーには写真がまだ登録されていません。
            </p>
            <button
              onClick={() => setShowAdminModal(true)}
              className="mt-4 px-4 py-2 bg-brand-olive text-white text-xs font-bold rounded-full cursor-pointer hover:bg-brand-dark transition"
            >
              写真を追加する
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal (Zoomed Photo View) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition cursor-pointer"
                title="閉じる"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-4/3 w-full bg-black overflow-hidden relative flex items-center justify-center">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain brightness-90"
                />
                {/* Modal COMING SOON Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/25">
                  <div className="border border-white/50 bg-black/75 backdrop-blur-md px-6 py-3 rounded-2xl text-center shadow-2xl">
                    <span className="block font-serif tracking-[0.3em] text-white text-sm sm:text-base font-bold uppercase">
                      COMING SOON
                    </span>
                    <span className="block text-[10px] text-gray-300 tracking-wider mt-1 font-medium">
                      実際の施設写真は現在準備中です
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-brand-sage text-brand-olive px-3 py-1 rounded-full">
                    {selectedItem.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-brand-dark">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {selectedItem.description}
                </p>
                
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>完全予約制プライベートジム ON（千葉県茂原市）</span>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-brand-olive font-bold hover:underline cursor-pointer"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Photo Management & Upload Modal for Owner */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-sage text-brand-olive flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark">施設写真の追加・管理</h3>
                </div>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {successMsg && (
                <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>写真を追加しました！ギャラリーに即座に反映されています。</span>
                </div>
              )}

              {formError && (
                <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-semibold">
                  {formError}
                </div>
              )}

              {/* Add New Photo Form */}
              <form onSubmit={handleAddSubmit} className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    写真タイトル <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="例：スミスマシン・アタッチメント"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-olive"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      カテゴリー
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-brand-olive"
                    >
                      <option value="トレーニング設備">トレーニング設備</option>
                      <option value="完全個室空間">完全個室空間</option>
                      <option value="更衣スペース">更衣スペース</option>
                      <option value="外観・駐車場">外観・駐車場</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      写真の説明（任意）
                    </label>
                    <input
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="例：多角的に鍛えられる最新器具です"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-olive"
                    />
                  </div>
                </div>

                {/* Image Upload Area */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    写真の選択（端末のファイルまたはURL） <span className="text-rose-500">*</span>
                  </label>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 hover:border-brand-olive rounded-2xl p-4 text-center cursor-pointer transition bg-gray-50/60 hover:bg-brand-sage-light/30 mb-2"
                  >
                    <Upload className="w-6 h-6 text-brand-olive mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-gray-700">
                      クリックして画像ファイルを選択
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      JPG, PNG, WEBP（5MB以下）
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  <div className="relative flex items-center my-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="shrink-0 px-2 text-[10px] text-gray-400 font-semibold uppercase">または画像URLを入力</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => {
                      setNewImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-olive"
                  />
                </div>

                {/* Image Preview Box */}
                {imagePreview && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3">
                    <div className="w-16 h-12 rounded-lg bg-black overflow-hidden shrink-0">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-700 truncate">プレビュー表示中</p>
                      <p className="text-[10px] text-gray-400">追加ボタンを押すとギャラリーに登録されます</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setNewImageUrl('');
                      }}
                      className="text-gray-400 hover:text-rose-500 text-xs px-2 py-1"
                    >
                      クリア
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-olive hover:bg-brand-dark text-white font-bold text-xs sm:text-sm rounded-full transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>写真をギャラリーに追加する</span>
                </button>
              </form>

              {/* Registered Photos List & Delete option */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-gray-700">登録済み写真の管理（{items.length}件）</h4>
                  <button
                    onClick={() => {
                      if (window.confirm('初期写真セットに戻しますか？追加したカスタム写真もリセットされます。')) {
                        resetToDefault();
                      }
                    }}
                    className="text-[11px] text-gray-400 hover:text-brand-olive flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>初期写真に戻す</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                        <div className="truncate">
                          <p className="font-bold text-gray-800 truncate">{item.title}</p>
                          <span className="text-[10px] text-gray-400">{item.category}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer transition shrink-0"
                        title="この写真を削除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
