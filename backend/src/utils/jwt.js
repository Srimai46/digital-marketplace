import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export const signToken = (payload, options = {}) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d', ...options });

export const verifyToken = (token) =>
  jwt.verify(token, JWT_SECRET);
