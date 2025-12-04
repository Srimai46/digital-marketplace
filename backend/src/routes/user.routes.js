/ backend/src/routes/user.routes.js
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listUsers, getUser, update, remove } from '../controllers/user.controller.js';

const router = Router();

// เฉพาะ ADMIN เท่านั้นที่ดู user ทั้งหมดได้
router.get('/', requireAuth(['ADMIN']), listUsers);

// ดูข้อมูล user รายบุคคล (ตัวเองหรือ ADMIN)
router.get('/:id', requireAuth(), getUser);

// อัปเดตข้อมูล user (ตัวเองหรือ ADMIN)
router.put('/:id', requireAuth(), update);

// ลบ user (ADMIN เท่านั้น)
router.delete('/:id', requireAuth(['ADMIN']), remove);

export default router;