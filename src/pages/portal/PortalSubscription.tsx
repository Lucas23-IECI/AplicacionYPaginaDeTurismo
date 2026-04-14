import { useState } from 'react';
import { Check, Crown, Zap, Star, CreditCard } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { useAdvertiserProfile, updateAdvertiserProfile } from '../../lib/hooks';

type Tier = 'basico' | 'profesional' | 'premium';

const plans: { key: Tier; name: string; price: string; period: string; icon: typeof Zap; popular?: boolean; features: string[] }[] = [
  {
    key: 'basico',
    name: 'Básico',
    price: '$29.990',
    period: '/mes',
    icon: Zap,
    features: ['5 eventos activos', 'Estadísticas básicas', 'Soporte por email', 'Ficha de negocio'],
  },
  {
    key: 'profesional',
    name: 'Profesional',
    price: '$59.990',
    period: '/mes',
    icon: Star,
    popular: true,
    features: ['15 eventos activos', 'Estadísticas avanzadas', 'Soporte prioritario', 'Ficha de negocio premium', 'Destacado en búsquedas', 'Newsletter mensual'],
  },
  {
    key: 'premium',
    name: 'Premium',
    price: '$99.990',
    period: '/mes',
    icon: Crown,
    features: ['Eventos ilimitados', 'Estadísticas completas', 'Soporte dedicado', 'Ficha de negocio premium', 'Posición destacada', 'Newsletter semanal', 'Banner en home', 'Prioridad en eventos'],
  },
];

const tierPrice: Record<Tier, string> = { basico: '$29.990', profesional: '$59.990', premium: '$99.990' };
const tierLabel: Record<Tier, string> = { basico: 'Básico', profesional: 'Profesional', premium: 'Premium' };

export default function PortalSubscription() {
  const { user } = useAuth();
  const { data: profile, loading, refetch } = useAdvertiserProfile(user?.id);
  const [switching, setSwitching] = useState(false);

  const currentTier: Tier = (profile?.subscriptionTier as Tier) ?? 'basico';

  const handleSwitch = async (tier: Tier) => {
    if (!profile || tier === currentTier) return;
    setSwitching(true);
    try {
      await updateAdvertiserProfile(profile.id, { subscription_tier: tier });
      refetch();
    } catch {
      /* silent */
    } finally {
      setSwitching(false);
    }
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
      <h1 className="text-2xl font-display text-stone-900 mb-2">Mi Suscripción</h1>
      <p className="text-sm text-stone-500 mb-8">Gestiona tu plan y método de pago</p>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-white p-5 rounded-xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown size={24} />
          <div>
            <p className="font-semibold">Plan {tierLabel[currentTier]} Activo</p>
            <p className="text-sm text-white/75">Estado: {profile?.subscriptionStatus === 'active' ? 'Activo' : 'Inactivo'}</p>
          </div>
        </div>
        <p className="text-2xl font-bold">{tierPrice[currentTier]}<span className="text-sm font-normal text-white/75">/mes</span></p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {plans.map((plan) => {
          const isCurrent = plan.key === currentTier;
          return (
            <div key={plan.key} className={`bg-white rounded-xl border-2 p-6 relative ${isCurrent ? 'border-primary' : plan.popular ? 'border-secondary' : 'border-stone-200'}`}>
              {isCurrent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Plan Actual</span>
              )}
              {plan.popular && !isCurrent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">Popular</span>
              )}
              <div className="text-center mb-5">
                <plan.icon size={28} className={isCurrent ? 'text-primary mx-auto mb-2' : 'text-stone-400 mx-auto mb-2'} />
                <h3 className="font-display text-lg text-stone-900">{plan.name}</h3>
                <p className="text-2xl font-bold text-stone-900 mt-1">{plan.price}<span className="text-sm font-normal text-stone-400">{plan.period}</span></p>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-stone-600">
                    <Check size={14} className="text-green-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${isCurrent ? 'bg-stone-100 text-stone-400 cursor-default' : 'bg-primary text-white hover:bg-primary-hover'}`}
                disabled={isCurrent || switching}
                onClick={() => handleSwitch(plan.key)}
              >
                {isCurrent ? 'Plan Actual' : switching ? 'Cambiando...' : 'Cambiar Plan'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment Method placeholder */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 max-w-lg">
        <h3 className="font-medium text-stone-900 text-sm mb-4 flex items-center gap-2">
          <CreditCard size={16} /> Método de Pago
        </h3>
        <p className="text-sm text-stone-500">La integración de pagos estará disponible próximamente. Por ahora los cambios de plan son inmediatos.</p>
      </div>
    </div>
  );
}
