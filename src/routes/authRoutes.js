import * as authController from '../controllers/authController.js';

export default async (app) => {
  app.post('/login', authController.login);
  app.post('/register', authController.register);
};
