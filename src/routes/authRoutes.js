import * as authController from '../controllers/authController.js';

export default async (app) => {
  app.post('/register', authController.register);
  app.post('/login', authController.login);
};
