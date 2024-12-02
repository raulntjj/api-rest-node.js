import fp from 'fastify-plugin';

export default fp(async (app) => {
  app.register(import('fastify-jwt'), {
    secret: process.env.JWT_SECRET,
  });

  app.decorate('authenticate', async (request, response) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      const statusCode = error.statusCode || 500;
      return response.status(statusCode).send({
        statusCode: statusCode,
        message: error.message || 'Erro interno do servidor.',
      });
    }
  });
});
