import { Router } from 'express';
import Activity from '../models/activity.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const items = await Activity.find().sort({ performedAt: -1 }).lean();

    response.json({
      resource: 'activities',
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
});

export default router;