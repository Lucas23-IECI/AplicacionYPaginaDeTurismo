-- ============================================
-- EXPLORA CHILE — Seed Data
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- DESPUÉS de ejecutar migration.sql
-- ============================================

-- ==========================================
-- 1. CATEGORIES
-- ==========================================
INSERT INTO categories (id, name, slug, icon, color) VALUES
  ('cat-01', 'Tradición', 'tradicion', '🎭', 'bg-amber-50 text-amber-700'),
  ('cat-02', 'Cultura', 'cultura', '🏛️', 'bg-purple-50 text-purple-700'),
  ('cat-03', 'Aventura', 'aventura', '🏔️', 'bg-emerald-50 text-emerald-700'),
  ('cat-04', 'Gastronomía', 'gastronomia', '🍷', 'bg-red-50 text-red-700'),
  ('cat-05', 'Arte', 'arte', '🎵', 'bg-indigo-50 text-indigo-700'),
  ('cat-06', 'Naturaleza', 'naturaleza', '🌿', 'bg-green-50 text-green-700');

-- ==========================================
-- 2. DESTINATIONS
-- ==========================================
INSERT INTO destinations (id, name, slug, description, image_url, lat, lng) VALUES
  ('dest-01', 'Chillán', 'chillan',
   'Capital de la Región de Ñuble, cuna de Bernardo O''Higgins. Ciudad vibrante con mercados tradicionales, artesanía en greda de Quinchamalí y una gastronomía campesina que enamora. Puerta de entrada a los Nevados de Chillán.',
   'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&auto=format&fit=crop',
   -36.6066, -72.1034),
  ('dest-02', 'Concepción', 'concepcion',
   'Capital del Biobío y centro cultural del sur de Chile. Ciudad universitaria con vida nocturna activa, teatros, museos y una escena gastronómica que mezcla tradición con innovación. A orillas del río Biobío.',
   'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80&auto=format&fit=crop',
   -36.8270, -73.0503),
  ('dest-03', 'Valle del Itata', 'valle-del-itata',
   'Cuna del vino chileno. Un valle donde las cepas patrimoniales como País y Moscatel crecen desde hace más de 400 años. Paisajes de viñedos, bodegas artesanales y una cultura vitivinícola que se resiste a desaparecer.',
   'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80&auto=format&fit=crop',
   -36.72, -72.68),
  ('dest-04', 'Nevados de Chillán', 'nevados-de-chillan',
   'Complejo volcánico y centro de montaña a 1.530 metros de altitud. En invierno, el mejor ski del sur. En verano, termas naturales, trekking entre araucarias y paisajes que quitan el aliento.',
   'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80&auto=format&fit=crop',
   -36.8636, -71.4147),
  ('dest-05', 'Costa del Biobío', 'costa-del-biobio',
   'Kilómetros de costa salvaje entre Cobquecura y Dichato. Playas de arena negra, formaciones rocosas, lobos marinos y pueblos pesqueros con identidad propia. El Pacífico en su estado más puro.',
   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop',
   -36.1305, -72.7908);

-- ==========================================
-- 3. TESTIMONIALS
-- ==========================================
INSERT INTO testimonials (name, city, avatar_url, text, rating, type, featured) VALUES
  ('Camila Reyes', 'Santiago',
   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80&auto=format&fit=crop',
   'Encontré actividades que nunca habría descubierto por mi cuenta. La vendimia en el Valle del Itata fue una experiencia inolvidable. ¡Volveré cada año!',
   5, 'tourist', true),
  ('Roberto Soto', 'Concepción',
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format&fit=crop',
   'Como organizador de la Feria Gastronómica, el equipo de Explora Chile transformó nuestra presentación. Las reservas aumentaron un 40% respecto al año pasado.',
   5, 'advertiser', true),
  ('Valentina Muñoz', 'Temuco',
   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&auto=format&fit=crop',
   'La curación de experiencias marca la diferencia. Cada actividad que probé superó mis expectativas. Se nota que alguien real revisa y mejora cada publicación.',
   5, 'tourist', true),
  ('Andrés Figueroa', 'Chillán',
   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80&auto=format&fit=crop',
   'Mi viña recibe el doble de visitantes desde que publiqué en Explora Chile. La visibilidad que dan a los pequeños productores es invaluable.',
   4, 'advertiser', true),
  ('Carolina Bravo', 'Viña del Mar',
   'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80&auto=format&fit=crop',
   'Organizamos un fin de semana en Ñuble solo con las recomendaciones de esta plataforma. Senderismo, vino, gastronomía local... ¡perfectamente planificado!',
   5, 'tourist', true);

