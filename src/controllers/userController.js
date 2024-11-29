import * as userService from '../services/userService.js';

export const getUsers = async (request, response) => {
  const users = await userService.listUsers();
  return response.send(users);
};

export const getUser = async (request, response) => {
  try {
    const user = await userService.getUser(request.params.id);
    return response.send(user);
  } catch (err) {
    return response.status(404).send({ message: err.message });
  }
};

export const createUser = async (request, response) => {
  try {
    const user = await userService.createUser(request.body);
    return response.status(201).send(user);
  } catch (err) {
    return response.status(400).send({ message: err.message });
  }
};

export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await userService.loginUser(email, password);
    const token = response.jwtSign({ id: user.id });
    return response.send({ token });
  } catch (err) {
    return response.status(401).send({ message: err.message });
  }
};

export const updateUser = async (request, response) => {
	try {
  	const user = await userService.updateUser(request.params.id, request.body);
  	return response.send(user);
	} catch (err) {
    return response.status(401).send({ message: err.message });
  }
};

export const deleteUser = async (request, response) => {
	try {
  	await userService.deleteUser(request.params.id);
  	return response.status(204).send();
	} catch (err) {
		return response.status(401).send({ message: err.message });
	}
};
