"" 
// backend/src/controllers/user.controller.js
import { getAllUsers, getUserById, updateUser, deleteUser } from '../services/user.service.js';

export const listUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) { next(err); }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    res.json(user);
  } catch (err) { next(err); }
};