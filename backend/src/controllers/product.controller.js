import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../services/product.service.js';

export const getAll = async (req, res, next) => {
  try { res.json(await listProducts()); } catch (e) { next(e); }
};

export const getOne = async (req, res, next) => {
  try {
    const item = await getProduct(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const item = await createProduct(req.user.id, req.body);
    // ส่ง event real-time
    req.app.get('io').emit('product:created', item);
    res.status(201).json(item);
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try {
    const item = await updateProduct(req.params.id, req.user.id, req.body);
    req.app.get('io').emit('product:updated', item);
    res.json(item);
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    const item = await deleteProduct(req.params.id, req.user.id);
    req.app.get('io').emit('product:deleted', { id: item.id });
    res.json({ id: item.id });
  } catch (e) { next(e); }
};
