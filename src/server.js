import fastify from 'fastify';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import prisma from './libs/prisma.js';
import swagger from './libs/swagger.js';
import jwtPlugin from './libs/jwt.js';
import dotenv from 'dotenv';
import utilityRoutes from './routes/utilityRoutes.js';

const app = fastify({ logger: true });

// Libs
app.register(prisma);
app.register(jwtPlugin);
app.register(swagger);

// Routes
app.register(utilityRoutes);
app.register(authRoutes, { prefix: '/auth/v1' });
app.register(userRoutes, { prefix: '/api/v1' });

const start = async () => {
  try {
    dotenv.config();
    const port = process.env.PORT;
    await app.listen({ port: port });
    console.log('Servidor rodando em http://localhost:3000');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();