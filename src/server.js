import fastify from 'fastify';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import prismaPlugin from './libs/prisma.js';
import jwtPlugin from './libs/jwt.js';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify({ logger: true });

// Libs
app.register(prismaPlugin);
app.register(jwtPlugin);

// Routes
app.register(async function () {
  app.register(userRoutes, { prefix: '/api' });
  app.register(authRoutes, { prefix: '/auth' });
}, { prefix: '/v1' });

app.get('/ping', async function (request, response) {
  return response.code(200).send({ ping : 'pong'});
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Servidor rodando em http://localhost:3000');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();