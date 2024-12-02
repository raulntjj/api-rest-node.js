import * as authController from '../controllers/authController.js';

export default async (app) => {
  app.post('/login', authController.login);
  app.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 },
        },
      },
    },
    handler: authController.register,
  });
};
