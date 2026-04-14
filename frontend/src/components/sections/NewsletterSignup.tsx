import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/types';
import AnimatedSection from '../ui/AnimatedSection';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Ingresa un email válido');
      return;
    }
    setLoading(true);
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email } as Database['public']['Tables']['newsletter_subscribers']['Insert'], { onConflict: 'email' });
    setLoading(false);
    if (dbError) {
      setError('Error al suscribirse. Intenta de nuevo.');
      return;
    }
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <AnimatedSection variant="fadeUp">
          <Mail size={40} className="text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
            No te pierdas nada
          </h2>
          <p className="text-white/75 mb-10 max-w-md mx-auto">
            Recibe cada semana las mejores experiencias curadas directamente en tu correo.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-5 py-3.5 rounded-xl text-stone-800 text-sm font-medium outline-none bg-white placeholder:text-stone-400 focus:ring-2 focus:ring-white/50"
              />
              {error && (
                <p className="absolute -bottom-6 left-1 text-xs text-red-200">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-secondary px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-accent hover:text-white transition-all whitespace-nowrap disabled:opacity-60"
            >
              {loading ? 'Enviando...' : 'Suscribirme'}
            </button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 mt-6 text-white"
              >
                <CheckCircle size={18} />
                <span className="text-sm font-medium">¡Listo! Te enviamos las mejores experiencias cada semana.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-white/50 text-xs mt-8">
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
