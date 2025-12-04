import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { create, listMine, setStatus } from '../controllers/order.controller.js';

const router = Router();
router.post('/', requireAuth(['BUYER', 'ADMIN']), create);
router.get('/me', requireAuth(), listMine);
router.patch('/:id/status', requireAuth(['ADMIN', 'SELLER']), setStatus);
export default router;
