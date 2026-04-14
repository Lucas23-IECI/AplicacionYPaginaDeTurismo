import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Users, BarChart3, Shield } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import StaggerContainer, { StaggerItem } from '../components/ui/StaggerContainer';
import { usePageTitle } from '../lib/usePageTitle';

const plans = [
  { name: 'Básico', price: '29.990', period: '/mes', features: ['3 eventos activos', 'Ficha estándar', 'Soporte por email', 'Estadísticas básicas'], popular: false },
  { name: 'Profesional', price: '59.990', period: '/mes', features: ['10 eventos activos', 'Ficha premium con galería', 'Evento destacado 1x/mes', 'Estadísticas avanzadas', 'Soporte prioritario'], popular: true },
  { name: 'Premium', price: '99.990', period: '/mes', features: ['Eventos ilimitados', 'Ficha premium + video', 'Evento spotlight 2x/mes', 'Reportes personalizados', 'Account manager dedicado', 'API acceso'], popular: false },
];

const benefits = [
  { icon: Star, title: 'Calidad Premium', desc: 'Tu evento presentado con estándar editorial profesional' },
  { icon: Users, title: 'Audiencia Segmentada', desc: 'Conecta con turistas y locales interesados en tu categoría' },
  { icon: BarChart3, title: 'Métricas Reales', desc: 'Dashboard con vistas, clics, reservas y conversiones' },
  { icon: Shield, title: 'Confianza', desc: 'Plataforma curada que genera credibilidad para tu marca' },
];

export default function AdvertisersPage() {
  usePageTitle('Anunciantes');
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 mb-4">Llega a Miles de Turistas</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Publica tus eventos y actividades en la plataforma de turismo curado más completa de Ñuble y Biobío.
          </p>
        </AnimatedSection>

        {/* Benefits */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <div className="p-6 bg-cream rounded-2xl text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <b.icon size={24} />
                </div>
                <h3 className="font-bold text-stone-900 mb-2">{b.title}</h3>
                <p className="text-sm text-stone-500">{b.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Pricing */}
        <AnimatedSection variant="fadeUp" className="text-center mb-10">
          <h2 className="text-3xl font-display text-stone-900 mb-2">Planes y Precios</h2>
          <p className="text-stone-500">Precios en pesos chilenos (CLP). Sin contratos de permanencia.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-8 relative ${plan.popular ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-white border border-stone-200'}`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wider">Más popular</span>}
              <h3 className={`text-xl font-display mb-2 ${plan.popular ? 'text-white' : 'text-stone-900'}`}>{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-stone-400'}`}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={16} className={plan.popular ? 'text-white/80' : 'text-primary'} />
                    <span className={plan.popular ? 'text-white/90' : 'text-stone-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/login" className={`block text-center py-3 rounded-xl font-semibold transition-colors ${plan.popular ? 'bg-white text-primary hover:bg-stone-100' : 'bg-primary text-white hover:bg-primary-hover'}`}>
                Comenzar Ahora
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-cream rounded-3xl p-12">
          <h3 className="text-2xl font-display text-stone-900 mb-4">¿Necesitas algo personalizado?</h3>
          <p className="text-stone-500 mb-6">Conversemos sobre un plan a medida para tu negocio de turismo.</p>
          <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors group">
            Contactar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
