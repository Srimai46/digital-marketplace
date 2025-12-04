import { prisma } from '../db/client.js';

export async function addReview(userId, { productId, rating, comment }) {
  return prisma.review.create({
    data: { productId, reviewerId: userId, rating, comment },
  });
}

export async function listByProduct(productId) {
  return prisma.review.findMany({
    where: { productId },
    include: { reviewer: { select: { username: true } } },
    orderBy: { reviewDate: 'desc' },
  });
}
