import * as authController from '../controllers/authController.js';

export default async (app) => {
  app.post('/register', {
    schema: {
      description: 'Registra um novo usuário.',
      tags: ['Autenticação'],
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', description: 'Nome do usuário.' },
          email: { type: 'string', format: 'email', description: 'Email do usuário.' },
          password: { type: 'string', minLength: 8, description: 'Senha do usuário.' },
        },
      },
      response: {
        201: {
          description: 'Usuário registrado com sucesso.',
          type: 'object',
          properties: {
            statusCode: { type: 'string', description: 'Código de resposta da requisicao'},
            message: { type: 'string', description: 'mensagem'},
            payload: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                createdAt: { type: 'string', format: 'date-time', description: 'Data de criação.' },
                updatedAt: { type: 'string', format: 'date-time', description: 'Data da última atualização.' }
              }
            }
          },
        },
        400: {
          description: 'Erro de validação.',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', description: 'Código de status.' },
            message: { type: 'string', description: 'Mensagem de sucesso.' },
          },
        },
      },
    },
    handler: authController.register,
  });

  app.post('/login', {
    schema: {
      description: 'Faz login de um usuário e retorna um token.',
      tags: ['Autenticação'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', description: 'Email do usuário.' },
          password: { type: 'string', minLength: 8, description: 'Senha do usuário.' },
        },
      },
      response: {
        200: {
          description: 'Login realizado com sucesso.',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', description: 'Código de status da resposta.' },
            message: { type: 'string', description: 'Mensagem de sucesso.' },
            payload: {
              type: 'object',
              properties: {
                type: { type:'string', description: 'Tipo do token (exemplo: Bearer).' },
                token: { type:'string', description: 'Token JWT para autenticação.' },
                expiresIn: { type:'string', description: 'Tempo de expiração do token em segundos.' }
              }
            }
          }
        },
        401: {
          description: 'Credênciais inválidas.',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', description: 'Código de status.' },
            message: { type: 'string', description: 'Mensagem de sucesso.' },
          },
        },
      }
    },
    handler: authController.login,
  });

  app.get('/me', {
    schema: {
      description: 'Obtém os dados do usuário autenticado.',
      tags: ['Autenticação'],
      response: {
        200: {
          description: 'Dados do usuário autenticado.',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', description: 'Código de status da resposta.' },
            message: { type: 'string', description: 'Mensagem de sucesso.' },
            payload: {
              type: 'object',
              properties: {
                id: { type: 'integer', description: 'ID do usuário.' },
                name: { type: 'string', description: 'Nome do usuário.' },
                email: { type: 'string', format: 'email', description: 'Email do usuário.' },
                createdAt: { type: 'string', format: 'date-time', description: 'Data de criação.' },
                updatedAt: { type: 'string', format: 'date-time', description: 'Data da última atualização.' }
              },
            },
          },
        },
        401: {
          description: 'Token inválido ou ausente.',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', description: 'Código de status.' },
            message: { type: 'string', description: 'Mensagem de erro.' },
          },
        },
      },
    },
    preHandler: app.authenticate,
    handler: authController.getAuthenticatedUser,
  });
};
