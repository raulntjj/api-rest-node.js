import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export default fp(async (app) => {
  app.register(swagger, {
    swagger: {
      info: {
        title: 'API Fastify',
        description: 'Documentacão da API Fastify',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor Local',
        },
        {
          url: 'http://localhost:3001',
          description: 'Servidor Local',
        },
      ],
      securityDefinitions: {
        BearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Insira o token no formato: Bearer {token}',
        },
      },
      security: [{ BearerAuth: [] }],
    },
  });

  app.register(swaggerUi, {
    routePrefix: '/documentation', 
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
});
