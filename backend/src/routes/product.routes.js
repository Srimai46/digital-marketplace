import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getAll, getOne, create, update, remove } from '../controllers/product.controller.js';

const router = Router();
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', requireAuth(['SELLER', 'ADMIN']), create);
router.put('/:id', requireAuth(['SELLER', 'ADMIN']), update);
router.delete('/:id', requireAuth(['SELLER', 'ADMIN']), remove);
export default router;
