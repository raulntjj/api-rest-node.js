import fp from 'fastify-plugin';

export default fp(async (app) => {
  app.register(import('fastify-jwt'), {
    secret: process.env.JWT_SECRET,
  });

  app.decorate('authenticate', async (request, response) => {
    try {
      // await request.jwtVerify();
    } catch (err) {
      const statusCode = err.statusCode || 500;
      return response.status(statusCode).send({
        statusCode: statusCode,
        message: err.message || 'Erro interno do servidor.',
      });
    }
  });
});
