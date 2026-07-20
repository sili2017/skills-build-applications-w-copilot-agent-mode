import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const items = await User.find().sort({ createdAt: 1 }).lean();

    response.json({
      resource: 'users',
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
});

export default router;