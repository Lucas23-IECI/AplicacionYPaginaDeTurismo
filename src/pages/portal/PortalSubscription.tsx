import { Check, Crown, Zap, Star, CreditCard } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: '$29.990',
    period: '/mes',
    icon: Zap,
    current: false,
    features: ['5 eventos activos', 'Estadísticas básicas', 'Soporte por email', 'Ficha de negocio'],
  },
  {
    name: 'Profesional',
    price: '$59.990',
    period: '/mes',
    icon: Star,
    current: false,
    popular: true,
    features: ['15 eventos activos', 'Estadísticas avanzadas', 'Soporte prioritario', 'Ficha de negocio premium', 'Destacado en búsquedas', 'Newsletter mensual'],
  },
  {
    name: 'Premium',
    price: '$99.990',
    period: '/mes',
    icon: Crown,
    current: true,
    features: ['Eventos ilimitados', 'Estadísticas completas', 'Soporte dedicado', 'Ficha de negocio premium', 'Posición destacada', 'Newsletter semanal', 'Banner en home', 'Prioridad en eventos'],
  },
];

export default function PortalSubscription() {
  return (
    <div>
      <h1 className="text-2xl font-display text-stone-900 mb-2">Mi Suscripción</h1>
      <p className="text-sm text-stone-500 mb-8">Gestiona tu plan y método de pago</p>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-white p-5 rounded-xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown size={24} />
          <div>
            <p className="font-semibold">Plan Premium Activo</p>
            <p className="text-sm text-white/75">Próxima facturación: 15 de Julio, 2024</p>
          </div>
        </div>
        <p className="text-2xl font-bold">$99.990<span className="text-sm font-normal text-white/75">/mes</span></p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-white rounded-xl border-2 p-6 relative ${plan.current ? 'border-primary' : plan.popular ? 'border-secondary' : 'border-stone-200'}`}>
            {plan.current && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Plan Actual</span>
            )}
            {plan.popular && !plan.current && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">Popular</span>
            )}
            <div className="text-center mb-5">
              <plan.icon size={28} className={plan.current ? 'text-primary mx-auto mb-2' : 'text-stone-400 mx-auto mb-2'} />
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
            <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.current ? 'bg-stone-100 text-stone-400 cursor-default' : 'bg-primary text-white hover:bg-primary-hover'}`} disabled={plan.current}>
              {plan.current ? 'Plan Actual' : 'Cambiar Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 max-w-lg">
        <h3 className="font-medium text-stone-900 text-sm mb-4 flex items-center gap-2">
          <CreditCard size={16} /> Método de Pago
        </h3>
        <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
            <div>
              <p className="text-sm font-medium text-stone-900">•••• •••• •••• 4532</p>
              <p className="text-xs text-stone-400">Expira 08/26</p>
            </div>
          </div>
          <button className="text-xs text-primary font-medium hover:underline">Cambiar</button>
        </div>
      </div>
    </div>
  );
}
