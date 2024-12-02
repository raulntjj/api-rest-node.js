import * as userController from '../controllers/userController.js';

export default async (app) => {
  app.get('/users', { preHandler: [app.authenticate] }, userController.getUsers);
  app.get('/users/:id', { preHandler: [app.authenticate] }, userController.getUser);
  app.post('/users', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 },
        },
      },
    },
    preHandler: [app.authenticate],
    handler: userController.createUser,
  });

  app.put('/users/:id',{
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 },
        },
      },
    },
    preHandler: [app.authenticate],
    handler: userController.updateUser,
  });

  app.delete('/users/:id', { preHandler: [app.authenticate] }, userController.deleteUser);
};
