import { useState, useEffect } from 'react';
import trainingRoomImg from '../assets/images/facility_training_room_1789996176663.jpg';
import dumbbellsImg from '../assets/images/facility_dumbbells_1789996188230.jpg';
import changingRoomImg from '../assets/images/facility_changing_room_1789996201096.jpg';
import parkingImg from '../assets/images/facility_parking_1789996226980.jpg';

export type GalleryCategory = 'すべて' | 'トレーニング設備' | '完全個室空間' | '更衣スペース' | '外観・駐車場';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'トレーニング設備' | '完全個室空間' | '更衣スペース' | '外観・駐車場';
  description: string;
  imageUrl: string;
  dateAdded?: string;
}

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'facility-1',
    title: '完全個室トレーニングエリア',
    category: '完全個室空間',
    description: '自然光と温かみのある木目を基調としたプライベート空間。他のお客様と重なることなく、あなただけの時間に集中していただけます。',
    imageUrl: trainingRoomImg,
  },
  {
    id: 'facility-2',
    title: 'マルチファンクショナルラック',
    category: 'トレーニング設備',
    description: 'スクワットやベンチプレス、懸垂まで全身を安全に鍛えられる高品質な多機能マシン。初心者から本格的なトレーニングまで対応します。',
    imageUrl: trainingRoomImg,
  },
  {
    id: 'facility-3',
    title: 'ダンベル＆フリーウェイト',
    category: 'トレーニング設備',
    description: '女性や運動初心者の方でも扱いやすい軽量ダンベルから高重量まで豊富に完備。一人ひとりの体力にぴったりの負荷を細かく調整できます。',
    imageUrl: dumbbellsImg,
  },
  {
    id: 'facility-5',
    title: '更衣スペース＆パウダーエリア',
    category: '更衣スペース',
    description: '清潔で広々としたお着替えスペース。大きめの鏡やハンガーを備え、お仕事帰りやお出かけ前にも安心してお着替えいただけます。',
    imageUrl: changingRoomImg,
  },
  {
    id: 'facility-6',
    title: '敷地内専用駐車場・外観',
    category: '外観・駐車場',
    description: '店舗の目の前に専用駐車場を完備。運転が苦手な方でもストレスなく停められる広々としたスペースでお待ちしております。',
    imageUrl: parkingImg,
  },
];

const STORAGE_KEY = 'on_gym_facility_gallery_v2';

export function getStoredGallery(): GalleryItem[] {
  if (typeof window === 'undefined') return DEFAULT_GALLERY_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GALLERY_ITEMS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.filter((item: GalleryItem) => item.id !== 'facility-4' && !item.title?.includes('カウンセリング＆休憩スペース'));
    }
    return DEFAULT_GALLERY_ITEMS;
  } catch (e) {
    console.error('Failed to read gallery from localStorage', e);
    return DEFAULT_GALLERY_ITEMS;
  }
}

export function saveGallery(items: GalleryItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('on_gym_gallery_updated'));
  } catch (e) {
    console.error('Failed to save gallery to localStorage', e);
  }
}

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>(() => getStoredGallery());

  useEffect(() => {
    const handleUpdate = () => {
      setItems(getStoredGallery());
    };
    window.addEventListener('on_gym_gallery_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('on_gym_gallery_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const addItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `custom-${Date.now()}`,
      dateAdded: new Date().toLocaleDateString('ja-JP'),
    };
    const next = [newItem, ...items];
    saveGallery(next);
    setItems(next);
  };

  const deleteItem = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    saveGallery(next);
    setItems(next);
  };

  const resetToDefault = () => {
    saveGallery(DEFAULT_GALLERY_ITEMS);
    setItems(DEFAULT_GALLERY_ITEMS);
  };

  return {
    items,
    addItem,
    deleteItem,
    resetToDefault,
  };
}
