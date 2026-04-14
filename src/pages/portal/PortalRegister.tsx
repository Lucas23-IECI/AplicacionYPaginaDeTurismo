import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, User, Mail, Phone, MapPin, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { createAdvertiserProfile } from '../../lib/hooks';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/types';

type AdvInsert = Database['public']['Tables']['advertisers']['Insert'];

export default function PortalRegister() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    business_name: '',
    contact_name: '',
    phone: '',
    email: user?.email ?? '',
    website: '',
    description: '',
  });

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);

    try {
      const payload: AdvInsert = {
        user_id: user.id,
        business_name: form.business_name,
        contact_name: form.contact_name,
        phone: form.phone || null,
        email: form.email,
        website: form.website || null,
        logo_url: null,
        description: form.description || null,
        subscription_tier: 'basico',
        subscription_status: 'active',
      };
      await createAdvertiserProfile(payload);

      // Assign advertiser role
      await supabase.from('user_roles').upsert({
        user_id: user.id,
        role: 'advertiser' as const,
      }, { onConflict: 'user_id' });

      setSuccess(true);
      setTimeout(() => navigate('/portal'), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrar');
    } finally {
      setSaving(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center max-w-md">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-display text-stone-900 mb-2">¡Registro exitoso!</h2>
          <p className="text-sm text-stone-500">Tu cuenta de anunciante ha sido creada. Redirigiendo al portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display text-stone-900 mb-3">Registro de Anunciante</h1>
          <p className="text-stone-500">Completa los datos de tu negocio para comenzar a publicar experiencias turísticas.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-8 space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Building size={14} /> Nombre del Negocio *
            </label>
            <input type="text" required value={form.business_name} onChange={e => set('business_name', e.target.value)}
              placeholder="Ej: Viña Artesanal del Itata" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <User size={14} /> Contacto Principal *
              </label>
              <input type="text" required value={form.contact_name} onChange={e => set('contact_name', e.target.value)}
                placeholder="Nombre completo" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <Phone size={14} /> Teléfono
              </label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                placeholder="+56 9 1234 5678" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <Mail size={14} /> Email de Contacto *
              </label>
              <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <MapPin size={14} /> Sitio Web
              </label>
              <input type="url" value={form.website} onChange={e => set('website', e.target.value)}
                placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <FileText size={14} /> Descripción del Negocio
            </label>
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
              placeholder="Cuéntanos sobre tu negocio..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>

          <button type="submit" disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50">
            {saving ? 'Registrando...' : <><ArrowRight size={16} /> Crear Cuenta de Anunciante</>}
          </button>
        </form>
      </div>
    </div>
  );
}
