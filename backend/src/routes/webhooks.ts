import { Router, Request, Response } from 'express';

const router = Router();

// POST /api/webhooks/stripe — Stripe payment webhook (futuro)
router.post('/stripe', async (req: Request, res: Response) => {
  // TODO: Verificar firma Stripe con STRIPE_WEBHOOK_SECRET
  // TODO: Procesar eventos de suscripción (subscription.created, invoice.paid, etc.)
  console.log('[Stripe Webhook] Evento recibido');
  res.json({ received: true });
});

export default router;
