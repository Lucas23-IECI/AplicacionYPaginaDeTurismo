interface StatusBadgeProps {
  status: string;
  map?: Record<string, { label: string; classes: string }>;
}

const defaultMap: Record<string, { label: string; classes: string }> = {
  approved: { label: 'Aprobado', classes: 'bg-green-50 text-green-700' },
  pending: { label: 'Pendiente', classes: 'bg-amber-50 text-amber-700' },
  draft: { label: 'Borrador', classes: 'bg-stone-100 text-stone-600' },
  rejected: { label: 'Rechazado', classes: 'bg-red-50 text-red-700' },
  archived: { label: 'Archivado', classes: 'bg-stone-100 text-stone-500' },
  active: { label: 'Activo', classes: 'bg-green-50 text-green-700' },
  unsubscribed: { label: 'Desuscrito', classes: 'bg-stone-100 text-stone-500' },
};

export default function StatusBadge({ status, map }: StatusBadgeProps) {
  const config = (map ?? defaultMap)[status] ?? { label: status, classes: 'bg-stone-100 text-stone-600' };
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${config.classes}`}>
      {config.label}
    </span>
  );
}
