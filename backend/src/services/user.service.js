/ backend/src/services/user.service.js
import { prisma } from '../db/client.js';
import bcrypt from 'bcrypt';

export async function getAllUsers() {
  return prisma.user.findMany({
    select: { id: true, username: true, email: true, role: true },
    orderBy: { username: 'asc' },
  });
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, email: true, role: true, products: true, orders: true },
  });
}

export async function updateUser(id, data) {
  const { username, email, password, role } = data;
  const updateData = {};
  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (role) updateData.role = role;
  if (password) updateData.password = await bcrypt.hash(password, 10);

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: { id: true, username: true, email: true, role: true },
  });
}

export async function deleteUser(id) {
  return prisma.user.delete({
    where: { id },
    select: { id: true, username: true, email: true },
  });
}