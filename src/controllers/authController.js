import * as userService from '../services/userService.js';

// FUncão controladora para registrar um novo usuário
export const register = async (request, response) => {
  try {
    const user = await userService.createUser(request.body);
    return response.status(201).send({
      statusCode: 201,
      message : 'Usuário registrado com sucesso!',
      payload : user
    });
	} catch (error) {
		const statusCode = error.statusCode || 500;
		return response.status(statusCode).send({
			statusCode: statusCode,
			message: error.message || 'Erro interno do servidor.',
		});
	}
};

// FUncão controladora para autenticar um usuario
export const login = async (request, response) => {
  try {
		const { email, password } = request.body;
		const user = await userService.loginUser(email, password);
	
		if (!user) {
			return response.status(401).send({
				statusCode: 401,
				message: 'Credenciais inválidas.',
			});
		}
	
		// Gera o token usando o método decorado
		const { type, token, expiresIn } = await request.server.generateToken({ id: user.id });
	
		return response.send({
			statusCode: 200,
			message: 'Usuário logado com sucesso!',
			payload: {
				type,
				token,
				expiresIn,
			}
		});
	} catch (error) {
		const statusCode = error.statusCode || 500;
		return response.status(statusCode).send({
			statusCode: statusCode,
			message: error.message || 'Erro interno do servidor.',
		});
	}
};

// Função controladora para obter dados do usuário autenticado
export const getAuthenticatedUser = async (request, response) => {
  try {
    const { id } = request.user;

    if (!id) {
      return response.status(401).send({
        statusCode: 401,
        message: 'Token inválido ou usuário não encontrado.',
      });
    }

    // Busca os dados no servico de usuarios
    const user = await userService.getUser(id);

    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: 'Usuário não encontrado.',
      });
    }

    // Retorna os dados completos do usuário
    return response.send({
      statusCode: 200,
      message: 'Usuário autenticado com sucesso!',
      payload: user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return response.status(statusCode).send({
      statusCode: statusCode,
      message: error.message || 'Erro interno do servidor.',
    });
  }
};

