import * as userService from '../services/userService.js';

export const getUsers = async (request, response) => {
	try {
		const users = await userService.listUsers();
		return response.send({
			statusCode: 200,
			message : 'Usuários recuperados com sucesso!',
			response : users
		});
	} catch (err) {
		const statusCode = err.statusCode || 500;
		return response.status(statusCode).send({
			statusCode: statusCode,
			message: err.message || 'Erro interno do servidor.',
		});
	}
};

export const getUser = async (request, response) => {
  try {
    const user = await userService.getUser(request.params.id);
		return response.send({
			statusCode: 200,
			message : 'Usuário recuperado com sucesso!',
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

export const createUser = async (request, response) => {
  try {
		const { id } = request.body;
		// console.log(id);
		// process.exit(); // Termina o programa imediatamente
    const user = await userService.createUser(request.body);
		return response.send({
			statusCode: 200,
			message : 'Usuário criado com sucesso!',
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

export const updateUser = async (request, response) => {
	try {
  	const user = await userService.updateUser(request.params.id, request.body);
		return response.send({
			statusCode: 200,
			message : 'Usuário atualizado com sucesso!',
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

export const deleteUser = async (request, response) => {
	try {
  	await userService.deleteUser(request.params.id);
  	return response.status(204).send();
	} catch (err) {
		const statusCode = err.statusCode || 500;
		return response.status(statusCode).send({
			statusCode: statusCode,
			message: err.message || 'Erro interno do servidor.',
		});
	}
};
