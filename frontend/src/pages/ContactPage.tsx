import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/types';
import AnimatedSection from '../components/ui/AnimatedSection';
import { usePageTitle } from '../lib/usePageTitle';

export default function ContactPage() {
  usePageTitle('Contacto');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: 'Consulta general', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSending(true);
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    } as Database['public']['Tables']['contact_messages']['Insert']);
    setSending(false);
    if (error) {
      setFormError('Error al enviar. Intenta de nuevo.');
      return;
    }
    setSent(true);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 mb-4">Contáctanos</h1>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            ¿Tienes preguntas, sugerencias o quieres colaborar? Nos encantaría escucharte.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <AnimatedSection variant="fadeRight" className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-cream rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Email</h3>
                  <p className="text-sm text-stone-500">hola@explorachile.cl</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-cream rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Teléfono</h3>
                  <p className="text-sm text-stone-500">+56 9 1234 5678</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-cream rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Ubicación</h3>
                  <p className="text-sm text-stone-500">Región de Ñuble y Biobío, Chile</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection variant="fadeUp" delay={0.1} className="lg:col-span-3">
            {sent ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20 bg-cream rounded-2xl">
                <CheckCircle size={48} className="text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-display text-stone-900 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-stone-500">Te responderemos a la brevedad.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Nombre</label>
                    <input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="tu@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Asunto</label>
                  <select name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Consulta general</option>
                    <option>Quiero ser anunciante</option>
                    <option>Reportar un problema</option>
                    <option>Colaboración / Prensa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Mensaje</label>
                  <textarea required rows={5} name="message" value={form.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" placeholder="Escribe tu mensaje..." />
                </div>
                <button type="submit" disabled={sending} className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                  <Send size={16} /> {sending ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
                {formError && <p className="text-sm text-red-500 text-center">{formError}</p>}
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
