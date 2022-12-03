import axios from "axios";

const BASE_URL = process.env.REACT_APP_LOCAL_URL
const USERS_API = `${BASE_URL}/auth`

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitBookmarks = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/bookmarks/${tid}`)
        .then(response => response.data)

export const findAllTuitsBookmarkedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/bookmarks`)
        .then(response => response.data)

export const findAllBookmarks = () =>
    api.get(`${BASE_URL}/api/bookmarks`)
      .then(response => response.data)
