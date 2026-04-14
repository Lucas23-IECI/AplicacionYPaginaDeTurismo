import { Eye, Archive, Clock, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useMessages, markMessageRead, deleteMessage } from '../../lib/hooks';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

export default function AdminMessages() {
  const { data: messages, loading, refetch } = useMessages();
  const all = messages ?? [];
  const unread = all.filter((m) => !m.read).length;
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleMarkRead = async (id: string) => {
    try { await markMessageRead(id); refetch(); } catch { /* silent */ }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await deleteMessage(deleting); refetch(); } catch { /* silent */ }
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display text-stone-900">Mensajes</h1>
          <p className="text-sm text-stone-500 mt-1">{unread} sin leer</p>
        </div>
      </div>

      <div className="space-y-3">
        {all.map((m) => (
          <div
            key={m.id}
            className={`bg-white p-5 rounded-xl border ${m.read ? 'border-stone-200' : 'border-primary/30 bg-primary/[0.02]'} cursor-pointer`}
            onClick={() => setExpanded(expanded === m.id ? null : m.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${m.read ? 'bg-stone-100 text-stone-500' : 'bg-primary/10 text-primary'}`}>
                  {m.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className={`text-sm ${m.read ? 'text-stone-700' : 'font-semibold text-stone-900'}`}>{m.name}</h3>
                  <p className="text-xs text-stone-400">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Clock size={12} />
                {new Date(m.createdAt).toLocaleString('es-CL')}
              </div>
            </div>
            <h4 className={`text-sm mb-1 ${m.read ? 'text-stone-600' : 'font-medium text-stone-800'}`}>{m.subject}</h4>
            <p className={`text-sm text-stone-500 ${expanded === m.id ? '' : 'line-clamp-2'}`}>{m.message}</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100" onClick={(e) => e.stopPropagation()}>
              {!m.read && (
                <button onClick={() => handleMarkRead(m.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-50 text-stone-600 rounded-lg hover:bg-stone-100 transition-colors">
                  <Eye size={14} /> Marcar leído
                </button>
              )}
              <button onClick={() => setDeleting(m.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors ml-auto">
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          </div>
        ))}
        {!all.length && <p className="text-center text-sm text-stone-400 py-10">No hay mensajes</p>}
      </div>

      <ConfirmDialog
        open={!!deleting}
        title="Eliminar mensaje"
        message="¿Estás seguro de eliminar este mensaje?"
        confirmLabel="Eliminar"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
