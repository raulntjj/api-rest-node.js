import * as userService from '../services/userService.js';

// Funcao controladora para listar todos usuários
export const getUsers = async (request, response) => {
	try {
		const users = await userService.listUsers();
		return response.send({
			statusCode: 200,
			message : 'Usuários recuperados com sucesso!',
			payload : users
		});
	} catch (error) {
		const statusCode = error.statusCode || 500;
		return response.status(statusCode).send({
			statusCode: statusCode,
			message: error.message || 'Erro interno do servidor.',
		});
	}
};

// Funcao controladora para obter um usuário
export const getUser = async (request, response) => {
  try {
    const user = await userService.getUser(request.params.id);
		return response.send({
			statusCode: 200,
			message : 'Usuário recuperado com sucesso!',
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

// Funcao controladora para criar um usuário
export const createUser = async (request, response) => {
  try {
    const user = await userService.createUser(request.body);
		return response.send({
			statusCode: 200,
			message : 'Usuário criado com sucesso!',
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

// Funcao controladora para atualizar um usuário
export const updateUser = async (request, response) => {
	try {
  	const user = await userService.updateUser(request.params.id, request.body);
		return response.send({
			statusCode: 200,
			message : 'Usuário atualizado com sucesso!',
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

// Funcao controladora para deletar um usuário
export const deleteUser = async (request, response) => {
	try {
  	await userService.deleteUser(request.params.id);
  	return response.status(204).send();
	} catch (error) {
		const statusCode = error.statusCode || 500;
		return response.status(statusCode).send({
			statusCode: statusCode,
			message: error.message || 'Erro interno do servidor.',
		});
	}
};
