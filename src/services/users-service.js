import axios from "axios";
const BASE_URL = process.env.REACT_APP_LOCAL_URL;

const USERS_API = `${BASE_URL}/users`;
const ADMIN_API = `${BASE_URL}/api/admin`;

const api = axios.create({
  withCredentials: true
});

export const createUser = (user) =>
    api.post(`${USERS_API}`, user)
      .then(response => response.data);

export const findAllUsers = () =>
    api.get(USERS_API)
      .then(response => response.data);

export const findUserById = (uid) =>
    api.get(`${USERS_API}/${uid}`)
      .then(response => response.data);

export const deleteUser = (uid) =>
    api.delete(`${USERS_API}/${uid}`)
      .then(response => response.data);

export const deleteUsersByUsername = (username) =>
    api.delete(`${USERS_API}/username/${username}/delete`)
      .then(response => response.data);

export const updateUser = (uid, user) =>
    api.put(`${USERS_API}/${uid}`, user)
      .then(response => response.data);

export const searchByUsername = (username) =>
  axios.get(`${ADMIN_API}/${username}`)
      .then(response => response.data)

export const adminDeleteUser = (uid) =>
  axios.delete(`${ADMIN_API}/${uid}`)
      .then(response => response.data)

export const adminCreateUser = (user) =>
  axios.post(`${ADMIN_API}`, user)
      .then(response => response.data)

const service = {
  findAllUsers,
  updateUser
}

export default service;