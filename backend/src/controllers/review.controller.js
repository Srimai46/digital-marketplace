import { addReview, listByProduct } from '../services/review.service.js';

export const create = async (req, res) => {
  try {
    const r = await addReview(req.user.id, req.body);

    req.app.get('io').emit('review:created', r);

    res.status(201).json(r);
  } catch (e) {
    // ✅ เคยรีวิวซ้ำ (Unique Constraint)
    if (e.code === 'P2002') {
      return res.status(400).json({
        message: 'คุณเคยรีวิวสินค้านี้แล้ว ไม่สามารถรีวิวซ้ำได้',
      });
    }

    console.error('CREATE REVIEW ERROR:', e);
    res.status(500).json({
      message: 'เพิ่มรีวิวไม่สำเร็จ',
    });
  }
};

export const list = async (req, res) => {
  try {
    res.json(await listByProduct(req.params.productId));
  } catch (e) {
    console.error('LIST REVIEW ERROR:', e);
    res.status(500).json({ message: 'โหลดรีวิวไม่สำเร็จ' });
  }
};
