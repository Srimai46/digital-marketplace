import bcrypt from 'bcrypt';
import { prisma } from '../db/client.js';
import { signToken } from '../utils/jwt.js';

export async function register({ username, email, password, role }) {
  const exists = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (exists) throw { status: 400, message: 'Username or email already taken' };

  const hash = await bcrypt.hash(password, 10);
//   const safeRole = 'suer';
  const user = await prisma.user.create({
    data: { username, email, password: hash, role},
    select: { id: true, username: true, email: true, role: true },
  });
  const token = signToken({ id: user.id, role: user.role, username: user.username });
  return { user, token };
}

export async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, message: 'Invalid credentials' };
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw { status: 401, message: 'Invalid credentials' };
  const { id, role, username } = user;
  const token = signToken({ id, role, username });
  return { user: { id, role, username, email: user.email }, token };
}
