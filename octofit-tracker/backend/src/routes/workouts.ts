import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const items = await Workout.find().sort({ durationMinutes: 1 }).lean();

    response.json({
      resource: 'workouts',
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
});

export default router;