import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Tag, MapPin, Calendar, DollarSign, Image, Send, ArrowLeft, ArrowRight, Upload, X } from 'lucide-react';
import { useCategories, useDestinations, createEvent, insertEventImages } from '../../lib/hooks';
import { useAuth } from '../../lib/auth';
import { useAdvertiserProfile } from '../../lib/hooks';
import { uploadEventImage } from '../../lib/storage';
import type { Database } from '../../lib/types';

type EventInsert = Database['public']['Tables']['events']['Insert'];

const steps = ['Información', 'Ubicación y Fecha', 'Precio e Imágenes', 'Revisión'];

function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function PortalNewEvent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useAdvertiserProfile(user?.id);
  const { data: categories } = useCategories();
  const { data: destinations } = useDestinations();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    title: '',
    short_description: '',
    description: '',
    category_id: '',
    destination_id: '',
    date_start: '',
    date_end: '',
    time_start: '',
    time_end: '',
    address: '',
    city: '',
    lat: -36.62,
    lng: -72.10,
    price: 0,
    currency: 'CLP',
    tag: '',
  });

  const set = (field: string, value: string | number) => setForm(prev => ({ ...prev, [field]: value }));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };

  const removeFile = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const canNext = () => {
    if (step === 0) return form.title && form.short_description && form.description && form.category_id;
    if (step === 1) return form.destination_id && form.date_start && form.time_start && form.address && form.city;
    if (step === 2) return true;
    return true;
  };

  const handleSubmit = async () => {
    if (!profile) { setError('No se encontró tu perfil de anunciante'); return; }
    setSaving(true);
    setError(null);

    try {
      const payload: EventInsert = {
        title: form.title,
        slug: slugify(form.title),
        short_description: form.short_description,
        description: form.description,
        category_id: form.category_id,
        destination_id: form.destination_id,
        advertiser_id: profile.id,
        date_start: form.date_start,
        date_end: form.date_end || null,
        time_start: form.time_start,
        time_end: form.time_end || null,
        address: form.address,
        city: form.city,
        lat: form.lat,
        lng: form.lng,
        price: form.price,
        currency: form.currency,
        tag: form.tag || null,
        featured: false,
        spotlight: false,
        status: 'pending',
      };

      const event = await createEvent(payload);

      // Upload images
      if (files.length > 0) {
        const imageRecords = [];
        for (let i = 0; i < files.length; i++) {
          const url = await uploadEventImage(files[i], event.id);
          imageRecords.push({ event_id: event.id, image_url: url, display_order: i });
        }
        await insertEventImages(imageRecords);
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear evento');
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <Send size={28} className="text-green-600" />
        </div>
        <h2 className="text-xl font-display text-stone-900 mb-2">¡Evento Enviado!</h2>
        <p className="text-sm text-stone-500 max-w-md mb-6">Tu evento ha sido enviado para revisión. Recibirás una notificación cuando sea aprobado.</p>
        <button onClick={() => navigate('/portal')} className="text-primary font-semibold hover:underline">Volver a Mis Eventos</button>
      </div>
    );
  }

  const selectedCat = (categories ?? []).find(c => c.id === form.category_id);
  const selectedDest = (destinations ?? []).find(d => d.id === form.destination_id);

  return (
    <div>
      <h1 className="text-2xl font-display text-stone-900 mb-2">Crear Nuevo Evento</h1>
      <p className="text-sm text-stone-500 mb-8">Completa los pasos para publicar tu experiencia.</p>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 max-w-3xl">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i <= step ? 'bg-primary text-white' : 'bg-stone-200 text-stone-500'}`}>
              {i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i <= step ? 'text-stone-900' : 'text-stone-400'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-primary' : 'bg-stone-200'}`} />}
          </div>
        ))}
      </div>

      {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl mb-6 max-w-3xl">{error}</div>}

      <div className="bg-white rounded-xl border border-stone-200 p-6 max-w-3xl">
        {/* Step 0 — Info */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2"><FileText size={14} /> Título *</label>
              <input type="text" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Ej: Festival de la Vendimia 2026"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Descripción Corta *</label>
              <input type="text" value={form.short_description} onChange={e => set('short_description', e.target.value)}
                placeholder="Una línea que resuma tu evento" maxLength={160}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <p className="text-xs text-stone-400 mt-1">{form.short_description.length}/160</p>
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Descripción Completa *</label>
              <textarea rows={5} value={form.description} onChange={e => set('description', e.target.value)}
                placeholder="Describe tu evento en detalle..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2"><Tag size={14} /> Categoría *</label>
              <select value={form.category_id} onChange={e => set('category_id', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">Seleccionar categoría</option>
                {(categories ?? []).map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Step 1 — Location & Date */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2"><MapPin size={14} /> Destino *</label>
              <select value={form.destination_id} onChange={e => set('destination_id', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">Seleccionar destino</option>
                {(destinations ?? []).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2"><MapPin size={14} /> Dirección *</label>
                <input type="text" value={form.address} onChange={e => set('address', e.target.value)} placeholder="Av. Principal 123"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 mb-2 block">Ciudad *</label>
                <input type="text" value={form.city} onChange={e => set('city', e.target.value)} placeholder="Ej: Chillán"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2"><Calendar size={14} /> Fecha Inicio *</label>
                <input type="date" value={form.date_start} onChange={e => set('date_start', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2"><Calendar size={14} /> Fecha Fin</label>
                <input type="date" value={form.date_end} onChange={e => set('date_end', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-stone-700 mb-2 block">Hora Inicio *</label>
                <input type="time" value={form.time_start} onChange={e => set('time_start', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 mb-2 block">Hora Fin</label>
                <input type="time" value={form.time_end} onChange={e => set('time_end', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Price & Images */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2"><DollarSign size={14} /> Precio (CLP)</label>
                <input type="number" min={0} value={form.price} onChange={e => set('price', Number(e.target.value))} placeholder="0 para gratuito"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2"><Tag size={14} /> Etiqueta</label>
                <input type="text" value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="Ej: Nuevo, Familiar"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2"><Image size={14} /> Imágenes</label>
              <label className="block border-2 border-dashed border-stone-200 rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                <Upload size={24} className="mx-auto text-stone-300 mb-2" />
                <p className="text-sm text-stone-500">Arrastra imágenes aquí o haz clic para subir</p>
                <p className="text-xs text-stone-400 mt-1">JPG, PNG o WEBP. Máximo 5MB por imagen</p>
                <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
              </label>
              {files.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {files.map((f, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-stone-200">
                      <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeFile(i)}
                        className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-display text-lg text-stone-900 mb-4">Resumen del Evento</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-stone-400">Título:</span><p className="font-medium text-stone-900">{form.title}</p></div>
              <div><span className="text-stone-400">Categoría:</span><p className="font-medium text-stone-900">{selectedCat?.name ?? '—'}</p></div>
              <div><span className="text-stone-400">Destino:</span><p className="font-medium text-stone-900">{selectedDest?.name ?? '—'}</p></div>
              <div><span className="text-stone-400">Ciudad:</span><p className="font-medium text-stone-900">{form.city}</p></div>
              <div><span className="text-stone-400">Fecha:</span><p className="font-medium text-stone-900">{form.date_start}{form.date_end ? ` – ${form.date_end}` : ''}</p></div>
              <div><span className="text-stone-400">Horario:</span><p className="font-medium text-stone-900">{form.time_start}{form.time_end ? ` – ${form.time_end}` : ''}</p></div>
              <div><span className="text-stone-400">Precio:</span><p className="font-medium text-stone-900">{form.price === 0 ? 'Gratis' : `$${form.price.toLocaleString('es-CL')}`}</p></div>
              <div><span className="text-stone-400">Imágenes:</span><p className="font-medium text-stone-900">{files.length} archivo(s)</p></div>
            </div>
            <div className="pt-4 border-t border-stone-100">
              <span className="text-stone-400 text-sm">Descripción:</span>
              <p className="text-sm text-stone-700 mt-1">{form.description}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              Al enviar, tu evento quedará en estado <strong>Pendiente</strong> hasta que el equipo de Explora Chile lo revise y apruebe.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-stone-100">
          <button type="button" onClick={() => setStep(s => s - 1)} disabled={step === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-30">
            <ArrowLeft size={16} /> Anterior
          </button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={() => setStep(s => s + 1)} disabled={!canNext()}
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50">
              Siguiente <ArrowRight size={16} />
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} disabled={saving}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50">
              {saving ? 'Enviando...' : <><Send size={16} /> Enviar Evento</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
