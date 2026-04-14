import { Plus, Edit, Trash2, ChevronDown, ChevronUp, GripVertical, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useFAQ, deleteFAQItem, upsertFAQItem } from '../../lib/hooks';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const blankItem = { question: '', answer: '', category: 'general' };

export default function AdminFAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { data: faqItems, loading, refetch } = useFAQ();
  const allFAQ = faqItems ?? [];
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ id?: string; question: string; answer: string; category: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const handleDelete = async () => {
    if (!deleting) return;
    try { await deleteFAQItem(deleting); refetch(); } catch { /* silent */ }
    setDeleting(null);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await upsertFAQItem({ id: editing.id, question: editing.question, answer: editing.answer, category: editing.category });
      refetch();
      setEditing(null);
    } catch { /* silent */ }
    setSaving(false);
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
        <h1 className="text-2xl font-display text-stone-900">Gestión de FAQ</h1>
        <button
          onClick={() => setEditing({ ...blankItem })}
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          <Plus size={16} /> Nueva Pregunta
        </button>
      </div>

      {/* Inline editor */}
      {editing && (
        <div className="bg-white p-5 rounded-xl border border-primary/30 mb-6 space-y-3">
          <h3 className="text-sm font-semibold text-stone-900">{editing.id ? 'Editar pregunta' : 'Nueva pregunta'}</h3>
          <input
            value={editing.question}
            onChange={(e) => setEditing({ ...editing, question: e.target.value })}
            placeholder="Pregunta"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <textarea
            value={editing.answer}
            onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
            placeholder="Respuesta"
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <select
            value={editing.category}
            onChange={(e) => setEditing({ ...editing, category: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="general">General</option>
            <option value="tourist">Turista</option>
            <option value="advertiser">Anunciante</option>
          </select>
          <div className="flex gap-2">
            <button disabled={saving} onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary-hover disabled:opacity-50">
              <Save size={14} /> {saving ? 'Guardando…' : 'Guardar'}
            </button>
            <button onClick={() => setEditing(null)} className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-200 text-sm rounded-xl text-stone-600 hover:bg-stone-50">
              <X size={14} /> Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {allFAQ.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div
              className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-stone-50/50"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <GripVertical size={16} className="text-stone-300" />
              <div className="flex-1">
                <p className="font-medium text-stone-900 text-sm">{item.question}</p>
                <span className="text-xs text-stone-400 capitalize">{item.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400"
                  onClick={(e) => { e.stopPropagation(); setEditing({ id: item.id, question: item.question, answer: item.answer, category: item.category }); }}
                >
                  <Edit size={14} />
                </button>
                <button
                  className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-stone-400 hover:text-red-600"
                  onClick={(e) => { e.stopPropagation(); setDeleting(item.id); }}
                >
                  <Trash2 size={14} />
                </button>
                {expandedId === item.id ? <ChevronUp size={16} className="text-stone-400" /> : <ChevronDown size={16} className="text-stone-400" />}
              </div>
            </div>
            {expandedId === item.id && (
              <div className="px-5 pb-4 pt-0 border-t border-stone-100">
                <p className="text-sm text-stone-600 leading-relaxed pt-3">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
        {!allFAQ.length && <p className="text-center text-sm text-stone-400 py-10">No hay preguntas frecuentes</p>}
      </div>

      <ConfirmDialog
        open={!!deleting}
        title="Eliminar pregunta"
        message="¿Estás seguro de eliminar esta pregunta frecuente?"
        confirmLabel="Eliminar"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
