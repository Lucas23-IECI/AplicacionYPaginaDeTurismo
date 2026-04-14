import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/types';
import { useCategories, useDestinations } from '../../lib/hooks';

interface EventForm {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  category_id: string;
  destination_id: string;
  price: number;
  currency: string;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  tag: string;
  featured: boolean;
  spotlight: boolean;
  status: string;
}

const blank: EventForm = {
  title: '', slug: '', short_description: '', description: '',
  category_id: '', destination_id: '', price: 0, currency: 'CLP',
  date_start: '', date_end: '', time_start: '09:00', time_end: '',
  address: '', city: '', lat: 0, lng: 0, tag: '', featured: false,
  spotlight: false, status: 'draft',
};

export default function AdminEventEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: categories } = useCategories();
  const { data: destinations } = useDestinations();

  const [form, setForm] = useState<EventForm>(blank);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error: err } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single<Database['public']['Tables']['events']['Row']>();
      if (err || !data) { setError('Evento no encontrado'); setLoading(false); return; }
      setForm({
        title: data.title,
        slug: data.slug,
        short_description: data.short_description,
        description: data.description,
        category_id: data.category_id,
        destination_id: data.destination_id,
        price: data.price,
        currency: data.currency,
        date_start: data.date_start,
        date_end: data.date_end ?? '',
        time_start: data.time_start,
        time_end: data.time_end ?? '',
        address: data.address,
        city: data.city,
        lat: data.lat,
        lng: data.lng,
        tag: data.tag ?? '',
        featured: data.featured,
        spotlight: data.spotlight,
        status: data.status,
      });
      setLoading(false);
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Database['public']['Tables']['events']['Insert'] = {
      title: form.title,
      slug: form.slug,
      short_description: form.short_description,
      description: form.description,
      category_id: form.category_id,
      destination_id: form.destination_id,
      price: form.price,
      currency: form.currency,
      date_start: form.date_start,
      date_end: form.date_end || null,
      time_start: form.time_start,
      time_end: form.time_end || null,
      address: form.address,
      city: form.city,
      lat: form.lat,
      lng: form.lng,
      tag: form.tag || null,
      featured: form.featured,
      spotlight: form.spotlight,
      status: form.status as Database['public']['Tables']['events']['Row']['status'],
      advertiser_id: null,
    };

    if (id) {
      const { error: err } = await supabase.from('events').update(payload).eq('id', id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase.from('events').insert(payload);
      if (err) { setError(err.message); setSaving(false); return; }
    }

    setSaving(false);
    navigate('/admin/eventos');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20';
  const labelCls = 'block text-sm font-medium text-stone-700 mb-1';

  return (
    <div>
      <button onClick={() => navigate('/admin/eventos')} className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 mb-4">
        <ArrowLeft size={16} /> Volver a eventos
      </button>
      <h1 className="text-2xl font-display text-stone-900 mb-8">{id ? 'Editar Evento' : 'Nuevo Evento'}</h1>

      {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Título</label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Slug</label>
            <input name="slug" value={form.slug} onChange={handleChange} required className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Descripción corta</label>
          <input name="short_description" value={form.short_description} onChange={handleChange} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Descripción completa</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={5} className={inputCls} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Categoría</label>
            <select name="category_id" value={form.category_id} onChange={handleChange} required className={inputCls}>
              <option value="">Seleccionar…</option>
              {(categories ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Destino</label>
            <select name="destination_id" value={form.destination_id} onChange={handleChange} required className={inputCls}>
              <option value="">Seleccionar…</option>
              {(destinations ?? []).map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Fecha inicio</label>
            <input type="date" name="date_start" value={form.date_start} onChange={handleChange} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Fecha fin</label>
            <input type="date" name="date_end" value={form.date_end} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Hora inicio</label>
            <input type="time" name="time_start" value={form.time_start} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Hora fin</label>
            <input type="time" name="time_end" value={form.time_end} onChange={handleChange} className={inputCls} />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Ciudad</label>
            <input name="city" value={form.city} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Dirección</label>
            <input name="address" value={form.address} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Precio (CLP)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} className={inputCls} />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Tag / Etiqueta</label>
            <input name="tag" value={form.tag} onChange={handleChange} className={inputCls} placeholder="Ej: trending, nuevo" />
          </div>
          <div>
            <label className={labelCls}>Estado</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
              <option value="draft">Borrador</option>
              <option value="pending">Pendiente</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded border-stone-300" />
            Destacado
          </label>
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input type="checkbox" name="spotlight" checked={form.spotlight} onChange={handleChange} className="rounded border-stone-300" />
            Spotlight
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50">
            <Save size={16} /> {saving ? 'Guardando…' : 'Guardar'}
          </button>
          <button type="button" onClick={() => navigate('/admin/eventos')} className="px-6 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
