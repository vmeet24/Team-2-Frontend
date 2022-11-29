import axios from "axios";

const BASE_URL = process.env.REACT_APP_LOCAL_URL
const USERS_API = `${BASE_URL}/auth`

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data)

export const findAllTuitsDislikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data)