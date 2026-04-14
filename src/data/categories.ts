export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Tradición', slug: 'tradicion', icon: '🎭', color: 'bg-amber-50 text-amber-700' },
  { id: '2', name: 'Cultura', slug: 'cultura', icon: '🏛️', color: 'bg-purple-50 text-purple-700' },
  { id: '3', name: 'Aventura', slug: 'aventura', icon: '🏔️', color: 'bg-emerald-50 text-emerald-700' },
  { id: '4', name: 'Gastronomía', slug: 'gastronomia', icon: '🍷', color: 'bg-red-50 text-red-700' },
  { id: '5', name: 'Arte', slug: 'arte', icon: '🎵', color: 'bg-indigo-50 text-indigo-700' },
  { id: '6', name: 'Naturaleza', slug: 'naturaleza', icon: '🌿', color: 'bg-green-50 text-green-700' },
];
