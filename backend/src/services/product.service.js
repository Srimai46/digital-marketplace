import { prisma } from '../db/client.js';

export async function listProducts() {
  return prisma.product.findMany({
    include: { owner: { select: { id: true, username: true } }, reviews: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProduct(id) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, username: true } },
      reviews: { include: { reviewer: { select: { username: true } } } },
    },
  });
}

export async function createProduct(ownerId, data) {
  const { title, description, price, fileUrl } = data;
  return prisma.product.create({
    data: { title, description, price, fileUrl, ownerId },
  });
}

export async function updateProduct(id, ownerId, data) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.ownerId !== ownerId) throw { status: 403, message: 'Not allowed' };
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id, ownerId) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.ownerId !== ownerId) throw { status: 403, message: 'Not allowed' };
  return prisma.product.delete({ where: { id } });
}
