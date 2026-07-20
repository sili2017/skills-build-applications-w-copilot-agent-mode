import { Router } from 'express';

const router = Router();

router.get('/', (_request, response) => {
  response.json({
    service: 'octofit-tracker-api',
    status: 'ok',
    database: 'octofit_db',
    timestamp: new Date().toISOString()
  });
});

export default router;