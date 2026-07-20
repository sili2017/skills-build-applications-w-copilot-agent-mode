import cors from 'cors';
import express from 'express';
import healthRouter from './routes/health.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    version: '0.0.0',
    endpoints: ['/api/health']
  });
});

app.use('/api/health', healthRouter);

export default app;