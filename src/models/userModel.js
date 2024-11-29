import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = () => {
  return prisma.user.findMany();
};
export const getUserById = (id) => {
  return prisma.user.findUnique({ where: { id: parseInt(id) } });
};

export const getUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = (data) => {
  return prisma.user.create({ data });
};

export const updateUser = (id, data) => {
  return prisma.user.update({ where: { id: parseInt(id) }, data });
};

export const deleteUser = (id) => {
  return prisma.user.delete({ where: { id: parseInt(id) } });
};
