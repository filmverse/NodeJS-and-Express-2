import axios from "axios";
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (noteAdd) => {
    return axios.post(baseUrl, noteAdd)
}

const update = (id, noteUpdate) => {
    return axios.put(`${baseUrl}/${id}`, noteUpdate)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const noteApp = {getAll, create, update, remove}

export default noteApp;