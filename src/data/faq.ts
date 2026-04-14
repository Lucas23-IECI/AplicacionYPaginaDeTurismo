export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'tourist' | 'advertiser' | 'general';
}

export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: '¿Qué hace diferente a Explora Chile de otros portales de turismo?',
    answer: 'Cada actividad publicada pasa por un proceso de curación editorial. No somos un directorio automático: nuestro equipo revisa, mejora y verifica cada experiencia antes de publicarla. Esto garantiza información precisa, fotos reales y descripciones de calidad.',
    category: 'general',
  },
  {
    id: '2',
    question: '¿Cómo puedo buscar actividades cerca de mí?',
    answer: 'Usa el buscador en la página principal. Indica tu ubicación y el radio de kilómetros que te interesa. También puedes filtrar por fecha, categoría y precio. El mapa interactivo te muestra todas las experiencias en la zona.',
    category: 'tourist',
  },
  {
    id: '3',
    question: '¿Las actividades tienen costo?',
    answer: 'Depende de cada experiencia. Muchas ferias y eventos culturales son gratuitos. Las actividades con costo muestran el precio en pesos chilenos directamente en la tarjeta. Los precios siempre son por persona salvo que se indique lo contrario.',
    category: 'tourist',
  },
  {
    id: '4',
    question: '¿Cómo publico mi evento o actividad?',
    answer: 'Regístrate como anunciante en nuestro Portal de Anunciantes. Completa el formulario con la información de tu actividad, sube fotos y envía para revisión. Nuestro equipo editorial revisará y mejorará la publicación antes de aprobarla.',
    category: 'advertiser',
  },
  {
    id: '5',
    question: '¿Cuánto cuesta publicar en Explora Chile?',
    answer: 'Ofrecemos planes mensuales para anunciantes que incluyen publicación de eventos, posicionamiento destacado y métricas básicas de visualización. Consulta nuestra página de anunciantes para ver los planes disponibles.',
    category: 'advertiser',
  },
  {
    id: '6',
    question: '¿Puedo editar mi evento después de publicarlo?',
    answer: 'Sí, puedes solicitar modificaciones desde tu portal de anunciante. Los cambios pasan por una revisión rápida antes de actualizarse en la plataforma para mantener la calidad editorial.',
    category: 'advertiser',
  },
  {
    id: '7',
    question: '¿En qué regiones están disponibles las experiencias?',
    answer: 'Actualmente cubrimos la Región de Ñuble y la Región del Biobío, con foco en Chillán, Concepción, Valle del Itata, Nevados de Chillán y la costa. Estamos en expansión hacia otras zonas del centro-sur de Chile.',
    category: 'general',
  },
  {
    id: '8',
    question: '¿Cómo sé que una actividad es confiable?',
    answer: 'Todas las actividades llevan la etiqueta "Curado" que indica que pasaron por nuestro proceso de verificación. Validamos al organizador, confirmamos fechas y ubicación, y nos aseguramos de que las fotos y descripciones sean reales.',
    category: 'tourist',
  },
];
