import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/events — Eventos públicos (approved)
router.get('/', async (_req: Request, res: Response) => {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*, categories(name, slug, icon), destinations(name, slug), event_images(image_url, display_order)')
    .eq('status', 'approved')
    .order('date_start', { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
});

// GET /api/events/:slug — Detalle de evento por slug
router.get('/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*, categories(name, slug, icon), destinations(name, slug), event_images(image_url, display_order)')
    .eq('slug', slug)
    .eq('status', 'approved')
    .single();

  if (error) {
    res.status(404).json({ error: 'Evento no encontrado' });
    return;
  }

  res.json(data);
});

// POST /api/events — Crear evento (anunciante autenticado)
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const user = (req as any).user;

  // Verificar que tiene perfil de anunciante
  const { data: advertiser } = await supabaseAdmin
    .from('advertisers')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!advertiser) {
    res.status(403).json({ error: 'Se requiere perfil de anunciante' });
    return;
  }

  const { data, error } = await supabaseAdmin
    .from('events')
    .insert({ ...req.body, advertiser_id: advertiser.id, status: 'pending' })
    .select()
    .single();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(201).json(data);
});

export default router;
