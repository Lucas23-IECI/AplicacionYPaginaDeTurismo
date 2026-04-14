# Explora Chile — Plataforma de Turismo

## Estructura del Proyecto

```
├── frontend/          ← React + Vite + Tailwind (puerto 3000)
│   ├── src/
│   ├── package.json
│   └── .env
├── backend/           ← Express + TypeScript (puerto 4000)
│   ├── src/
│   ├── supabase/      ← Migraciones y seeds SQL
│   ├── package.json
│   └── .env
├── Contexto/          ← Documentación del proyecto
└── README.md
```

## Iniciar desarrollo

### Frontend
```bash
cd frontend
npm install
npm run dev          # → http://localhost:3000
```

### Backend
```bash
cd backend
npm install
# Copiar .env.example → .env y agregar SUPABASE_SERVICE_ROLE_KEY
npm run dev          # → http://localhost:4000
```

### Verificar
- Frontend: http://localhost:3000
- Backend health: http://localhost:4000/api/health