import axios from "axios";
const baseURL = '/api/notes'

const getAll = () => {
    return axios.get(baseURL)
}

const create = (noteAdd) => {
    return axios.post(baseURL, noteAdd)
}

const update = (id, noteUpdate) => {
    return axios.put(`${baseURL}/${id}`, noteUpdate)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const noteApp = {getAll, create, update, remove}

export default noteApp;