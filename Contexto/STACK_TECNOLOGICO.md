# Stack Tecnologico y Arquitectura

## Stack principal

- **Framework**: Next.js (SEO organico, carga rapida, SSR/SSG)
- **Estilos**: Tailwind CSS (interfaz fluida, responsive, mobile-first)
- **Infraestructura**: Supabase (base de datos, auth, almacenamiento multimedia)
- **Despliegue**: Vercel (velocidad de carga, CDN global)
- **Pagos**: Stripe o Transbank (suscripciones recurrentes)
- **Mapas**: Mapbox o Google Maps API (calculo de km, visualizacion interactiva)
- **IA editorial**: Claude API (modelo Haiku, correccion y mejora de textos)

## Nota sobre decisiones de stack

Hay dos caminos posibles:

### Camino A: Stack nuevo (Supabase-centric)

- Next.js + Supabase + storage + auth + pagos + mapas
- Ventaja: rapido para prototipo, menos piezas propias al inicio
- Desventaja: se aleja de la arquitectura actual de PuroCode

### Camino B: Stack alineado a PuroCode

- Next.js + Prisma + SQL/Turso + storage aparte + auth propia o mixta
- Ventaja: mas reutilizacion de modulos existentes, coherencia tecnica
- Desventaja: hay que definir mejor almacenamiento multimedia, roles y suscripciones

## Costos estimados de infraestructura (mensuales)

| Servicio | Plan | Costo estimado |
|----------|------|----------------|
| Vercel (Hosting) | Pro | ~$20 USD/mes |
| Supabase (DB + Auth) | Free/Pro | $0 - $25 USD/mes |
| Dominio | .com o .cl | ~$10-15 USD/año |
| Stripe/Transbank | Comision | ~3.5% por transaccion |
| Claude API (IA) | Pay per use | < $5 USD/mes |
| **Total estimado** | | **$20 - $45 USD/mes** |

*Nota: estos costos dependen del volumen real de trafico, imagenes, mapas y uso de IA.*
