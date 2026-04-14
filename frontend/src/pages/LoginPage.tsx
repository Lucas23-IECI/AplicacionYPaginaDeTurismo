import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth, useRole } from '../lib/auth';
import { usePageTitle } from '../lib/usePageTitle';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  usePageTitle('Iniciar Sesión');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await signUp(email, password);
        setError('');
        setIsRegister(false);
        alert('Cuenta creada. Revisa tu email para confirmar.');
      } else {
        const result = await signIn(email, password);
        // Redirect based on role
        const userId = result.user?.id;
        if (userId) {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', userId)
            .single<{ role: string }>();
          if (roleData?.role === 'admin') navigate('/admin');
          else if (roleData?.role === 'advertiser') navigate('/portal');
          else navigate('/');
        } else {
          navigate('/');
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-[80vh] flex items-center">
      <div className="max-w-md mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm"
        >
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-display text-primary">Explora Chile</Link>
            <h1 className="text-xl font-display text-stone-900 mt-4">
              {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              {isRegister ? 'Regístrate como anunciante' : 'Accede al portal de anunciantes'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Nombre del negocio</label>
                <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Tu empresa o nombre" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="tu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-12 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60">
              {loading ? 'Cargando...' : isRegister ? 'Crear Cuenta' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsRegister(!isRegister)} className="text-sm text-primary font-medium hover:underline">
              {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
