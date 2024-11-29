import * as userService from '../services/userService.js';

export const register = async (request, response) => {
  try {
    const user = await userService.createUser(req.body);
    return response.status(201).send({
      statusCode: 201,
      message : 'Usuário registrado com sucesso!',
      response : user
    });
	} catch (err) {
		const statusCode = err.statusCode || 500;
		return response.status(statusCode).send({
			statusCode: statusCode,
			message: err.message || 'Erro interno do servidor.',
		});
	}
};

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await userService.loginUser(email, password);
    const token = response.jwtSign({ id: user.id });
		return response.send({
			statusCode: 200,
			message : 'Usuário logado!',
			type: 'Bearer ',
			response : token
		});
	} catch (err) {
		const statusCode = err.statusCode || 500;
		return response.status(statusCode).send({
			statusCode: statusCode,
			message: err.message || 'Erro interno do servidor.',
		});
	}
};

export const logout = async (request, response) => {

};

export const refreshToken = async (request, response) => {

};