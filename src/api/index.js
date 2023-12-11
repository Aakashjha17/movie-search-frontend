import axios from 'axios'

const url = 'https://movie-search-dbjs.onrender.com/movie'

export const getALL = () => axios.get(`${url}/get`)

export const getMovie = async(movieName) => axios.get(`${url}/${movieName}`)

export const deleteMovie = async(id) => axios.delete(`${url}/${id}`)