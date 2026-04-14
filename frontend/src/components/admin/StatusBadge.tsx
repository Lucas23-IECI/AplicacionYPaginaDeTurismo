interface StatusBadgeProps {
  status: string;
  map?: Record<string, { label: string; classes: string }>;
}

const defaultMap: Record<string, { label: string; classes: string }> = {
  approved: { label: 'Aprobado', classes: 'bg-green-50 dark:bg-emerald-500/10 text-green-700 dark:text-emerald-400' },
  pending: { label: 'Pendiente', classes: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' },
  draft: { label: 'Borrador', classes: 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400' },
  rejected: { label: 'Rechazado', classes: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400' },
  archived: { label: 'Archivado', classes: 'bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-500' },
  active: { label: 'Activo', classes: 'bg-green-50 dark:bg-emerald-500/10 text-green-700 dark:text-emerald-400' },
  unsubscribed: { label: 'Desuscrito', classes: 'bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-500' },
};

export default function StatusBadge({ status, map }: StatusBadgeProps) {
  const config = (map ?? defaultMap)[status] ?? { label: status, classes: 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400' };
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${config.classes}`}>
      {config.label}
    </span>
  );
}
