/*
This file is based off of McKenna Axios Code from last semester

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /book). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH BOOK TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createBook = (payload) => api.post(`/book/`, payload)
export const getAllBooks = () => api.get(`/books/`)
export const getBookListPairs = () => api.get(`/bookpair/`)
export const updateBookById = (id, payload) => api.put(`/book/${id}`, payload)
export const deleteBookById = (id) => api.delete(`/book/${id}`)
export const getBookById = (id) => api.get(`/book/${id}`)

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)

const apis = {
    createBook,
    getAllBooks,
    getBookListPairs,
    updateBookById,
    deleteBookById,
    getBookById,

    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis
*/