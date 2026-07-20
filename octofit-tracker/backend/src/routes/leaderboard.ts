import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const items = await Leaderboard.find().sort({ rank: 1 }).lean();

    response.json({
      resource: 'leaderboard',
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
});

export default router;