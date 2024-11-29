import fp from 'fastify-plugin';

export default fp(async (app) => {
  app.register(import('fastify-jwt'), {
    secret: process.env.JWT_SECRET,
  });

  app.decorate('authenticate', async (request, response) => {
    try {
      // await request.jwtVerify();
    } catch (err) {
      return response.status(401).send({ message: 'Não autorizado' });
    }
  });
});
