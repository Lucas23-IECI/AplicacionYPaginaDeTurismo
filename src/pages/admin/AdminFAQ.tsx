import { Plus, Edit, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { useState } from 'react';
import { faqItems } from '../../data/faq';

export default function AdminFAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-stone-900">Gestión de FAQ</h1>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
          <Plus size={16} /> Nueva Pregunta
        </button>
      </div>

      <div className="space-y-3">
        {faqItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div
              className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-stone-50/50"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <GripVertical size={16} className="text-stone-300 cursor-grab" />
              <div className="flex-1">
                <p className="font-medium text-stone-900 text-sm">{item.question}</p>
                <span className="text-xs text-stone-400 capitalize">{item.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400" onClick={(e) => e.stopPropagation()}>
                  <Edit size={14} />
                </button>
                <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-stone-400 hover:text-red-600" onClick={(e) => e.stopPropagation()}>
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
      </div>
    </div>
  );
}
