import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Building, Camera, Save, Globe, FileText } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { useAdvertiserProfile, updateAdvertiserProfile } from '../../lib/hooks';
import { uploadAdvertiserLogo } from '../../lib/storage';

export default function PortalProfile() {
  const { user } = useAuth();
  const { data: profile, loading, refetch } = useAdvertiserProfile(user?.id);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    business_name: '',
    contact_name: '',
    phone: '',
    email: '',
    website: '',
    description: '',
  });

  useEffect(() => {
    if (!profile) return;
    setForm({
      business_name: profile.businessName,
      contact_name: profile.contactName,
      phone: profile.phone ?? '',
      email: profile.email,
      website: profile.website ?? '',
      description: profile.description ?? '',
    });
  }, [profile]);

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !profile) return;
    try {
      const url = await uploadAdvertiserLogo(e.target.files[0], profile.id);
      await updateAdvertiserProfile(profile.id, { logo_url: url });
      refetch();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al subir logo');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await updateAdvertiserProfile(profile.id, {
        business_name: form.business_name,
        contact_name: form.contact_name,
        phone: form.phone || null,
        email: form.email,
        website: form.website || null,
        description: form.description || null,
      });
      setSuccess(true);
      refetch();
      setTimeout(() => setSuccess(false), 3000);
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

  if (!profile) {
    return <div className="text-center py-20 text-stone-500">No se encontró perfil de anunciante.</div>;
  }

  const initials = profile.businessName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div>
      <h1 className="text-2xl font-display text-stone-900 mb-8">Mi Perfil</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}
        {success && <div className="p-3 bg-green-50 text-green-700 text-sm rounded-xl">Cambios guardados correctamente.</div>}

        {/* Avatar */}
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              {profile.logoUrl ? (
                <img src={profile.logoUrl} alt="" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                  {initials}
                </div>
              )}
              <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-primary transition-colors cursor-pointer">
                <Camera size={14} />
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>
            <div>
              <h2 className="font-medium text-stone-900">{profile.businessName}</h2>
              <p className="text-sm text-stone-500">Plan {profile.subscriptionTier.charAt(0).toUpperCase() + profile.subscriptionTier.slice(1)} · Miembro desde {new Date(profile.createdAt).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5">
          <h3 className="font-medium text-stone-900 text-sm">Información del Negocio</h3>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Building size={14} /> Nombre del Negocio
            </label>
            <input type="text" value={form.business_name} onChange={e => set('business_name', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <User size={14} /> Contacto Principal
              </label>
              <input type="text" value={form.contact_name} onChange={e => set('contact_name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <Phone size={14} /> Teléfono
              </label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <Mail size={14} /> Email
              </label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <Globe size={14} /> Sitio Web
              </label>
              <input type="url" value={form.website} onChange={e => set('website', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <FileText size={14} /> Descripción
            </label>
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>

          <div className="flex justify-end pt-4 border-t border-stone-100">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50">
              {saving ? 'Guardando...' : <><Save size={16} /> Guardar Cambios</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
