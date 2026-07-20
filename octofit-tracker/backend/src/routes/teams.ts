import { Router } from 'express';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const items = await Team.find().sort({ points: -1 }).lean();

    response.json({
      resource: 'teams',
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
});

export default router;