import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/admin/stats — Panel admin stats
router.get('/stats', requireAuth, requireRole('admin'), async (_req: Request, res: Response) => {
  const [events, pending, subscribers, messages] = await Promise.all([
    supabaseAdmin.from('events').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('events').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabaseAdmin.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false),
  ]);

  res.json({
    totalEvents: events.count ?? 0,
    pendingEvents: pending.count ?? 0,
    subscribers: subscribers.count ?? 0,
    unreadMessages: messages.count ?? 0,
  });
});

// PATCH /api/admin/events/:id/status — Aprobar/rechazar evento
router.patch('/events/:id/status', requireAuth, requireRole('admin'), async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected', 'archived'].includes(status)) {
    res.status(400).json({ error: 'Status inválido' });
    return;
  }

  const { error } = await supabaseAdmin
    .from('events')
    .update({ status })
    .eq('id', id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ ok: true });
});

// DELETE /api/admin/events/:id
router.delete('/events/:id', requireAuth, requireRole('admin'), async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabaseAdmin.from('events').delete().eq('id', id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ ok: true });
});

export default router;
