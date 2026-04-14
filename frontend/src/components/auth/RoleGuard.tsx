import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, useRole } from '../../lib/auth';
import type { UserRole } from '../../lib/types';

export default function RoleGuard({ children, requiredRole }: { children: React.ReactNode; requiredRole: UserRole }) {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