-- ==========================================
-- 4. FAQ ITEMS
-- ==========================================
INSERT INTO faq_items (question, answer, category, display_order, active) VALUES
  ('¿Qué hace diferente a Explora Chile de otros portales de turismo?',
   'Cada actividad publicada pasa por un proceso de curación editorial. No somos un directorio automático: nuestro equipo revisa, mejora y verifica cada experiencia antes de publicarla. Esto garantiza información precisa, fotos reales y descripciones de calidad.',
   'general', 1, true),
  ('¿Cómo puedo buscar actividades cerca de mí?',
   'Usa el buscador en la página principal. Indica tu ubicación y el radio de kilómetros que te interesa. También puedes filtrar por fecha, categoría y precio. El mapa interactivo te muestra todas las experiencias en la zona.',
   'tourist', 2, true),
  ('¿Las actividades tienen costo?',
   'Depende de cada experiencia. Muchas ferias y eventos culturales son gratuitos. Las actividades con costo muestran el precio en pesos chilenos directamente en la tarjeta. Los precios siempre son por persona salvo que se indique lo contrario.',
   'tourist', 3, true),
  ('¿Cómo publico mi evento o actividad?',
   'Regístrate como anunciante en nuestro Portal de Anunciantes. Completa el formulario con la información de tu actividad, sube fotos y envía para revisión. Nuestro equipo editorial revisará y mejorará la publicación antes de aprobarla.',
   'advertiser', 4, true),
  ('¿Cuánto cuesta publicar?',
   'Ofrecemos tres planes: Básico ($29.990/mes, 5 eventos), Profesional ($59.990/mes, 15 eventos con estadísticas avanzadas) y Premium ($99.990/mes, eventos ilimitados con posición destacada). Cada plan incluye curación editorial.',
   'advertiser', 5, true),
  ('¿Cuánto tarda la aprobación de mi evento?',
   'Nuestro equipo editorial revisa las publicaciones en un máximo de 48 horas hábiles. Recibirás una notificación cuando tu evento sea aprobado o si necesitamos información adicional.',
   'advertiser', 6, true),
  ('¿Puedo editar mi evento después de publicarlo?',
   'Sí. Desde tu Portal de Anunciantes puedes actualizar la información de tus eventos en cualquier momento. Los cambios en eventos aprobados pasan por una revisión rápida antes de publicarse.',
   'advertiser', 7, true),
  ('¿Explora Chile opera en toda la región?',
   'Actualmente cubrimos las regiones de Ñuble y Biobío, con foco en Chillán, Concepción, Valle del Itata, Nevados de Chillán y la Costa del Biobío. Estamos expandiéndonos gradualmente.',
   'general', 8, true);

