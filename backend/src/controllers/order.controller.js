import { createOrder, listOrders, updateOrderStatus } from '../services/order.service.js';

export const create = async (req, res, next) => {
  try {
    const order = await createOrder(req.user.id, req.body);
    req.app.get('io').to(req.user.id).emit('order:created', order);
    res.status(201).json(order);
  } catch (e) { next(e); }
};

export const listMine = async (req, res, next) => {
  try { res.json(await listOrders(req.user.id)); } catch (e) { next(e); }
};

export const setStatus = async (req, res, next) => {
  try {
    const updated = await updateOrderStatus(req.params.id, req.body.status);
    req.app.get('io').emit('order:updated', updated);
    res.json(updated);
  } catch (e) { next(e); }
};
