import fp from 'fastify-plugin';

export default fp(async (app) => {
  // Configuracoes do JWT
  app.register(import('fastify-jwt'), {
    secret: process.env.JWT_SECRET,
    // sign: {
    //   expiresIn: process.env.JWT_TTL,
    // },
  });

  // middleware para verificar token
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

  // metodo para gerar token e expiracao do token
  app.decorate('generateToken', async (payload) => {
    const expiresInSeconds = process.env.JWT_TTL;
    const token = await app.jwt.sign(payload);
    return {
      type: 'Bearer ',
      token,
      expiresIn: expiresInSeconds,
    };
  });
});
