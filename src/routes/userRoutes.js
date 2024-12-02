import * as userController from '../controllers/userController.js';

export default async (app) => {
  app.get('/users', {
    schema: {
      description: 'Obtém uma lista de usuários.',
      tags: ['Usuários'],
      response: {
        200: {
          description: 'Lista de usuários.',
          properties: {
            statusCode: { type: 'string', description: 'Código de resposta da requisicao'},
            message: { type: 'string', description: 'mensagem'},
            payload: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  createdAt: { type: 'string', format: 'date-time', description: 'Data de criação.' },
                  updatedAt: { type: 'string', format: 'date-time', description: 'Data da última atualização.' }
                },
              },
            },
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
    preHandler: [app.authenticate],
    handler: userController.getUsers,
  });

  app.get('/users/:id', {
    schema: {
      description: 'Obtém detalhes de um usuário pelo ID.',
      tags: ['Usuários'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'ID do usuário' },
        },
      },
      response: {
        200: {
          description: 'Detalhes do usuário.',
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
              },
            },
          },
        },
        404: {
          description: 'Usuário não encontrado.',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', description: 'Código de status.' },
            message: { type: 'string', description: 'Mensagem de sucesso.' },
          },
        },
      },
    },
    preHandler: [app.authenticate],
    handler: userController.getUser,
  });

  app.post('/users', {
    schema: {
      description: 'Cria um novo usuário.',
      tags: ['Usuários'],
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
          description: 'Usuário criado com sucesso.',
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
              },
            },
          },
        },
        400: {
          description: 'Erro na validação dos dados.',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', description: 'Código de status.' },
            message: { type: 'string', description: 'Mensagem de sucesso.' },
          },
        },
      },
    },
    preHandler: [app.authenticate],
    handler: userController.createUser,
  });

  app.put('/users/:id', {
    schema: {
      description: 'Atualiza os dados de um usuário.',
      tags: ['Usuários'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'ID do usuário' },
        },
      },
      body: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', description: 'Nome do usuário.' },
          email: { type: 'string', format: 'email', description: 'Email do usuário.' },
          password: { type: 'string', format: 'password', description: 'Senha do usuário.' },
        },
      },
      response: {
        200: {
          description: 'Usuário atualizado com sucesso.',
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
              },
            },
          },
        },
        404: {
          description: 'Usuário não encontrado.',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', description: 'Código de status.' },
            message: { type: 'string', description: 'Mensagem de sucesso.' },
          },
        },
      },
    },
    preHandler: [app.authenticate],
    handler: userController.updateUser,
  });

  app.delete('/users/:id', {
    schema: {
      description: 'Remove um usuário pelo ID.',
      tags: ['Usuários'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'ID do usuário' },
        },
      },
      response: {
        204: {
          description: 'Usuário removido com sucesso.',
          type: 'null',
        },
        404: {
          description: 'Usuário não encontrado.',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', description: 'Código de status.' },
            message: { type: 'string', description: 'Mensagem de sucesso.' },
          },
        },
      },
    },
    preHandler: [app.authenticate],
    handler: userController.deleteUser,
  });
};
