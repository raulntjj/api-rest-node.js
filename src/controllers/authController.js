import * as userService from '../services/userService.js';

export const register = async (request, response) => {
  try {
    const user = await userService.createUser(req.body);
    return response.status(201).send(user);
  } catch (err) {
    return response.status(400).send({ message: err.message });
  }
};

export const login = async (request, response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    const token = response.jwtSign({ id: user.id });
    return response.send({ token });
  } catch (err) {
    return response.status(401).send({ message: err.message });
  }
};

export const logout = async (request, response) => {

};

export const refreshToken = async (request, response) => {

};