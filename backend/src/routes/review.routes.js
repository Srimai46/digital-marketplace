import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { create, list } from '../controllers/review.controller.js';

const router = Router();
router.get('/product/:productId', list);
router.post('/', requireAuth(['BUYER', 'ADMIN']), create);
export default router;
