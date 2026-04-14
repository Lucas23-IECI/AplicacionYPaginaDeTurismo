import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../lib/supabase.js';

/**
 * Middleware: verifica el JWT de Supabase en el header Authorization.
 * Añade req.user con el usuario autenticado.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token requerido' });
    return;
  }

  const token = header.slice(7);
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }

  (req as any).user = user;
  next();
}

/**
 * Middleware: verifica que el usuario tenga el rol requerido en user_roles.
 */
export function requireRole(role: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ error: 'No autenticado' });
      return;
    }

    const { data } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (data?.role !== role) {
      res.status(403).json({ error: 'Sin permisos' });
      return;
    }

    next();
  };
}