-- ==========================================
-- 5. EVENTS (15 events — using category/destination IDs)
-- ==========================================
INSERT INTO events (title, slug, short_description, description, category_id, destination_id, price, currency, date_start, date_end, time_start, time_end, address, city, lat, lng, tag, featured, spotlight, status) VALUES
  ('Vendimia del Valle del Itata', 'vendimia-valle-itata-2026',
   'Celebración vinícola en el corazón de Ñuble con cosecha participativa y catas guiadas.',
   'Tres días de celebración en el corazón vinícola de Ñuble. Cosecha participativa, catas guiadas, gastronomía local y música en vivo entre los viñedos más antiguos de Chile. Una experiencia única para conectar con la tradición vitivinícola del sur.',
   'cat-01', 'dest-03', 15000, 'CLP', '2026-04-24', '2026-04-26', '10:00', '22:00',
   'Ruta del Vino, Valle del Itata', 'Chillán Viejo', -36.72, -72.68,
   'Curado', true, true, 'approved'),

  ('Feria Costumbrista de Ñuble', 'feria-costumbrista-nuble',
   'Artesanía, comida típica y tradiciones campesinas en pleno centro de Chillán.',
   'La Feria Costumbrista de Ñuble reúne lo mejor de las tradiciones campesinas del sur de Chile. Artesanía en greda, tejidos a telar, comida típica, rodeo, cueca y mucho más. Entrada liberada para toda la familia.',
   'cat-02', 'dest-01', 0, 'CLP', '2026-04-19', NULL, '09:00', '20:00',
   'Feria de Chillán, Av. Ecuador 1060', 'Chillán', -36.6066, -72.1034,
   'Este finde', true, false, 'approved'),

  ('Senderismo Termas de Chillán', 'senderismo-termas-chillan',
   'Trekking guiado por senderos de montaña con vistas a los Nevados de Chillán.',
   'Recorre los senderos de montaña con guías expertos. Incluye transporte desde Chillán, almuerzo en refugio, acceso a termas naturales y fotografía profesional del recorrido. Dificultad media, apto para toda la familia.',
   'cat-03', 'dest-04', 25000, 'CLP', '2026-04-20', NULL, '07:00', '18:00',
   'Centro de Ski Nevados de Chillán', 'Nevados de Chillán', -36.8636, -71.4147,
   'Cerca de ti', true, false, 'approved'),

  ('Festival Gastronómico del Biobío', 'festival-gastronomico-biobio',
   'Los mejores chefs de la región compiten en una muestra culinaria abierta al público.',
   'El Festival Gastronómico del Biobío reúne a los mejores chefs y productores de la región en una muestra culinaria abierta al público. Degustaciones, talleres de cocina, maridaje con vinos locales y competencia de platos típicos reinventados.',
   'cat-04', 'dest-02', 8000, 'CLP', '2026-05-03', NULL, '12:00', '23:00',
   'Parque Bicentenario, Concepción', 'Concepción', -36.8270, -73.0503,
   'Destacado', true, false, 'approved'),

  ('Noche de Jazz en Vivo', 'noche-jazz-concepcion',
   'Velada de jazz contemporáneo con artistas nacionales en el Teatro Universidad de Concepción.',
   'Una noche única de jazz contemporáneo en el emblemático Teatro Universidad de Concepción. Artistas nacionales e invitados internacionales en un formato íntimo. Incluye copa de bienvenida.',
   'cat-05', 'dest-02', 12000, 'CLP', '2026-04-16', NULL, '21:00', '23:30',
   'Teatro UdeC, Concepción', 'Concepción', -36.8283, -73.0350,
   'Destacado', false, false, 'approved'),

  ('Taller de Cerámica Artesanal', 'taller-ceramica-artesanal',
   'Aprende técnicas ancestrales de cerámica con artesanos locales de Quinchamalí.',
   'Taller práctico de cerámica en greda negra con maestros artesanos de Quinchamalí. Aprende las técnicas ancestrales que han pasado de generación en generación. Incluye materiales y pieza terminada para llevar.',
   'cat-02', 'dest-01', 18000, 'CLP', '2026-04-13', NULL, '10:00', '13:00',
   'Centro Cultural de Chillán', 'Chillán', -36.6193, -72.1029,
   NULL, false, false, 'approved'),

  ('Ruta del Vino Itata', 'ruta-vino-itata',
   'Recorrido por viñedos con degustación de cepas patrimoniales del Valle del Itata.',
   'Recorre las viñas más emblemáticas del Valle del Itata en una ruta guiada que incluye degustación de cepas patrimoniales, almuerzo campestre y visita a bodegas centenarias. Una experiencia imperdible para los amantes del vino.',
   'cat-04', 'dest-03', 35000, 'CLP', '2026-04-15', NULL, '11:00', '17:00',
   'Viña Las Cenizas, Quillón', 'Valle del Itata', -36.7408, -72.4694,
   'Curado', false, false, 'approved'),

  ('Feria Gastronómica Regional', 'feria-gastronomica-regional',
   'Productos locales, empanadas, pastel de choclo y lo mejor de la cocina campesina.',
   'La Feria Gastronómica Regional trae lo mejor de la comida típica del sur de Chile. Empanadas de horno, pastel de choclo, cazuela, sopaipillas y mucho más. Con productores locales y show de folclore en vivo.',
   'cat-04', 'dest-01', 0, 'CLP', '2026-04-17', NULL, '12:00', '21:00',
   'Plaza de Armas de Chillán', 'Chillán', -36.6087, -72.1028,
   'Este finde', false, false, 'approved'),

  ('Vendimia Abierta Quillón', 'vendimia-abierta-quillon',
   'Participa en la cosecha de uva en los viñedos de Quillón.',
   'Experiencia inmersiva donde podrás participar directamente en la cosecha de uva País en los viñedos ancestrales de Quillón. Incluye almuerzo campestre, pisa de uva y degustación.',
   'cat-01', 'dest-03', 20000, 'CLP', '2026-04-18', NULL, '10:00', '16:00',
   'Viñedos de Quillón', 'Quillón', -36.7389, -72.4688,
   NULL, false, false, 'approved'),

  ('Senderismo Guiado Nevados', 'senderismo-guiado-nevados',
   'Trekking por senderos de montaña con vistas panorámicas de la cordillera.',
   'Senderismo guiado por los senderos de los Nevados de Chillán. Recorrido de dificultad media con vistas panorámicas espectaculares. Incluye equipo, snacks y guía certificado.',
   'cat-03', 'dest-04', 22000, 'CLP', '2026-04-18', NULL, '08:00', '15:00',
   'Base Nevados de Chillán', 'Nevados de Chillán', -36.8650, -71.4100,
   NULL, false, false, 'approved'),

  ('Mercado Campesino Ñuble', 'mercado-campesino-nuble',
   'Productos frescos del campo directo del productor al consumidor.',
   'Cada domingo, el Mercado Campesino de Ñuble reúne a productores locales con lo mejor de la tierra: frutas, verduras, quesos, miel, conservas y pan amasado. Una tradición que conecta el campo con la ciudad.',
   'cat-01', 'dest-01', 0, 'CLP', '2026-04-19', NULL, '09:00', '14:00',
   'Plaza de San Carlos', 'San Carlos', -36.4247, -71.9512,
   NULL, false, false, 'approved'),

  ('Clase de Surf en Cobquecura', 'surf-costa-biobio',
   'Clase de surf para principiantes en las playas de Cobquecura.',
   'Clases de surf para todos los niveles en las playas de Cobquecura, conocida por sus olas consistentes y paisaje costero único. Incluye tabla, traje y instructor certificado.',
   'cat-03', 'dest-05', 30000, 'CLP', '2026-04-25', NULL, '10:00', '13:00',
   'Playa de Cobquecura', 'Cobquecura', -36.1305, -72.7908,
   NULL, false, false, 'approved'),

  ('Concierto de Folclore en Vivo', 'concierto-folclore-concepcion',
   'Presentación de grupos folclóricos del Biobío y Ñuble en el Teatro Biobío.',
   'Gran concierto con los mejores exponentes del folclore regional. Cueca, tonadas, música campesina y danzas tradicionales en un espectáculo que celebra la identidad del sur de Chile.',
   'cat-05', 'dest-02', 10000, 'CLP', '2026-05-10', NULL, '19:00', '22:00',
   'Teatro Biobío, Concepción', 'Concepción', -36.8150, -73.0450,
   'Destacado', false, false, 'approved'),

  ('Cabalgata por la Precordillera', 'cabalgata-precordillera',
   'Paseo a caballo por senderos precordilleranos con vistas al valle.',
   'Experiencia ecuestre por los senderos de la precordillera de Ñuble. Caballos mansos y guías expertos para un recorrido seguro con vistas espectaculares del valle y la cordillera de los Andes.',
   'cat-03', 'dest-04', 28000, 'CLP', '2026-05-01', NULL, '09:00', '14:00',
   'Hacienda Los Robles, Pinto', 'Pinto', -36.6984, -71.8947,
   NULL, false, false, 'approved'),

  ('Avistamiento de Lobos Marinos', 'avistamiento-lobos-marinos',
   'Tour costero para observar la colonia de lobos marinos en la Lobería de Cobquecura.',
   'Visita guiada a la Lobería de Cobquecura, santuario natural de lobos marinos. Recorrido interpretativo por la costa con guía especializado en fauna marina del Pacífico sur.',
   'cat-03', 'dest-05', 15000, 'CLP', '2026-04-27', NULL, '09:00', '12:00',
   'Lobería de Cobquecura', 'Cobquecura', -36.1288, -72.7950,
   'Curado', false, false, 'approved');

