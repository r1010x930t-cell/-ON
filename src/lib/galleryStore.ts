import { useState, useEffect } from 'react';
import privateRoomImg from '../assets/images/facility_private_room_custom.jpg';
import rackImg from '../assets/images/facility_rack_IMG_1296.jpg';
import cableImg from '../assets/images/facility_cable_IMG_1297.jpg';
import inbodyImg from '../assets/images/facility_inbody_IMG_1294.jpg';
import waterImg from '../assets/images/facility_water_IMG_1293.jpg';
import skeletonImg from '../assets/images/facility_skeleton_IMG_1299.jpg';

export type GalleryCategory =
  | 'すべて'
  | '完全個室空間'
  | '設備'
  | 'カウンセリング・更衣室'
  | 'セッション風景'
  | '外観・駐車場';

export interface GalleryItem {
  id: string;
  title: string;
  category: '完全個室空間' | '設備' | 'カウンセリング・更衣室' | 'セッション風景' | '外観・駐車場';
  description: string;
  imageUrl: string;
  dateAdded?: string;
}

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'facility-1',
    title: '完全個室トレーニングエリア',
    category: '完全個室空間',
    description: '完全プライベートな貸切トレーニング空間。パワーラック、スミスマシン、ケーブルマシン、フリーウェイト、ストレッチ用品まで完備。他人の目を一切気にせず集中できます。',
    imageUrl: privateRoomImg,
  },
  {
    id: 'facility-2',
    title: 'ラック',
    category: '設備',
    description: '業務用マシンなので安心してトレーニングできます。スクワットやベンチプレスなど全身を安全に鍛えられる多機能マシン。初心者でも怪我なく正しい軌道でトレーニングできます。',
    imageUrl: rackImg,
  },
  {
    id: 'facility-3',
    title: 'ケーブルマシン',
    category: '設備',
    description: '軌道が自由で関節に優しく、あらゆる角度から全身を効率的に鍛えられる高品質なケーブルマシン。女性のヒップアップや二の腕引き締め、姿勢改善にも最適です。',
    imageUrl: cableImg,
  },
  {
    id: 'facility-4',
    title: '体組成測定もできます。',
    category: '設備',
    description: '高精度な体組成計で体重だけでなく体脂肪率や筋肉量、左右バランスまで測定。科学的なデータに基づいて日々の身体の変化を可視化し、最適なトレーニングをサポートします。',
    imageUrl: inbodyImg,
  },
  {
    id: 'facility-5',
    title: 'サブスク',
    category: '設備',
    description: 'お水のサブスクあります。',
    imageUrl: waterImg,
  },
  {
    id: 'facility-6',
    title: 'おむかえ',
    category: '設備',
    description: 'マスコット骸骨がお待ちしてます。',
    imageUrl: skeletonImg,
  },
];

const STORAGE_KEY = 'on_gym_facility_gallery_v9';

export function getStoredGallery(): GalleryItem[] {
  if (typeof window === 'undefined') return DEFAULT_GALLERY_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GALLERY_ITEMS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
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
