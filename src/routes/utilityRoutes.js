export default async (app) => {
	app.get('/', {
    schema: {
        description: 'Rota principal para verificar a conexão com o servidor.',
        tags: ['Utilitários'],
        response: {
        200: {
            description: 'Informações básicas sobre a API e link para a documentação.',
            type: 'object',
            properties: {
            statusCode: { type: 'integer', description: 'Código de status HTTP.' },
            message: { type: 'string', description: 'Mensagem de conexão.' },
            version: { type: 'string', description: 'Versão da API.' },
            environment: { type: 'string', description: 'Ambiente de execução da API.' },
            server: { type: 'string', description: 'Nome do servidor.' },
            documentation: { type: 'string', description: 'URL para a documentação da API.' },
            },
            example: {
            statusCode: 200,
            message: 'Conexão estabelecida com sucesso.',
            version: '1.0.0',
            environment: 'development',
            server: 'API FASTIFY',
            documentation: 'http://localhost:3000/documentation',
            },
        },
        },
    },
    handler: async function (request, response) {
        const host = request.hostname || 'localhost';
        const port = process.env.PORT || 3000;
        const protocol = request.protocol || 'http';
    
        return response.code(200).send({
        statusCode: 200,
        message: 'Conexão estabelecida com sucesso.',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        server: 'API FASTIFY',
        documentation: `${protocol}://${host}:${port}/documentation`,
        });
    },
	});
	
	app.get('/help', {
    schema: {
        description: 'Rota para obter informações sobre a documentação da API.',
        tags: ['Utilitários'],
        response: {
        200: {
            description: 'Mensagem com o link para a documentação da API.',
            type: 'object',
            properties: {
            message: { type: 'string', description: 'Mensagem informativa.' },
            },
            example: {
            message: 'Para visualizar a documentação da API, acesse http://localhost:3000/documentation',
            },
        },
        },
    },
    handler: async function (request, response) {
        return response.code(200).send({
        message: 'Para visualizar a documentação da API, acesse http://localhost:3000/documentation',
        });
    },
	});
    
    app.get('/ping', {
    schema: {
        description: 'Rota simples para verificar se o servidor está respondendo.',
        tags: ['Utilitários'],
        response: {
        200: {
            description: 'Retorna um objeto com ping como pong.',
            type: 'object',
            properties: {
            ping: { type: 'string', description: 'Resposta pong.' },
            },
            example: {
            ping: 'pong',
            },
        },
        },
    },
    handler: async function (request, response) {
        return response.code(200).send({ ping: 'pong' });
    },
	});
};