import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { useEventById, useCategories, useDestinations, updateEvent } from '../../lib/hooks';
import Breadcrumb from '../../components/shared/Breadcrumb';
import type { Database } from '../../lib/types';

type EventUpdate = Database['public']['Tables']['events']['Update'];

export default function PortalEventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: event, loading } = useEventById(id);
  const { data: categories } = useCategories();
  const { data: destinations } = useDestinations();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '', short_description: '', description: '',
    category_id: '', destination_id: '',
    date_start: '', date_end: '', time_start: '', time_end: '',
    address: '', city: '', price: 0, tag: '',
  });

  useEffect(() => {
    if (!event) return;
    // we need to resolve category_id and destination_id from slugs
    const cat = (categories ?? []).find(c => c.slug === event.categorySlug);
    const dest = (destinations ?? []).find(d => d.slug === event.destinationSlug);
    setForm({
      title: event.title,
      short_description: event.shortDescription,
      description: event.description,
      category_id: cat?.id ?? '',
      destination_id: dest?.id ?? '',
      date_start: event.dateStart,
      date_end: event.dateEnd ?? '',
      time_start: event.timeStart,
      time_end: event.timeEnd ?? '',
      address: event.address,
      city: event.city,
      price: event.price,
      tag: event.tag ?? '',
    });
  }, [event, categories, destinations]);

  const set = (field: string, value: string | number) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError(null);

    try {
      const payload: EventUpdate = {
        title: form.title,
        short_description: form.short_description,
        description: form.description,
        category_id: form.category_id,
        destination_id: form.destination_id,
        date_start: form.date_start,
        date_end: form.date_end || null,
        time_start: form.time_start,
        time_end: form.time_end || null,
        address: form.address,
        city: form.city,
        price: form.price,
        tag: form.tag || null,
        status: 'pending', // resubmit for review
      };
      await updateEvent(id, payload);
      navigate(`/portal/eventos/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return <div className="text-center py-20 text-stone-500">Evento no encontrado</div>;
  }

  return (
    <div>
      <Breadcrumb items={[
        { label: 'Mis Eventos', to: '/portal' },
        { label: event.title, to: `/portal/eventos/${id}` },
        { label: 'Editar' },
      ]} />

      <h1 className="text-2xl font-display text-stone-900 mb-2">Editar Evento</h1>
      <p className="text-sm text-stone-500 mb-6">Al guardar, el evento volverá a estado <strong>Pendiente</strong> para revisión.</p>

      {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl mb-6 max-w-3xl">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-stone-200 p-6 space-y-5 max-w-3xl">
        <div>
          <label className="text-sm font-medium text-stone-700 mb-2 block">Título</label>
          <input type="text" required value={form.title} onChange={e => set('title', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="text-sm font-medium text-stone-700 mb-2 block">Descripción Corta</label>
          <input type="text" value={form.short_description} onChange={e => set('short_description', e.target.value)} maxLength={160}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="text-sm font-medium text-stone-700 mb-2 block">Descripción Completa</label>
          <textarea rows={5} value={form.description} onChange={e => set('description', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Categoría</label>
            <select value={form.category_id} onChange={e => set('category_id', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Seleccionar</option>
              {(categories ?? []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Destino</label>
            <select value={form.destination_id} onChange={e => set('destination_id', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Seleccionar</option>
              {(destinations ?? []).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Fecha Inicio</label>
            <input type="date" value={form.date_start} onChange={e => set('date_start', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Fecha Fin</label>
            <input type="date" value={form.date_end} onChange={e => set('date_end', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Hora Inicio</label>
            <input type="time" value={form.time_start} onChange={e => set('time_start', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Hora Fin</label>
            <input type="time" value={form.time_end} onChange={e => set('time_end', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Dirección</label>
            <input type="text" value={form.address} onChange={e => set('address', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Ciudad</label>
            <input type="text" value={form.city} onChange={e => set('city', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Precio (CLP)</label>
            <input type="number" min={0} value={form.price} onChange={e => set('price', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Etiqueta</label>
            <input type="text" value={form.tag} onChange={e => set('tag', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-stone-100">
          <button type="button" onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors">
            <ArrowLeft size={16} /> Cancelar
          </button>
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50">
            {saving ? 'Guardando...' : <><Save size={16} /> Guardar y Reenviar</>}
          </button>
        </div>
      </form>
    </div>
  );
}
