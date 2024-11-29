import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';

export const listUsers = async () => {
  return userModel.getAllUsers();
};

export const getUser = async (id) => {
  const user = await userModel.getUserById(id);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user;
};

export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return userModel.createUser({ ...data, password: hashedPassword });
};

export const loginUser = async (email, password) => {
  const user = await userModel.getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciais inválidas');
  }
  
  return user;
};

export const updateUser = async (id, data) => {
  const user = await userModel.updateUser(id, data);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user;
};

export const deleteUser = async (id) => {
  await userModel.deleteUser(id);
};
