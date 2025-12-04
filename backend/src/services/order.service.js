import { prisma } from '../db/client.js';

export async function createOrder(buyerId, { productId, amount }) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw { status: 404, message: 'Product not found' };
  const order = await prisma.order.create({
    data: { productId, buyerId, amount, status: 'PENDING' },
  });
  return order;
}

export async function listOrders(buyerId) {
  return prisma.order.findMany({
    where: { buyerId },
    include: { product: true },
    orderBy: { orderDate: 'desc' },
  });
}

export async function updateOrderStatus(id, status) {
  return prisma.order.update({ where: { id }, data: { status } });
}
