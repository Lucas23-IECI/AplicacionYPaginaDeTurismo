export interface Testimonial {
  id: string;
  name: string;
  city: string;
  avatar: string;
  text: string;
  rating: number;
  type: 'tourist' | 'advertiser';
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Camila Reyes',
    city: 'Santiago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80&auto=format&fit=crop',
    text: 'Encontré actividades que nunca habría descubierto por mi cuenta. La vendimia en el Valle del Itata fue una experiencia inolvidable. ¡Volveré cada año!',
    rating: 5,
    type: 'tourist',
  },
  {
    id: '2',
    name: 'Roberto Soto',
    city: 'Concepción',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format&fit=crop',
    text: 'Como organizador de la Feria Gastronómica, el equipo de Explora Chile transformó nuestra presentación. Las reservas aumentaron un 40% respecto al año pasado.',
    rating: 5,
    type: 'advertiser',
  },
  {
    id: '3',
    name: 'María José Fuentes',
    city: 'Chillán',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&auto=format&fit=crop',
    text: 'Vivo en Chillán y no conocía la mitad de las actividades que hay cerca. El calendario semanal es perfecto para planificar el fin de semana.',
    rating: 5,
    type: 'tourist',
  },
  {
    id: '4',
    name: 'Carlos Muñoz',
    city: 'Quillón',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&auto=format&fit=crop',
    text: 'Tenemos una viña familiar y gracias a la plataforma llegamos a turistas de todo Chile. La curación editorial le da un nivel profesional que nosotros solos no podríamos.',
    rating: 5,
    type: 'advertiser',
  },
  {
    id: '5',
    name: 'Andrea Sepúlveda',
    city: 'Viña del Mar',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80&auto=format&fit=crop',
    text: 'Vine de vacaciones al sur y Explora Chile fue mi guía. Todo curado, con información real y fotos que de verdad representan el lugar. Muy distinto a otros portales.',
    rating: 5,
    type: 'tourist',
  },
];
