const fastify = require('fastify')({ logger: true });

// Routes
fastify.get('/', async (request, reply) => {
  return { message: 'API Rest' };
});

fastify.get('/about', async (request, reply) => {
  return { info: 'Este é um projeto simples utilizando Fastify.' };
});


const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
