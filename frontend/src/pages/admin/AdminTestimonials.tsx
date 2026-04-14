import { Star, Check, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTestimonials, deleteTestimonial } from '../../lib/hooks';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/types';

type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update'];

export default function AdminTestimonials() {
  const { data: testimonials, loading, refetch } = useTestimonials();
  const allTestimonials = testimonials ?? [];
  const [deleting, setDeleting] = useState<string | null>(null);
  const [acting, setActing] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setActing(id);
    await supabase.from('testimonials').update({ featured: true } as TestimonialUpdate).eq('id', id);
    refetch();
    setActing(null);
  };

  const handleReject = async (id: string) => {
    setActing(id);
    await supabase.from('testimonials').update({ featured: false } as TestimonialUpdate).eq('id', id);
    refetch();
    setActing(null);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await deleteTestimonial(deleting); refetch(); } catch { /* silent */ }
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-stone-900">Gestión de Testimonios</h1>
        <span className="text-sm text-stone-500">{allTestimonials.length} testimonios</span>
      </div>

      <div className="grid gap-4">
        {allTestimonials.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-xl border border-stone-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-medium text-stone-900 text-sm">{t.name}</h3>
                  <p className="text-xs text-stone-400">{t.city} · {t.type === 'tourist' ? 'Turista' : 'Anunciante'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-200'} />
                ))}
              </div>
            </div>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
              <button disabled={acting === t.id} onClick={() => handleApprove(t.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50">
                <Check size={14} /> Destacar
              </button>
              <button disabled={acting === t.id} onClick={() => handleReject(t.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors disabled:opacity-50">
                <X size={14} /> Quitar destacado
              </button>
              <button onClick={() => setDeleting(t.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors ml-auto">
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          </div>
        ))}
        {!allTestimonials.length && <p className="text-center text-sm text-stone-400 py-10">No hay testimonios</p>}
      </div>

      <ConfirmDialog
        open={!!deleting}
        title="Eliminar testimonio"
        message="¿Estás seguro de eliminar este testimonio?"
        confirmLabel="Eliminar"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
