export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  eventCount: number;
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Chillán',
    slug: 'chillan',
    description: 'Capital de la Región de Ñuble, cuna de Bernardo O\'Higgins. Ciudad vibrante con mercados tradicionales, artesanía en greda de Quinchamalí y una gastronomía campesina que enamora. Puerta de entrada a los Nevados de Chillán.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&auto=format&fit=crop',
    lat: -36.6066,
    lng: -72.1034,
    eventCount: 24,
  },
  {
    id: '2',
    name: 'Concepción',
    slug: 'concepcion',
    description: 'Capital del Biobío y centro cultural del sur de Chile. Ciudad universitaria con vida nocturna activa, teatros, museos y una escena gastronómica que mezcla tradición con innovación. A orillas del río Biobío.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80&auto=format&fit=crop',
    lat: -36.8270,
    lng: -73.0503,
    eventCount: 38,
  },
  {
    id: '3',
    name: 'Valle del Itata',
    slug: 'valle-del-itata',
    description: 'Cuna de los viñedos más antiguos de Chile, con cepas patrimoniales de uva País que datan del siglo XVI. Paisajes de viñas, ríos y tradiciones campesinas que perduran en el tiempo.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80&auto=format&fit=crop',
    lat: -36.7408,
    lng: -72.4694,
    eventCount: 16,
  },
  {
    id: '4',
    name: 'Nevados de Chillán',
    slug: 'nevados-de-chillan',
    description: 'Complejo volcánico con termas naturales, senderos de montaña y el centro de ski más austral de Sudamérica. En verano ofrece trekking, mountain bike y aguas termales rodeadas de bosque nativo.',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdf2e93e5?w=800&q=80&auto=format&fit=crop',
    lat: -36.8636,
    lng: -71.4147,
    eventCount: 12,
  },
  {
    id: '5',
    name: 'Costa del Biobío',
    slug: 'costa-del-biobio',
    description: 'Litoral salvaje con playas de arena negra, acantilados y pueblos costeros como Cobquecura y Dichato. Lobería natural, olas para surf y una gastronomía marina de primer nivel.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop',
    lat: -36.1305,
    lng: -72.7908,
    eventCount: 20,
  },
];
