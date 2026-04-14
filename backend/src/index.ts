import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import eventsRouter from './routes/events.js';
import adminRouter from './routes/admin.js';
import webhooksRouter from './routes/webhooks.js';

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const allowedOrigins = FRONTEND_URL.split(',').map(s => s.trim());

// ── Security ──
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

// ── Routes ──
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/events', eventsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/webhooks', webhooksRouter);

// ── Start ──
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
  console.log(`   CORS habilitado para: ${FRONTEND_URL}`);
});