-- ==========================================
-- 6. EVENT IMAGES (multiple per event)
-- ==========================================
INSERT INTO event_images (event_id, image_url, display_order)
SELECT e.id, img.url, img.ord
FROM events e
JOIN (VALUES
  ('vendimia-valle-itata-2026', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80&auto=format&fit=crop', 0),
  ('vendimia-valle-itata-2026', 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80&auto=format&fit=crop', 1),
  ('vendimia-valle-itata-2026', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format&fit=crop', 2),
  ('feria-costumbrista-nuble', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80&auto=format&fit=crop', 0),
  ('feria-costumbrista-nuble', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format&fit=crop', 1),
  ('senderismo-termas-chillan', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80&auto=format&fit=crop', 0),
  ('senderismo-termas-chillan', 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80&auto=format&fit=crop', 1),
  ('festival-gastronomico-biobio', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop', 0),
  ('festival-gastronomico-biobio', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&auto=format&fit=crop', 1),
  ('noche-jazz-concepcion', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80&auto=format&fit=crop', 0),
  ('taller-ceramica-artesanal', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80&auto=format&fit=crop', 0),
  ('ruta-vino-itata', 'https://images.unsplash.com/photo-1566903451935-7e8835ed3e97?w=800&q=80&auto=format&fit=crop', 0),
  ('feria-gastronomica-regional', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format&fit=crop', 0),
  ('vendimia-abierta-quillon', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format&fit=crop', 0),
  ('senderismo-guiado-nevados', 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80&auto=format&fit=crop', 0),
  ('mercado-campesino-nuble', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80&auto=format&fit=crop', 0),
  ('surf-costa-biobio', 'https://images.unsplash.com/photo-1502680390548-bdbac40f7154?w=800&q=80&auto=format&fit=crop', 0),
  ('concierto-folclore-concepcion', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80&auto=format&fit=crop', 0),
  ('cabalgata-precordillera', 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80&auto=format&fit=crop', 0),
  ('avistamiento-lobos-marinos', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80&auto=format&fit=crop', 0)
) AS img(slug, url, ord) ON e.slug = img.slug;
