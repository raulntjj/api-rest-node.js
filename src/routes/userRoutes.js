import * as userController from '../controllers/userController.js';

export default async (app) => {
  app.get('/users', { preHandler: [app.authenticate] }, userController.getUsers);
  app.get('/users/:id', { preHandler: [app.authenticate] }, userController.getUser);
  app.put('/users/:id', { preHandler: [app.authenticate] }, userController.updateUser);
  app.delete('/users/:id', { preHandler: [app.authenticate] }, userController.deleteUser);
};
