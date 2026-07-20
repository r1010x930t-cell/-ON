import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  useBlogStore, 
  BlogPost 
} from '../lib/blogStore';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  RefreshCw, 
  X, 
  FileText, 
  Save, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Eye,
  Key
} from 'lucide-react';

interface BlogAdminProps {
  onClose: () => void;
}

export default function BlogAdmin({ onClose }: BlogAdminProps) {
  const { posts, addPost, updatePost, deletePost, resetToDefault } = useBlogStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  
  // Editor States
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'トレーニング' as 'トレーニング' | '食事管理' | 'お知らせ',
    author: '宮間',
    summary: '',
    contentRaw: '', // paragraphs separated by double newline
    readTime: '読了目安 3分',
    iconType: 'sparkles' as 'sparkles' | 'apple' | 'heart' | 'book'
  });

  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'on2525') {
      setIsAuthenticated(true);
      setAuthError(false);
      showNotification('success', '認証に成功しました。管理者ダッシュボードを開きます。');
    } else {
      setAuthError(true);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleEditStart = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      author: post.author,
      summary: post.summary,
      contentRaw: post.content.join('\n\n'),
      readTime: post.readTime,
      iconType: post.iconType
    });
    setIsEditing(true);
  };

  const handleCreateStart = () => {
    setEditingPostId(null);
    setFormData({
      title: '',
      category: 'トレーニング',
      author: '宮間',
      summary: '',
      contentRaw: '',
      readTime: '読了目安 3分',
      iconType: 'sparkles'
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.summary.trim() || !formData.contentRaw.trim()) {
      showNotification('error', '必須項目（タイトル、要約、本文）をすべて入力してください。');
      return;
    }

    const paragraphs = formData.contentRaw
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const postData = {
      title: formData.title.trim(),
      category: formData.category,
      author: formData.author.trim() || 'スタッフ',
      summary: formData.summary.trim(),
      content: paragraphs,
      readTime: formData.readTime.trim() || '読了目安 3分',
      iconType: formData.iconType,
      date: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')
    };

    if (editingPostId) {
      updatePost(editingPostId, postData);
      showNotification('success', '記事を更新しました。');
    } else {
      addPost(postData);
      showNotification('success', '新規記事を公開しました。');
    }

    setIsEditing(false);
    setEditingPostId(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`「${title}」を削除してもよろしいですか？この操作は取り消せません。`)) {
      deletePost(id);
      showNotification('success', '記事を削除しました。');
    }
  };

  const handleReset = () => {
    if (confirm('ブログ記事をすべて初期のデモ記事にリセットしますか？ご自身で追加した記事は削除されます。')) {
      resetToDefault();
      showNotification('success', '初期記事にリセットしました。');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 relative overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-olive" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 bg-brand-sage-light/50 rounded-full flex items-center justify-center mx-auto text-brand-olive">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-dark">スタッフブログ管理者認証</h3>
            <p className="text-xs text-gray-500">
              新記事の公開や既存の編集を行うための管理パネルです。
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">
                パスコード
              </label>
              <input
                type="password"
                placeholder="on2525 と入力してください"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-hidden transition ${
                  authError 
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-brand-olive focus:ring-2 focus:ring-brand-sage-light'
                }`}
                autoFocus
              />
              {authError && (
                <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  パスコードが正しくありません。 (on2525)
                </p>
              )}
              <div className="mt-3 p-3 bg-brand-sage-light/30 rounded-xl border border-brand-sage/20 text-[11px] text-brand-olive/90 font-medium">
                💡 <span className="font-bold">テスト用パスコード:</span> <code className="bg-white/80 px-1.5 py-0.5 rounded border border-brand-sage/30 select-all">on2525</code> を入力してログインできます。
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-olive hover:bg-brand-olive/90 text-white font-extrabold text-sm transition shadow-md cursor-pointer"
            >
              ログインして管理画面を開く
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-dark/50 backdrop-blur-xs overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden relative"
      >
        {/* Top Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-xs font-bold"
              style={{
                backgroundColor: notification.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                color: notification.type === 'success' ? '#047857' : '#B91C1C',
                border: `1px solid ${notification.type === 'success' ? '#A7F3D0' : '#FECACA'}`
              }}
            >
              {notification.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <span>{notification.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Header */}
        <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-brand-olive font-extrabold text-[9px] uppercase tracking-widest bg-brand-sage px-2.5 py-1 rounded-full">
                microCMS & Firebase Simulator
              </span>
              <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                オンライン
              </span>
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-dark flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-olive" />
              ブログ記事マネージャー
            </h3>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isEditing && (
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-brand-olive transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
                title="初期デモデータにリセットする"
              >
                <RefreshCw className="w-4 h-4" />
                <span>データリセット</span>
              </button>
            )}
            
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-500 hover:text-brand-dark transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-white min-h-0">
          <AnimatePresence mode="wait">
            {isEditing ? (
              // ARTICLE EDITOR / FORM VIEW
              <motion.form
                key="editor-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSave}
                className="space-y-5"
              >
                <div className="bg-brand-sage-light/30 p-4 rounded-2xl border border-brand-sage/20 mb-4 flex items-center justify-between">
                  <p className="text-xs text-brand-olive font-medium">
                    🖋️ {editingPostId ? '既存の記事を編集しています。' : '新しく公開する記事を作成しています。'}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setEditingPostId(null); }}
                    className="text-xs text-gray-500 hover:text-brand-dark font-semibold underline cursor-pointer"
                  >
                    編集をキャンセル
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        記事タイトル <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="例：【初心者向け】パーソナルジム選びの重要ポイント"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-brand-olive focus:ring-2 focus:ring-brand-sage-light"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">
                          カテゴリー
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-brand-olive"
                        >
                          <option value="トレーニング">トレーニング</option>
                          <option value="食事管理">食事管理</option>
                          <option value="お知らせ">お知らせ</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">
                          著者名
                        </label>
                        <input
                          type="text"
                          placeholder="宮間"
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-brand-olive"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">
                          読了目安時間
                        </label>
                        <input
                          type="text"
                          placeholder="例：読了目安 3分"
                          value={formData.readTime}
                          onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-brand-olive"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">
                          アイコンデザイン
                        </label>
                        <select
                          value={formData.iconType}
                          onChange={(e) => setFormData({ ...formData, iconType: e.target.value as any })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-brand-olive"
                        >
                          <option value="sparkles">✨ お知らせ（きらきら）</option>
                          <option value="apple">🍏 食事管理（リンゴ）</option>
                          <option value="heart">💖 トレーニング（ハート）</option>
                          <option value="book">📖 一般コラム（本）</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        記事の要約（SNSや一覧に表示されます） <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="記事全体の概略や見どころを1〜2文で記述してください。クリック率を高める工夫がおすすめです。"
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-brand-olive focus:ring-2 focus:ring-brand-sage-light resize-none"
                      />
                    </div>
                  </div>

                  {/* Body Content raw input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 flex items-center justify-between">
                      <span>記事本文（改行を2回挟むと新しい段落になります） <span className="text-red-500">*</span></span>
                      <span className="text-[10px] text-gray-400">段落区切り: [Enter]を2回</span>
                    </label>
                    <textarea
                      required
                      rows={12}
                      placeholder={`こんにちは！ONトレーナーの宮間です。\n\nこちらに本文の第一段落を記入します。\n\n改行キーを２回押すことで、このように新しく読みやすい段落ブロックに分割されます。\n\nパーソナルジムONでは、お客様が自分のペースで楽しく続けられることを最も大切にしています！`}
                      value={formData.contentRaw}
                      onChange={(e) => setFormData({ ...formData, contentRaw: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-mono focus:outline-hidden focus:border-brand-olive focus:ring-2 focus:ring-brand-sage-light resize-none h-[calc(100%-1.5rem)]"
                    />
                  </div>
                </div>

                {/* Editor Actions Footer */}
                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setEditingPostId(null); }}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 text-xs font-bold transition cursor-pointer"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-brand-olive hover:bg-brand-olive/90 text-white text-xs font-extrabold transition shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>記事を保存・公開する</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              // MAIN DASHBOARD LIST VIEW
              <motion.div
                key="dashboard-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {/* Control bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500 pl-2">
                    合計記事数: <strong className="text-brand-dark">{posts.length}</strong> 件
                  </span>
                  
                  <button
                    onClick={handleCreateStart}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-olive hover:bg-brand-olive/90 text-white text-xs font-extrabold transition flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>新規ブログ記事を作成</span>
                  </button>
                </div>

                {/* Posts Admin Grid / List */}
                <div className="space-y-3">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <div 
                        key={post.id}
                        className="p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 shadow-3xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition duration-200"
                      >
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-brand-olive bg-brand-sage px-2 py-0.5 rounded-md">
                              {post.category}
                            </span>
                            <span className="text-[10px] text-gray-400 font-semibold">{post.date}</span>
                            <span className="text-[10px] text-gray-400 font-medium">| {post.author}</span>
                          </div>
                          <h4 className="font-bold text-brand-dark text-sm leading-snug line-clamp-1">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-400 line-clamp-1">
                            {post.summary}
                          </p>
                        </div>

                        {/* Actions group */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => handleEditStart(post)}
                            className="p-2 rounded-xl border border-gray-200 hover:bg-brand-sage-light hover:border-brand-sage hover:text-brand-olive text-gray-500 transition-all cursor-pointer"
                            title="編集する"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="p-2 rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-500 transition-all cursor-pointer"
                            title="削除する"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 rounded-2xl border border-dashed border-gray-200 text-gray-400 space-y-2">
                      <FileText className="w-10 h-10 mx-auto text-gray-300 stroke-[1.5]" />
                      <p className="text-sm font-semibold">公開された記事がありません</p>
                      <button
                        onClick={handleCreateStart}
                        className="text-xs text-brand-olive hover:underline font-bold"
                      >
                        最初の記事を作成する
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic footer branding */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-[10px] text-gray-400 font-semibold shrink-0">
          パーソナルジムON スタッフブログCMS管理システム（安全なローカル永続化対応）
        </div>
      </motion.div>
    </div>
  );
}
