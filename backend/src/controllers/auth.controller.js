import { login, register } from '../services/auth.service.js';

export const registerController = async (req, res, next) => {
  try {
    const data = await register(req.body);
    res.status(201).json(data);
  } catch (err) { next(err); }
};

export const loginController = async (req, res, next) => {
  try {
    const data = await login(req.body);
    res.json(data);
  } catch (err) { next(err); }
};
