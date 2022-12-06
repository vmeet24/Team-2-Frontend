import axios from "axios";
const BASE_URL = process.env.REACT_APP_LOCAL_URL;
const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/users`;
const ADMIN_API = `${BASE_URL}/admin`;

const api = axios.create({
    withCredentials: true
});

export const findAllTuits = () =>
    api.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    api.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, { tuit: tuit })
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    api.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const deleteTuitsByUserId = (tid) =>
    api.delete(`${TUITS_API}/${tid}/delete`)
        .then(response => response.data);

export const searchByTuit = (tuit) =>
    api.get(`${ADMIN_API}/${tuit}/tuits`)
        .then(response => response.data)
