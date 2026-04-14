import { Mail, Eye, Archive, Clock, MessageSquare } from 'lucide-react';

const messages = [
  { id: 1, name: 'Roberto Sánchez', email: 'roberto@gmail.com', subject: 'Consulta sobre anuncio', message: 'Hola, quisiera saber más sobre los planes de publicidad para mi restaurante en Chillán...', date: '2024-06-15 14:30', read: false },
  { id: 2, name: 'Andrea Muñoz', email: 'andrea.m@outlook.com', subject: 'Problema con reserva', message: 'Intenté reservar el evento de vendimia pero no me aparece la opción de pago...', date: '2024-06-15 11:20', read: false },
  { id: 3, name: 'Felipe Torres', email: 'ftorres@yahoo.com', subject: 'Sugerencia de evento', message: 'Les sugiero agregar la Fiesta de la Cereza que se realiza cada año en Los Ángeles...', date: '2024-06-14 18:45', read: true },
  { id: 4, name: 'Camila Vergara', email: 'camila.v@gmail.com', subject: 'Colaboración fotográfica', message: 'Soy fotógrafa profesional y me encantaría colaborar con ustedes para cubrir eventos...', date: '2024-06-14 09:15', read: true },
  { id: 5, name: 'Diego Rivas', email: 'drivas@hotmail.com', subject: 'Error en calendario', message: 'El evento del Festival de Jazz aparece con fecha incorrecta en el calendario...', date: '2024-06-13 16:00', read: true },
];

export default function AdminMessages() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display text-stone-900">Mensajes</h1>
          <p className="text-sm text-stone-500 mt-1">{messages.filter(m => !m.read).length} sin leer</p>
        </div>
        <button className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors">
          <Archive size={16} /> Archivar leídos
        </button>
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`bg-white p-5 rounded-xl border ${m.read ? 'border-stone-200' : 'border-primary/30 bg-primary/[0.02]'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${m.read ? 'bg-stone-100 text-stone-500' : 'bg-primary/10 text-primary'}`}>
                  {m.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div>
                  <h3 className={`text-sm ${m.read ? 'text-stone-700' : 'font-semibold text-stone-900'}`}>{m.name}</h3>
                  <p className="text-xs text-stone-400">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Clock size={12} />
                {m.date}
              </div>
            </div>
            <h4 className={`text-sm mb-1 ${m.read ? 'text-stone-600' : 'font-medium text-stone-800'}`}>{m.subject}</h4>
            <p className="text-sm text-stone-500 line-clamp-2">{m.message}</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                <MessageSquare size={14} /> Responder
              </button>
              {!m.read && (
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-50 text-stone-600 rounded-lg hover:bg-stone-100 transition-colors">
                  <Eye size={14} /> Marcar leído
                </button>
              )}
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-50 text-stone-600 rounded-lg hover:bg-stone-100 transition-colors ml-auto">
                <Archive size={14} /> Archivar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
